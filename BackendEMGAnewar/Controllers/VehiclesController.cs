using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EMGVoitures.Data;
using EMGVoitures.Models;
using EMGVoitures.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace EMGVoitures.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehiclesController(ApplicationDbContext context)
        {
            _context = context;
        }

        private string GetBaseUrl()
        {
            return $"{Request.Scheme}://{Request.Host}";
        }

        // GET: api/vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetVehicles()
        {
            var vehicles = await _context.Vehicles
                .Include(v => v.Model)  // Important : inclure le modèle
                .Select(v => new VehicleDto
                {
                    Id = v.Id,
                    Brand = v.Brand,
                    ModelId = v.ModelId,
                    ModelName = v.Model.Name,
                    Year = v.Year,
                    Description = v.Description,
                    Price = v.Price,
                    IsAvailable = v.IsAvailable,
                    ImageUrl = v.ImageUrl
                })
                .ToListAsync();

            return Ok(vehicles);
        }

        // GET: api/vehicles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.Model)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
            {
                return NotFound();
            }

            var vehicleDto = new VehicleDto
            {
                Id = vehicle.Id,
                Brand = vehicle.Brand,
                ModelId = vehicle.ModelId,
                ModelName = vehicle.Model.Name,
                Year = vehicle.Year,
                Description = vehicle.Description,
                Price = vehicle.Price,
                IsAvailable = vehicle.IsAvailable,
                ImageUrl = vehicle.ImageUrl
            };

            return Ok(vehicleDto);
        }

        // POST: api/vehicles
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleDto>> CreateVehicle([FromForm] CreateVehicleDto createVehicleDto)
        {
            // Vérifier si le modèle existe
            var model = await _context.Set<CarModel>().FindAsync(createVehicleDto.ModelId);
            if (model == null)
            {
                return BadRequest("Le modèle spécifié n'existe pas");
            }

            if (createVehicleDto.Year < 2010)
            {
                return BadRequest("L'année du véhicule doit être supérieure ou égale à 2010");
            }

            string? imageUrl = null;
            if (createVehicleDto.ImageFile != null)
            {
                // Vérifier le type de fichier
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(createVehicleDto.ImageFile.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Contains(extension))
                {
                    return BadRequest("Type de fichier non supporté. Utilisez .jpg, .jpeg ou .png");
                }

                // Créer un nom de fichier unique
                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "vehicles", fileName);
                
                // Assurer que le dossier existe
                Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

                // Sauvegarder le fichier
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await createVehicleDto.ImageFile.CopyToAsync(stream);
                }

                imageUrl = $"/images/vehicles/{fileName}";
            }

            var vehicle = new Vehicle
            {
                Brand = createVehicleDto.Brand,
                ModelId = createVehicleDto.ModelId,
                Year = createVehicleDto.Year,
                Description = createVehicleDto.Description,
                Price = createVehicleDto.Price,
                ImageUrl = imageUrl,
                IsAvailable = createVehicleDto.IsAvailable ?? true,
                DateAdded = DateTime.UtcNow
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
        }

        // PUT: api/vehicles/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateVehicle(int id, UpdateVehicleDto updateVehicleDto)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            if (updateVehicleDto.Description != null)
                vehicle.Description = updateVehicleDto.Description;
            
            if (updateVehicleDto.Price.HasValue)
                vehicle.Price = updateVehicleDto.Price.Value;
            
            if (updateVehicleDto.ImageUrl != null)
                vehicle.ImageUrl = updateVehicleDto.ImageUrl;
            
            if (updateVehicleDto.IsAvailable.HasValue)
            {
                vehicle.IsAvailable = updateVehicleDto.IsAvailable.Value;
                if (!updateVehicleDto.IsAvailable.Value)
                {
                    vehicle.DateSold = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}/image")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateVehicleImage(int id, IFormFile image)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            try 
            {
                // Vérifier si un fichier a été envoyé
                if (image == null || image.Length == 0)
                {
                    return BadRequest("Aucun fichier n'a été envoyé");
                }

                // Vérifier le type de fichier
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                {
                    return BadRequest("Type de fichier non supporté. Utilisez .jpg, .jpeg ou .png");
                }

                // Supprimer l'ancienne image si elle existe
                if (!string.IsNullOrEmpty(vehicle.ImageUrl))
                {
                    var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", vehicle.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                // Créer un nom de fichier unique
                var fileName = $"{Guid.NewGuid()}{extension}";
                var uploadPath = Path.Combine("wwwroot", "images", "vehicles");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), uploadPath, fileName);

                // S'assurer que le répertoire existe
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), uploadPath));

                // Sauvegarder le nouveau fichier
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Mettre à jour l'URL dans la base de données
                vehicle.ImageUrl = $"/images/vehicles/{fileName}";
                await _context.SaveChangesAsync();

                return Ok(vehicle.ImageUrl);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur est survenue lors du traitement du fichier : {ex.Message}");
            }
        }

        // DELETE: api/vehicles/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}