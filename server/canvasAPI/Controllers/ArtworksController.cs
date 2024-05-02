using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using canvasAPI.models;
using Microsoft.EntityFrameworkCore;
namespace canvasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtworksController : ControllerBase
    {
        
        private readonly CanvasContext _context;
        public ArtworksController(CanvasContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetArtworks()
        {
            var Art = await _context.Artworks.ToListAsync();
            return Ok(Art);
            
        }
        
    }
}