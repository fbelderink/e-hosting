using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Http;

namespace Backend
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(ApiException e)
            {
               context.Response.StatusCode = (int) HttpStatusCode.BadRequest;
               context.Response.ContentType = "application/json";
               var content = JsonSerializer.Serialize(new Error{
                   Code = e.Code,
                   Message = e.Message
               });
               await context.Response.WriteAsync(content); 
            }
        }
    }
}