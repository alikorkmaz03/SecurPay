using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) //parametrelere göre sıralama yapması için bu yöntemi kullanıyoruz.
        {
            // Eğer orderBy parametresi null, boş veya boşluk karakteri içeriyorsa, sorguyu Name'e göre sırala.
            if (string.IsNullOrWhiteSpace(orderBy))  return query.OrderBy(p=>p.Name);
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
        public static IQueryable<Product> Filter(this IQueryable<Product>query ,string brands, string types)
        {
            var brandList = new List<string>();
            var typeList  = new List<string>();

            if(!string.IsNullOrEmpty(brands))
            brandList.AddRange(brands.ToLower().Split(",").ToList());

            if(!string.IsNullOrEmpty(types))

            //addRange types adlı diziye dataları , karakterinden itibaren böler ve ekler
            typeList.AddRange(types.ToLower().Split(",").ToList());

            query=query.Where(p=>brandList.Count== 0 || brandList.Contains(p.Brand.ToLower()));
            query=query.Where(p=>typeList.Count== 0  || typeList.Contains(p.Type.ToLower()));

            return query;

        }
    }
}