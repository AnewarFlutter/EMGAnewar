using Xunit;
using Microsoft.EntityFrameworkCore;
using EMGVoitures.Controllers;
using EMGVoitures.Data;
using EMGVoitures.Models;
using Microsoft.AspNetCore.Mvc;
using EMGVoitures.DTOs;

namespace EMGVoitures.Tests
{
    public class VehiclesControllerTests
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;
        private readonly ApplicationDbContext _context;
        private readonly VehiclesController _controller;

        public VehiclesControllerTests()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(_options);
            _controller = new VehiclesController(_context);
        }

        [Fact]
        public async Task GetVehicles_ReturnsAllVehicles()
        {
            // Arrange
            var model = new CarModel { Name = "Test Model" };
            _context.CarModels.Add(model);
            await _context.SaveChangesAsync();

            var vehicle = new Vehicle
            {
                Brand = "Test Brand",
                ModelId = model.Id,
                Year = 2020,
                Description = "Test Description",
                Price = 10000,
                IsAvailable = true,
                DateAdded = DateTime.UtcNow
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetVehicles();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var vehicles = Assert.IsAssignableFrom<IEnumerable<VehicleDto>>(okResult.Value);
            Assert.Single(vehicles);
        }

        [Fact]
        public async Task GetVehicle_WithValidId_ReturnsVehicle()
        {
            // Arrange
            var model = new CarModel { Name = "Test Model" };
            _context.CarModels.Add(model);
            await _context.SaveChangesAsync();

            var vehicle = new Vehicle
            {
                Brand = "Test Brand",
                ModelId = model.Id,
                Year = 2020,
                Description = "Test Description",
                Price = 10000,
                IsAvailable = true,
                DateAdded = DateTime.UtcNow
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetVehicle(vehicle.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var vehicleDto = Assert.IsType<VehicleDto>(okResult.Value);
            Assert.Equal(vehicle.Brand, vehicleDto.Brand);
        }

        [Fact]
        public async Task CreateVehicle_WithValidData_ReturnsCreatedVehicle()
        {
            // Arrange
            var model = new CarModel { Name = "Test Model" };
            _context.CarModels.Add(model);
            await _context.SaveChangesAsync();

            var createDto = new CreateVehicleDto
            {
                Brand = "New Brand",
                ModelId = model.Id,
                Year = 2020,
                Description = "New Description",
                Price = 15000,
                IsAvailable = true
            };

            // Act
            var result = await _controller.CreateVehicle(createDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var vehicle = Assert.IsType<Vehicle>(createdAtActionResult.Value);
            
            // Vérifier que les données du véhicule correspondent à celles du DTO
            Assert.Equal(createDto.Brand, vehicle.Brand);
            Assert.Equal(createDto.ModelId, vehicle.ModelId);
            Assert.Equal(createDto.Year, vehicle.Year);
            Assert.Equal(createDto.Description, vehicle.Description);
            Assert.Equal(createDto.Price, vehicle.Price);
            Assert.Equal(createDto.IsAvailable ?? true, vehicle.IsAvailable);
        }
    }
}