using Microsoft.EntityFrameworkCore;
using Sheet;

// config
var appData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
var dbPath = Path.Join(appData, "sheet.etilqs");

// injectables
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddDbContext<SheetContext>(options => options.UseSqlite($"Data Source={dbPath}"));

// init db
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<SheetContext>();
    context.Database.EnsureCreated();
}

// http pipeline
app.UseStaticFiles();

// endpoints
app.MapGet("", () => Results.Redirect("index.html"));

app.MapGet("character/{id}", (SheetContext context, int id) =>
{
    var c = context.Characters.Find(id);
    return Results.Json(context.Characters.Find(id));
});

app.Run();
