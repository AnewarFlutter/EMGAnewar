using Xunit;
using Microsoft.EntityFrameworkCore;
using EMGVoitures.Controllers;
using EMGVoitures.Data;
using EMGVoitures.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMGVoitures.Tests
{
    public class CarModelsControllerTests
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;
        private readonly ApplicationDbContext _context;
        private readonly CarModelsController _controller;

        public CarModelsControllerTests()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(_options);
            _controller = new CarModelsController(_context);
        }

        [Fact]
        public async Task GetCarModels_ReturnsAllModels()
        {
            // Arrange
            var model = new CarModel { Name = "Test Model" };
            _context.CarModels.Add(model);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetCarModels();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var models = Assert.IsAssignableFrom<IEnumerable<CarModel>>(okResult.Value);
            Assert.Single(models);
        }

        [Fact]
        public async Task CreateCarModel_WithValidData_ReturnsCreatedModel()
        {
            // Arrange
            var model = new CarModel { Name = "New Model" };

            // Act
            var result = await _controller.CreateCarModel(model);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnedModel = Assert.IsType<CarModel>(createdAtActionResult.Value);
            Assert.Equal(model.Name, returnedModel.Name);
        }
    }
}