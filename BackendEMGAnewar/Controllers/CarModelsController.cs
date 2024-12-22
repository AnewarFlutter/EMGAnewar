using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EMGVoitures.Data;
using EMGVoitures.Models;
using Microsoft.AspNetCore.Authorization;

namespace EMGVoitures.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarModelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CarModelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/carmodels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarModel>>> GetCarModels()
        {
            var models = await _context.CarModels.ToListAsync();
            return Ok(models);
        }

        // GET: api/carmodels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarModel>> GetCarModel(int id)
        {
            var model = await _context.CarModels.FindAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        // POST: api/carmodels
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CarModel>> CreateCarModel(CarModel model)
        {
            _context.CarModels.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCarModel), new { id = model.Id }, model);
        }

        // PUT: api/carmodels/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCarModel(int id, CarModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            var existingModel = await _context.CarModels.FindAsync(id);
            if (existingModel == null)
            {
                return NotFound();
            }

            existingModel.Name = model.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/carmodels/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCarModel(int id)
        {
            var model = await _context.CarModels.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            // Vérifier si le modèle est utilisé par des véhicules
            var hasVehicles = await _context.Vehicles.AnyAsync(v => v.ModelId == id);
            if (hasVehicles)
            {
                return BadRequest("Impossible de supprimer ce modèle car il est utilisé par des véhicules");
            }

            _context.CarModels.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarModelExists(int id)
        {
            return _context.CarModels.Any(e => e.Id == id);
        }
    }
}