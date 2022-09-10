using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController :BaseApiController
    {
        private readonly NtContext _context;
        public  BasketController(NtContext context)
        {
            _context = context;

        }
        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);

        }


        [HttpPost] //api/basket?productId=3&quantity=2
         public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId,int quantity)
        {
            //Get basket || create basket
            var basket =await RetrieveBasket();

             //Create Basket
            if(basket==null) basket=CreateBasket();

             //Get Product
            var product = await _context.Products.FindAsync(productId);
            if(product==null) return NotFound();

            //Add Item
            basket.AddItem(product,quantity);

             //Save Changes
            var result = await _context.SaveChangesAsync()> 0;

            if(result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));//201: Sunucu tarafından isteğin yerine getirildiği ve yeni bir kaynak oluşturulduğu anlamına gelir.

            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }

        // [HttpDelete]
        // public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
        // {   
        //     //Get basket

        //     //Remove item or reduce quantity

        //     //Save Changes
        //     return await ;
        // }
         private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
              .Include(i => i.Items)
              .ThenInclude(p => p.Product)
              .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        
        private Basket CreateBasket()
        {
           var buyerId =Guid.NewGuid().ToString();//Guid 'i uniqe olarak üretir.
           var cookieOptions= new CookieOptions{IsEssential= true,Expires=DateTime.Now.AddDays(30)};
           Response.Cookies.Append("buyerId",buyerId,cookieOptions);
           var basket=new Basket{BuyerId=buyerId};
           _context.Baskets.Add(basket);

           return basket;
        }
        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                    Type = item.Product.Type
                }).ToList()

            };
        }


    }
}