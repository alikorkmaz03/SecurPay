using API.Contratcts;
using API.Services;

namespace API.Extensions
{
    public static class ServiceExtensions
    {

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
                });
            });
        }
        public static void ConfigureLoggerManager(this IServiceCollection services)
        {

            services.AddSingleton<ILoggerManager, LoggerManager>();
        }
    }
}
