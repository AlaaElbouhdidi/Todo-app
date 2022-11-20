using Microsoft.EntityFrameworkCore;
namespace server.Data
{
    internal static class TodosRepository
    {
        internal async static Task<List<Todo>> GetTodosAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Todos.ToListAsync();
            }
        }
        internal async static Task<Todo> GetTodoByIdAsync(string todoId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Todos
                .FirstOrDefaultAsync(todo => todo.TodoId == todoId) ?? new Todo();

            }
        }
        internal async static Task<bool> CreateTodoAsync(Todo todoToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Todos.AddAsync(todoToCreate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> UpdateTodoAsync(Todo todoToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Todos.Update(todoToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> DeleteTodoAsync(string todoId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Todo todoToDelete = await GetTodoByIdAsync(todoId);
                    db.Remove(todoToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
    }
}
