using Business.Abstract;
using Business.Concrete;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// 1. Add Database Support (SQL Server)
//builder.Services.AddDbContext<TaskManagerContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Dependency Injection: Linking Interfaces to Classes
// Data Access Layer
builder.Services.AddSingleton<ITaskDal, EfTaskItemDal>();

// Business Layer
builder.Services.AddSingleton<ITaskItemService, TaskItemManager>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// 4. OpenAPI/Swagger Support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    app.UseSwagger();   // This creates the JSON spec
    app.UseSwaggerUI(); // This creates the UI at /swagger
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
