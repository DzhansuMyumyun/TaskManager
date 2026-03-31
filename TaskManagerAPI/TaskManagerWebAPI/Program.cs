using Autofac;
using Autofac.Extensions.DependencyInjection;
using Business.Abstract;
using Business.Concrete;
using Core.Utilities.Security.JWT;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using DataAccess.DependencyResolvers.Autofac;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<TokenOptions>();


// --- ADD THIS LINE TO USE AUTOFAC ---
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

// --- REGISTER YOUR AUTOFAC MODULE ---
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    containerBuilder.RegisterModule(new AutofacBusinessModule());
});



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
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
