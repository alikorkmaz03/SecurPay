using System;
using System.Text;
using API.Contratcts;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog;

var builder = WebApplication.CreateBuilder(args);

LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));

//Add Services the container
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
 
//NLog Manager için
builder.Services.ConfigureLoggerManager();




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
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SecurePayAPI", Version = "v1" });

});
//*************************FlyIO ve Development mode ConnectionStrings************************************************
string connString;
if (builder.Environment.IsDevelopment())
    connString = builder.Configuration.GetConnectionString("SecurePayDefaultConnection");
else
{
    // Use connection string provided at runtime by FlyIO.
    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

    // Parse connection URL to connection string for Npgsql
    connUrl = connUrl.Replace("postgres://", string.Empty);
    var pgUserPass = connUrl.Split("@")[0];
    var pgHostPortDb = connUrl.Split("@")[1];
    var pgHostPort = pgHostPortDb.Split("/")[0];
    var pgDb = pgHostPortDb.Split("/")[1];
    var pgUser = pgUserPass.Split(":")[0];
    var pgPass = pgUserPass.Split(":")[1];
    var pgHost = pgHostPort.Split(":")[0];
    var pgPort = pgHostPort.Split(":")[1];
    var updatedHost = pgHost.Replace("flycast", "internal");

    connString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
}
builder.Services.AddDbContext<SecurePayContext>(opt =>
{
    opt.UseNpgsql(connString);
});



//Eski connectionstring
// builder.Services.AddDbContext<SecurePayContext>(opt =>
// {
//     opt.UseNpgsql(builder.Configuration.GetConnectionString("SecurePayDefaultConnection"));
// });
builder.Services.AddCors();//Cors Origin ayarı için eklendi.

//Rol ve Login için eklendi
builder.Services.AddIdentityCore<User>(opt =>
{
    //Email kontrolü yapıyoruz duplicate email girilmemesi için
    opt.User.RequireUniqueEmail = true;
})
    .AddRoles<Role>()
    .AddEntityFrameworkStores<SecurePayContext>();



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

//ASP.NET Core uygulamasında, belirtilen bir varsayılan dosyanın sunucuda bulunması durumunda varsayılan dosya olarak kullanılmasını sağlar.örnek /**http://localhost:5000 **/adresini index.html olarak sunar
app.UseDefaultFiles();
//istemcilere sunulacak olan statik dosyaların sunucu tarafından servis edilmesini sağlar. Bu sayede istemci tarayıcının belirtilen dosyaları indirmesi gereksiz hale gelir.
app.UseStaticFiles();
//app.UseHttpsRedirection();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5000");

});
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
//bir URL'nin doğru bir yönlendirme veya dosya olmadığında kullanılacak bir varsayılan sayfayı belirlemek için kullanılır.
app.MapFallbackToController("index", "Fallback");

// İçerisinde bağımlılık enjeksiyonu için kullanılacak nesneleri barındıran bir kapsam oluşturun.
using var scope = app.Services.CreateScope();

// Kapsamdan gerekli hizmetleri alarak veritabanı bağlamı, kullanıcı yöneticisi ve günlükleyici nesnelerini oluşturun.
var context = scope.ServiceProvider.GetRequiredService<SecurePayContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    // Veritabanındaki mevcut migrasyonları uygulayarak, veritabanının güncel olmasını sağlar
    await context.Database.MigrateAsync();

    // Veritabanını başlangıç verileriyle doldurur (ör. örnek kullanıcılar, roller vb.).
    await DbInitializer.Initialize(context, userManager);
}
catch (Exception ex)
{
    
    logger.LogError(ex, "Migrating duration get error!...");
}

app.Run();


