using Autofac;
using Autofac.Extensions.DependencyInjection;
using Business.Abstract;
using Business.Concrete;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using DataAccess.DependencyResolvers.Autofac;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// --- ADD THIS LINE TO USE AUTOFAC ---
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

// --- REGISTER YOUR AUTOFAC MODULE ---
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    containerBuilder.RegisterModule(new AutofacBusinessModule());
});

// Add services to the container.
// 1. Add Database Support (SQL Server)
//builder.Services.AddDbContext<TaskManagerContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Dependency Injection: Linking Interfaces to Classes
// Data Access Layer
//builder.Services.AddSingleton<ITaskDal, EfTaskItemDal>();
//builder.Services.AddSingleton<ITaskItemService, TaskItemManager>();

builder.Services.AddControllers();
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
