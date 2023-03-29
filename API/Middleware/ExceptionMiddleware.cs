using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _env = env;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode=500;
                // ProblemDetails nesnesi oluşturarak hata detaylarını belirler
                var response =new ProblemDetails
                {
                    Status=500,
                    Detail=_env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title=ex.Message
                };
                // PropertyNamingPolicy.CamelCase ile özellik adlarının camelCase formatında olmasını sağlar
                var options = new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
                // ProblemDetails nesnesini JSON'a dönüştürür
                var json =JsonSerializer.Serialize(response,options);
                // JSON hata mesajını istemciye yazdırır
                await context.Response.WriteAsync(json);

            }
        }

    }
}