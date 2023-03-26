using API.DTO;
using API.Entities.BulkOrder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                
        public static IQueryable<OrderDto> Search(this IQueryable<OrderDto> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.BuyerId.ToLower().Contains(lowerCaseSearchTerm)); //siparişler içinde backend tarafında dinamik arama yapmamızı sağlar bunu yazarken boşlukları sildik ve tolower ile stringleri küçük kabul ettik
        }

        public static IQueryable<OrderDto> RangeDate(this IQueryable<OrderDto> query, DateTime? startDate, DateTime? endDate)
        {
            if (startDate.HasValue && endDate.HasValue)
            {
                return query.Where(p => p.OrderDate.Date >= startDate.Value.Date && p.OrderDate.Date <= endDate.Value.Date);
            }

            return query;
        }
         

    }
}
