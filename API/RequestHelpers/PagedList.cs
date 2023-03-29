using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T>:List<T>
    {   
        //Dinamik liste çevirmesi için kurduğumuz yapıdan aşağıdaki yapıyı oluşturmak için ctrl+"." yapıp Generate Contructor diyoruz.
        public PagedList(List<T> items,int count, int pageNumber,int pageSize)
        {
            MetaData = new MetaData{
                TotalCount=count,
                PageSize=pageSize,
                CurrentPage=pageNumber,
                TotalPages= (int)Math.Ceiling(count/ (double)pageSize)
            };
            AddRange(items);
        }
        public MetaData MetaData { get; set; }
        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,int pageNumber,int pageSize)
        {
            // Sayfalamanın başlayacağı öğeye atlayın ve belirtilen sayıda öğe alın
            var count = await query.CountAsync();
            //"Skip((pageNumber-1)*pageSize)" ifadesi, sorgu sonucundan belirtilen sayfa numarasındaki verileri atlayarak sayfalamayı yapar.
            //"pageNumber" ifadesi, kaçıncı sayfanın getirileceğini belirler ve "pageSize" ifadesi ise her sayfadaki öğe sayısını belirler.
            //Bu nedenle, sorgu sonucundan kaç öğenin atlanacağını belirleyen bir ifadedir.
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items,count,pageNumber,pageSize);
            
        }
        
    }
}