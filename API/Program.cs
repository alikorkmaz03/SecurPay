using System;
using System.Text;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


//Add Services the container
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

//*************************************************************************
///JWT Configuration
builder.Services.AddSwaggerGen(c =>
{
    // JWT kimlik doğrulama şeması için OpenApiSecurityScheme nesnesi oluşturuluyor.
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",// Bearer token formatı "JWT" olarak belirlenir.
        Name = "Authorization",// Header'da kullanılacak parametre adı "Authorization" olarak belirlenir.
        In = ParameterLocation.Header,// Parametrenin HTTP Header'da bulunacağını belirtir.
        Type = SecuritySchemeType.ApiKey,// Güvenlik şeması türü API anahtarı olarak belirlenir.
        Scheme = JwtBearerDefaults.AuthenticationScheme,// Şema, JwtBearerDefaults.AuthenticationScheme ile belirlenir.
        Description = "Put Bearer + Token bilgisini aşağıdaki kutuya yapıştırın",// Swagger UI'de gösterilecek açıklama metni.
        Reference = new OpenApiReference // Swagger belgelendirmesi için referans ayarları.
        {
            Id = JwtBearerDefaults.AuthenticationScheme, // Referans için kimlik doğrulama şeması adı kullanılır.
            Type = ReferenceType.SecurityScheme// Referans türü güvenlik şeması olarak belirlenir.
        }

    };
    // Oluşturulan JWT güvenlik şemasını Swagger belgelendirmesine ekler.
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {

            jwtSecurityScheme,Array.Empty<string>()
        }
    });
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "NtStoreAPI", Version = "v1" });

});
//*************************************************************************


builder.Services.AddDbContext<NtContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("NtDefaultConnetion"));
});
builder.Services.AddCors();//Cors Origin ayarı için eklendi.
//Rol ve Login için eklendi
builder.Services.AddIdentityCore<User>(opt =>
{
    //Email kontrolü yapıyoruz duplicate email girilmemesi için
    opt.User.RequireUniqueEmail = true;
})
    .AddRoles<Role>()
    .AddEntityFrameworkStores<NtContext>();



//*************************************************************************
///JWT Kontrolü için eklendi.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
        };
    });
 
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<PaymentService>();



//*************************************************************************
var app = builder.Build();


//Configure the HTTP request pipeline
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // "persistAuthorization": true ile, kullanıcının yaptığı API kimlik doğrulama işlemi, sayfa yeniden yüklendiğinde veya farklı bir API endpoint'ine geçtiğinde de korunur.
        // Bu, kullanıcıların her endpoint'te yeniden kimlik doğrulama yapmasına gerek kalmadan API'yi test etmelerine olanak tanır.
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", true); ////önemli!!
    });
}

//app.UseHttpsRedirection();

app.UseRouting();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5000");

});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<NtContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await DbInitializer.Initialize(context, userManager);
}
catch (Exception ex)
{

    logger.LogError(ex, "Migrating duration get error!...");
}

app.Run();


