using API.DTOs;
using API.Entities;

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
