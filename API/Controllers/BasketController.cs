using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly SecurePayContext _context;
        public BasketController(SecurePayContext context)
        {
            _context = context;

        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();

            return basket.MapBasketDto();

        }


        [HttpPost] //api/basket?productId=3&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //Get basket || create basket
            var basket = await RetrieveBasket(GetBuyerId());

            //Create Basket
            if (basket == null) basket = CreateBasket();

            //Get Product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Ürün Bulunamadı..." });

            //Add Item
            basket.AddItem(product, quantity);

            //Save Changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketDto());//201: Sunucu tarafından isteğin yerine getirildiği ve yeni bir kaynak oluşturulduğu anlamına gelir.

            return BadRequest(new ProblemDetails { Title = "Ürün Sepete Eklenirken Sorun!..." });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //Get basket
            var basket = await RetrieveBasket(GetBuyerId());
            //Remove item or reduce quantity
            if (basket == null) return NotFound();
            //Save Changes
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Ürün Sepetten Çıkarılırken Sorun!..." });
        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId)) { Response.Cookies.Delete("buyerId"); return null; }
            return await _context.Baskets
              .Include(i => i.Items)
              .ThenInclude(p => p.Product)
              .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User?.Identity.Name ?? Request.Cookies["buyerId"];
        }
        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name; //üyeyse adı 
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();//Guid 'i uniqe olarak üretir.*/
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }

    }
}