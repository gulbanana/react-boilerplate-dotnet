using Microsoft.EntityFrameworkCore;
using Sheet;

// config
var appData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
var dbPath = Path.Join(appData, "sheet.etilqs");

// services
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SheetContext>(options => options.UseSqlite($"Data Source={dbPath}"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// init db
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<SheetContext>();
    context.Database.EnsureCreated();
}

// http pipeline
app.UseHttpsRedirection();

// endpoints
app.MapGet("/create", async (SheetContext context) =>
{
    context.Characters.Add(new Character() { PlayerName = "Thomas", CharacterName = "Wizard" });
    await context.SaveChangesAsync();
    return Results.Json($"Character created.");
});

app.MapGet("/stats", async (SheetContext context) =>
{
    var charCount = await context.Characters.CountAsync(); ;
    return Results.Json($"DB contains {charCount} characters.");
});

app.Run();
