using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
       
        private readonly NtContext _context;
        
        public ProductsController(NtContext context)
        {
            _context = context;
                   
        }
        
        [HttpGet] //****ASenkron Çalışır ****
        public async Task<ActionResult<List<Product>>>GetProducts()
        {
            return await _context.Products.ToListAsync();

        }
        
       
         [HttpGet("{Id}")]//***Asenkron Çalışır//
        public async Task<ActionResult<Product>>GetProductById(int Id)
        {
            return await _context.Products.FindAsync(Id);
        }
    }
}