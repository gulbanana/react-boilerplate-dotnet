using Microsoft.EntityFrameworkCore;

namespace Sheet;

class SheetContext(DbContextOptions<SheetContext> options) : DbContext(options)
{
    public DbSet<Character> Characters => Set<Character>();
    public DbSet<Stat> Stats => Set<Stat>();
}

class Character
{
    public int Id { get; set; }
    public required string PlayerName { get; set; }
    public required string CharacterName { get; set; }
    public List<Stat> Stats { get; } = new();
}

class Stat
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Value { get; set; }
}