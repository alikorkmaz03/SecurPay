using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.BulkOrder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NtContext : IdentityDbContext<User,Role,int> //tüm sınıfları int olarak Id Kullanıcağı anlamına gelir.
    {
        public NtContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(a => a.Address) // User sınıfının Address özelliğinde bir ilişki olduğunu belirtir
                .WithOne() // UserAddress sınıfının User sınıfı ile tek yönlü bir ilişkisi olduğunu belirtir
                .HasForeignKey<UserAddress>(a => a.Id) // UserAddress sınıfının Id özelliğinde bir yabancı anahtar olduğunu belirtir
                .OnDelete(DeleteBehavior.Cascade); // User sınıfındaki bir kayıt silindiğinde, ilişkili UserAddress kaydının da silinmesi gerektiğini belirtir
           
            builder.Entity<Role>()
                .HasData(
                    new Role {Id=1, Name = "Member", NormalizedName = "MEMBER" },
                    new Role {Id=2, Name = "Admin", NormalizedName = "ADMIN" }
                );
        }

    }
}