using Microsoft.EntityFrameworkCore;
using Sheet;

// config
var appData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
var dbPath = Path.Join(appData, "sheet.etilqs");

// injectables
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddDatabaseDeveloperPageExceptionFilter()
    .AddDbContext<SheetContext>(options => options.UseSqlite($"Data Source={dbPath}"));

if (builder.Environment.IsDevelopment())
{
    builder.Services
        .AddReverseProxy()
        .LoadFromConfig(builder.Configuration.GetSection("YARP"));
}

// init db
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<SheetContext>();
    context.Database.EnsureCreated();
}

// http pipeline
API.Map(app);

if (app.Environment.IsDevelopment())
{
    app.MapReverseProxy();
}
else
{
    app.UseStaticFiles();
    app.MapGet("", () => Results.Redirect("index.html"));
}

app.Run();
