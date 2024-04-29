using System.Text.Json;

List<int> ids = new List<int> { 10154, 679844, 437984, 13344, 437991, 437532, 10186, 11040, 36029, 36081, 437149, 435690, 829408};
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

app.MapGet("/paintingids", async (IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();
    var response = await client.GetAsync("https://collectionapi.metmuseum.org/public/collection/v1/objects/10154");
    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    Console.WriteLine(content);

    return content;
})
.WithName("paintingids")
.WithOpenApi();

app.Run();
