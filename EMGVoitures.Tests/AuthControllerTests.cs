using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using EMGVoitures.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;

namespace EMGVoitures.Tests
{
    public class AuthControllerTests
    {
        private readonly Mock<UserManager<IdentityUser>> _userManagerMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly AuthController _controller;

        public AuthControllerTests()
        {
            var userStoreMock = new Mock<IUserStore<IdentityUser>>();
            var options = new Mock<IOptions<IdentityOptions>>();
            var userValidators = new List<IUserValidator<IdentityUser>>();
            var passwordValidators = new List<IPasswordValidator<IdentityUser>>();
            var keyNormalizer = new UpperInvariantLookupNormalizer();
            var errors = new IdentityErrorDescriber();
            var services = new ServiceCollection();
            var logger = new Mock<ILogger<UserManager<IdentityUser>>>();

            _userManagerMock = new Mock<UserManager<IdentityUser>>(
                userStoreMock.Object,
                options.Object,
                new PasswordHasher<IdentityUser>(),
                userValidators,
                passwordValidators,
                keyNormalizer,
                errors,
                services.BuildServiceProvider(),
                logger.Object);

            _configurationMock = new Mock<IConfiguration>();
            _configurationMock.Setup(c => c["Jwt:Key"]).Returns("VotreCléSecrèteTrèsLongueAuMoins32Caractères");
            _configurationMock.Setup(c => c["Jwt:Issuer"]).Returns("VotreIssuer");
            _configurationMock.Setup(c => c["Jwt:Audience"]).Returns("VotreAudience");

            _controller = new AuthController(_userManagerMock.Object, _configurationMock.Object);
        }

        [Fact]
        public async Task Login_WithValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            var loginModel = new LoginModel
            {
                Username = "test@test.com",
                Password = "Password123!"
            };

            var user = new IdentityUser
            {
                UserName = loginModel.Username,
                Email = loginModel.Username
            };

            _userManagerMock.Setup(x => x.FindByNameAsync(loginModel.Username))
                          .ReturnsAsync(user);
            _userManagerMock.Setup(x => x.CheckPasswordAsync(user, loginModel.Password))
                          .ReturnsAsync(true);
            _userManagerMock.Setup(x => x.GetRolesAsync(user))
                          .ReturnsAsync(new List<string> { "User" });

            // Act
            var result = await _controller.Login(loginModel);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task Login_WithInvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var loginModel = new LoginModel
            {
                Username = "test@test.com",
                Password = "WrongPassword"
            };

            _userManagerMock.Setup(x => x.FindByNameAsync(loginModel.Username))
                          .ReturnsAsync((IdentityUser)null);

            // Act
            var result = await _controller.Login(loginModel);

            // Assert
            Assert.IsType<UnauthorizedResult>(result);
        }
    }
}