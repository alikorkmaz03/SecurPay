using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {

        private readonly SecurePayContext _context;

        public ProductsController(SecurePayContext context)
        {
            _context = context;

        }

        [HttpGet] //****QUERY İLE ÜRÜNLERİ LLİSTELEME Çalışır ****
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams) ///eğer parametre alarak sorgu sonucunda ürün listelenecekse [FromQuery] ile bunu controllera bildirmeliyiz.
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);
            return products;
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
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;

        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types =  await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });

        }
 
    }
}