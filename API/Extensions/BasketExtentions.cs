using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtentions
    {
        public static BasketDto MapBasketDto (this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId=basket.PaymentIntentId,
                ClientSecret=basket.ClientSecret,
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

        public static IQueryable<Basket> RetreiveBasketWithItems(this  IQueryable<Basket> query,string buyerID) 
        {
            return query.Include(i=>i.Items)
                        .ThenInclude(p=>p.Product)
                        .Where(b=>b.BuyerId==buyerID);
        }


    }
}
