using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient(); // Add HTTP client service

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

static async Task<string> GetArt(IHttpClientFactory httpClientFactory)
{
    List<string> ids = new List<string> { "10154", "679844", "437984", "13344", "437991", "437532", "10186", "11040", "36029", "36081", "437149", "435690" };
    string objURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    DateTime now = DateTime.Now;
    int index = now.Month;
    var client = httpClientFactory.CreateClient();
    var response = await client.GetAsync(objURL + ids[index - 1]);
    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    Console.WriteLine(content);

    return content;
}

// Define a method to periodically call GetArt once every day
async Task PeriodicallyCallGetArt(IHttpClientFactory httpClientFactory)
{
    while (true)
    {
        // Call GetArt
        await GetArt(httpClientFactory);

        // Delay until next day
        var now = DateTime.Now;
        var nextDay = now.AddDays(1).Date;
        var delay = nextDay - now;
        await Task.Delay(delay);
    }
}
app.MapGet("paintingids", (HttpContext httpContext) =>
    {
        

        return "hello";
    }).WithName("paintingids")
.WithOpenApi();;
// Start the periodic task
var httpClientFactory = app.Services.GetRequiredService<IHttpClientFactory>();
_ = PeriodicallyCallGetArt(httpClientFactory);

app.Run();
