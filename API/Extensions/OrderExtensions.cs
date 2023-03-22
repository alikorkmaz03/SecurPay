using API.DTO;
using API.Entities.BulkOrder;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto>ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDto
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDto
                    {
                        ProductId = item.ItemOrdered.ProductId,
                        Name = item.ItemOrdered.Name,
                        PictureUrl = item.ItemOrdered.PictureUrl,
                        Price = item.Price,
                        Quantity = item.Quantity,
                    }).ToList()

                }).AsNoTracking();

            //"AsNoTracking" özelliği, verilerin sadece okunacağı durumlarda kullanılmalıdır. Çünkü bu özellik, bir varlık nesnesinin değişikliklerinin takip edilememesi anlamına gelir.
            //Bu nedenle, bir varlık nesnesinin güncellenmesi gerekiyorsa, "AsNoTracking" özelliği kullanılmamalıdır. Aksi takdirde, varlık nesnesi değiştirilemeyeceği için hatalar meydana gelebilir.
        }
    }
}
