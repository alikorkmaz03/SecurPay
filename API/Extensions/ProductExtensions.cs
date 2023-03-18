using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) //parametreler göre sıralama yapması için bu yöntemi kullanıyoruz.
        {
            if(string.IsNullOrWhiteSpace(orderBy))  return query.OrderBy(p=>p.Name);
            query=orderBy switch
            {
           "price"=>query.OrderBy(p=>p.Price),
           "priceDesc" =>query.OrderByDescending(p=>p.Price),
                 _ =>query.OrderBy(p=>p.Name) // default olan yapacağı durum
            };

            return query;

        }

    }
}