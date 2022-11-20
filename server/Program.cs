using server.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI( swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET Server Swagger";
});

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://spectacular-praline-4416c5.netlify.app", "https://purple-grass-0b55b2d03.2.azurestaticapps.net/"));


app.MapGet("/get-all-todos", async () => await TodosRepository.GetTodosAsync());

app.MapGet("/get-todo-by-id/{todoId}", async (string todoId) =>
{
    Todo todoToReturn = await TodosRepository.GetTodoByIdAsync(todoId);

    if (todoToReturn != null) return Results.Ok(todoToReturn);

    else return Results.BadRequest();
})
    .WithTags("Posts Endpoints");

app.MapPost("/add-todo", async (Todo todoToCreate) =>
{
    if (await TodosRepository.CreateTodoAsync(todoToCreate)) return Results.Ok("Create successfull");

    else return Results.BadRequest();
})
    .WithTags("Posts Endpoints");

app.MapPut("/update-todo", async (Todo todoToUpdate) =>
{
    if (await TodosRepository.UpdateTodoAsync(todoToUpdate)) return Results.Ok("Update successfull");

    else return Results.BadRequest();
})
    .WithTags("Posts Endpoints");

app.MapDelete("/delete-todo-by-id/{todoId}", async (string todoId) =>
{

    if (await TodosRepository.DeleteTodoAsync(todoId)) return Results.Ok("Delete successfull");

    else return Results.BadRequest();
})
    .WithTags("Posts Endpoints");

app.Run();