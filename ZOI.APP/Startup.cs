using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ZOI.BAL.Configuration;
using ZOI.BAL.DBContext;
using ZOI.BAL.Models;
using ZOI.BAL.Services;
using ZOI.BAL.Services.Interface;
using ZOI.DAL.DatabaseUtility;
using ZOI.DAL.DatabaseUtility.Interface;

namespace ZOI.APP
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // aspnetrun dependencies
            ConfigureAspnetRunServices(services);

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc(option => {
                option.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
            });
            services.AddScoped<IMenuService, MenuService>();
            services.AddSingleton<IADODataFuntion, ADODataFunction>();

            services.AddIdentity<ApplicationUser, IdentityRole>()
               .AddEntityFrameworkStores<DatabaseContext>();


            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private void ConfigureAspnetRunServices(IServiceCollection services)
        {
            // Add Core Layer
            services.Configure<AspnetRunSettings>(Configuration);

            // Add Infrastructure Layer
            ConfigureDatabases(services);
            // Add Miscellaneous
            services.AddHttpContextAccessor();
        }

        public void ConfigureDatabases(IServiceCollection services)
        {
            //// use in-memory database
            //services.AddDbContext<AspnetRunContext>(c =>
            //    c.UseInMemoryDatabase("AspnetRunConnection"));
            
            // use real database
            services.AddDbContext<DatabaseContext>(c =>
                c.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));

            
        }
    }
}
