using Microsoft.EntityFrameworkCore;
namespace canvasAPI.models;

public class CanvasContext : DbContext
{
    public CanvasContext(DbContextOptions<CanvasContext> options)
        : base(options)
    {
    }

    public DbSet<Artworks> Artworks { get; set; } = null!;
}