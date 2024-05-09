using Microsoft.EntityFrameworkCore;
using canvasAPI.models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql.EntityFrameworkCore.PostgreSQL;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<CanvasContext>(options => 
{
   options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder =>
                {
                    builder.WithOrigins("http://127.0.0.1:8080") // Replace with your actual origin
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });
var app = builder.Build();

app.MapGet("/comments", async (CanvasContext db) =>
    await db.Comments.ToListAsync());


app.MapPost("/comments/post", async (Comments comment, int month, CanvasContext db) =>
{
    comment.month = month;
    db.Comments.Add(comment);
    
    await db.SaveChangesAsync();

    return Results.Created($"/comments/{comment.id}", comment);
});

app.UseCors("AllowSpecificOrigin");
// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
