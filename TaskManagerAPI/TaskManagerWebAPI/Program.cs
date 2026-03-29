using Business.Abstract;
using Business.Concrete;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// 1. Add Database Support (SQL Server)
builder.Services.AddDbContext<TaskManagerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Dependency Injection: Linking Interfaces to Classes
// Data Access Layer
builder.Services.AddScoped<ITaskDal, EfTaskItemDal>();

// Business Layer
builder.Services.AddScoped<ITaskItemService, TaskItemManager>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// 4. OpenAPI/Swagger Support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Most devs still prefer SwaggerGen for the UI

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
