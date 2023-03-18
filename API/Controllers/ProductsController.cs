using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {

        private readonly NtContext _context;

        public ProductsController(NtContext context)
        {
            _context = context;

        }
        
         [HttpGet] //****QUERY İLE ÜRÜNLERİ LLİSTELEME Çalışır ****
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy,string searchTerm)
        {
            var query= _context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .AsQueryable();
               
                return await query.ToListAsync();
        }


        // [HttpGet] //****Senkron Çalışır ****
        // public ActionResult<List<Product>>GetProducts()
        // {
        //     var products= context.Products.ToList();

        //     return Ok(products);
        // }
        // [HttpGet] //****ASenkron Çalışır ****
        // public async Task<ActionResult<List<Product>>> GetProducts()
        // {
        //     return await _context.Products.ToListAsync();

        // }


        // [HttpGet("{Id}")]//****ASenkron Çalışır ****
        // public ActionResult<Product>GetProductById(int Id)
        // {
        //     return context.Products.Find(Id);
        // }

        [HttpGet("{id}")]//***Asenkron Çalışır//
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product= await _context.Products.FindAsync(id);

            if (product==null) return NotFound();

            return product;    
            
        }
    }
}