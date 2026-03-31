using Autofac;
using Autofac.Extensions.DependencyInjection;
using Core.Utilities.Security.Encryption;
using Core.Utilities.Security.JWT;
using DataAccess.DependencyResolvers.Autofac;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<TokenOptions>();


// --- ADD THIS LINE TO USE AUTOFAC ---
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

// --- REGISTER YOUR AUTOFAC MODULE ---
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    containerBuilder.RegisterModule(new AutofacBusinessModule());
});


// 3. Add JWT Authentication Service (CRITICAL)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = tokenOptions.Issuer,
            ValidAudience = tokenOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = SecurityKeyHelper.CreateSecurityKey(tokenOptions.SecurityKey)
        };
    });


builder.Services.AddControllers();

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
