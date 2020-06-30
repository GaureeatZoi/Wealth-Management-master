using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using ZOI.BAL.Models;

namespace ZOI.BAL.DBContext
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Renaming the Core Identity Tables
            builder.Entity<ApplicationUser>().ToTable("tbl_Users", "dbo");
            builder.Entity<IdentityRole>().ToTable("tbl_Roles", "dbo");
            builder.Entity<IdentityUserRole<string>>().ToTable("tbl_UserRoles", "dbo");
            builder.Entity<IdentityUserClaim<string>>().ToTable("tbl_UserClaims", "dbo");
            builder.Entity<IdentityUserLogin<string>>().ToTable("tbl_UserLogins", "dbo");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("tbl_RoleClaims", "dbo");
            builder.Entity<IdentityUserToken<string>>().ToTable("tbl_UserTokens", "dbo");

        }
    }
}
