using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) //parametrelere göre sıralama yapması için bu yöntemi kullanıyoruz.
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
        
        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if(string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm= searchTerm.Trim().ToLower();

            return query.Where(p=>p.Name.ToLower().Contains(lowerCaseSearchTerm)); //ürünler içinde backend tarafında dinamik arama yapmamızı sağlar bunu yazarken boşlukları sildik ve tolower ile stringleri küçük kabul ettik
            
        }
    }
}