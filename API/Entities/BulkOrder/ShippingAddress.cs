using Microsoft.EntityFrameworkCore;

namespace API.Entities.BulkOrder
{
    [Owned] //bir sınıfın başka bir sınıfın parçası olduğunu belirtir
    public class ShippingAddress :Address
    {
        
    }
}
