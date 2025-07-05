using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    // Remove [Authorize] from login - users need to login WITHOUT being authenticated!
    [HttpPost("login")]
    [AllowAnonymous] // Explicitly allow anonymous access
    public IActionResult Login([FromBody] LoginModel model)
    {
        // Hardcoded user for demo
        if (model.Username == "admin" && model.Password == "password")
        {
            var token = GenerateJwtToken(model.Username);
            return Ok(new { token });
        }
        return Unauthorized(new { message = "Invalid credentials" });
    }

    // Example of a protected endpoint that requires authentication
    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var username = User.Identity?.Name;
        return Ok(new { username, message = "This is a protected endpoint" });
    }

    private string GenerateJwtToken(string username)
    {
        var keyString = _config["Jwt:Key"] ?? throw new ArgumentNullException(nameof(_config), "Jwt:Key is not configured.");
        var key = Encoding.UTF8.GetBytes(keyString);

        var issuer = _config["Jwt:Issuer"] ?? throw new ArgumentNullException(nameof(_config), "Jwt:Issuer is not configured.");
        var audience = _config["Jwt:Audience"] ?? throw new ArgumentNullException(nameof(_config), "Jwt:Audience is not configured.");
        var expireMinutes = Convert.ToInt32(_config["Jwt:ExpireMinutes"] ?? throw new ArgumentNullException(nameof(_config), "Jwt:ExpireMinutes is not configured."));

        var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: new[] { new Claim(ClaimTypes.Name, username) },
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}