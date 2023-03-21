using API.Entities.BulkOrder;

namespace API.DTO
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        
        public ShippingAddress ShippingAddress { get; set; }
    }
}
