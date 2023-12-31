namespace Sheet;

class API
{
    public static void Map(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("character/{id}", (SheetContext context, int id) =>
        {
            var c = context.Characters.Find(id);
            return Results.Json(context.Characters.Find(id));
        });
    }
}