using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) =>
            dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");
    }
}
