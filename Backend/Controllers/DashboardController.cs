using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    [HttpGet]
    public IActionResult GetChartData()
    {
        var data = new[]
        {
            new { status = "Open", count = 10 },
            new { status = "In Progress", count = 5 },
            new { status = "Closed", count = 8 }
        };

        return Ok(data);
    }
}
