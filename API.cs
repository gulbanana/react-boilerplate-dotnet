using Microsoft.EntityFrameworkCore;

namespace Sheet;

class API
{
    public static void Map(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("seed", async (SheetContext context) =>
        {
            context.Characters.Add(new Character
            {
                PlayerName = "Philip",
                CharacterName = "Sorceror",
                Stats =
                {
                    new Stat { Name = "Power", Value = 2 },
                    new Stat { Name = "Wisdom", Value = 2 },
                    new Stat { Name = "Novelty", Value = 2 }
                }
            });

            context.Characters.Add(new Character
            {
                PlayerName = "Thomas",
                CharacterName = "Wizard",
                Stats =
                {
                    new Stat { Name = "Power", Value = 3 },
                    new Stat { Name = "Wisdom", Value = 3 }
                }
            });

            context.Characters.Add(new Character
            {
                PlayerName = "Thomas",
                CharacterName = "Magic User",
                Stats =
                {
                    new Stat { Name = "Power", Value = 1 },
                    new Stat { Name = "Wisdom", Value = 3 },
                    new Stat { Name = "Dexterity", Value = 1 },
                    new Stat { Name = "Use Magic Item", Value = 1 }
                }
            });

            await context.SaveChangesAsync();
            return "done";
        });

        endpoints.MapGet("character/list", async (SheetContext context) =>
        {
            var allCharacters = await context.Characters.ToListAsync();
            return Results.Json(allCharacters);
        });

        endpoints.MapGet("character/{id:int}", async (SheetContext context, int id) =>
        {
            var foundCharacterWithStats = await context.Characters
                .Include(c => c.Stats)
                .SingleAsync(c => c.Id == id);
            return Results.Json(foundCharacterWithStats);
        });
    }
}