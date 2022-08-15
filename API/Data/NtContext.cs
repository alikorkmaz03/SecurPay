using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NtContext : DbContext
    {
        public NtContext(DbContextOptions options): base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        
    }
}