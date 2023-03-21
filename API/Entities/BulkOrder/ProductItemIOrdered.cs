using Microsoft.EntityFrameworkCore;

namespace API.Entities.BulkOrder
{
    
    [Owned] //bir sınıfın başka bir sınıfın parçası olduğunu belirtir
    public class ProductItemIOrdered
    {
        
        public int ProductId { get; set; }

        public string Name{ get; set; }

        public string PictureUrl { get; set; }
    }
}
