using System.Net.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using System;
using Backend.Models;

namespace Backend
{
    public class WebHostServiceBuilder
    {   
        private readonly string[] args;
        public WebHostServiceBuilder(params string[] args)
        {
            this.args = args;
            HandleArguments(args);
        }

        public IWebHost Build() {
            WebHostBuilder builder = new WebHostBuilder();
            var host = builder
                .UseConfiguration(Configuration)
                .Configure((context, app) => ApplyConfigurations(context, app))
                .ConfigureServices((context, app) => AddServices(context, app))
                .UseKestrel((builderContext, options) =>
                {
                    // if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Development")
                    options.Configure(builderContext.Configuration.GetSection("Kestrel"));
                    options.Limits.MaxRequestBodySize = 900000001;
                })
                .Build();
            PostBuild(host);
            return host;
        }

        #region Config

        public IConfiguration Configuration { get { return LoadConfiguration(); } }

        private IConfiguration configuration = null;

        private IConfiguration LoadConfiguration(){
            configuration = new ConfigurationBuilder().AddJsonFile(ConfigPath, false, true).Build();
            return configuration;
        }

        #endregion

        private void ApplyConfigurations(WebHostBuilderContext context, IApplicationBuilder app)
        {
            if (context.HostingEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        #region Dependency Injections

        private void AddServices(WebHostBuilderContext context, IServiceCollection services){
            services.AddControllers();

            services.AddScoped<TokenHandler>();

            BindModels(services);
            AddEntityFramework(services);
        }

        private void BindModels(IServiceCollection services){
            services.Configure<JwtKeys>(Configuration.GetSection("JwtKeys"));
        }

        private void AddEntityFramework(IServiceCollection services){
            services.AddDbContext<AuthenticationService>((opt) => 
            {
                var conn = "Server=192.168.178.39; Database=authentication;User=admin;Password=admin;";
                opt.UseMySql(conn);
            });
        }

        #endregion

        #region Handle Arguments
        public void HandleArguments(params string[] args){
            ConfigPath = System.IO.Path.Combine("",
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? "appsettings.Development.json" : "appsettings.json");
        }

        private const string configFlag = "-config";
        private const string configPathDefault = "";
        public string ConfigPath;
        public static string GetConfigurationPath(params string[] args)
        {
            for (int i = 0; i < args.Length - 1; i++)
            {
                if (args[i] == configFlag)
                    return args[i + 1];
            }
            return configPathDefault;
        }
        
        #endregion

        private void PostBuild(IWebHost webHost) {
            AuthenticationService authenticationService = webHost.Services.GetRequiredService<AuthenticationService>();
            authenticationService.Database.Migrate();
        }
    }
}
