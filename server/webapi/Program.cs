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
    return content;
}

// Define a method to periodica

app.MapGet("paintingids", (HttpContext httpContext) =>
    {

        return "hello";
    }).WithName("paintingids")
.WithOpenApi();;
// Start the periodic task
app.Run();
