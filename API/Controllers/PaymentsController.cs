using API.Data;
using API.DTOs;
using API.Entities.BulkOrder;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly NtContext _context;
        private readonly IConfiguration _config;
        private readonly PaymentService _paymentService;
        public PaymentsController(PaymentService paymentService, NtContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymenIntent()
        {
            var basket = _context.Baskets.RetreiveBasketWithItems(User.Identity.Name).FirstOrDefault();

            if (basket == null) return NotFound();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Ödeme tercihiniz oluşturulurken sorun oluştu!..." });

            //C# dilinde, bu ifade "null-coalescing" operatörünü kullanır. ?? operatörü, sol taraftaki değer null ise sağ taraftaki değeri kullanır.
            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _context.Update(basket);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Ödeme tercihinizde alışveriş sepeti güncellenirken bir sorun oluştu!..." });

            return basket.MapBasketDto();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebHook()
        {   
            var json = await new StreamReader (HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _config["StripeSettings:WhSecret"]);

            var charge =((Charge)stripeEvent.Data.Object);
            var order =await _context.Orders.FirstOrDefaultAsync(c=>c.PaymentIntentId==charge.PaymentIntentId);

            if (charge.Status == "succeeded") order.OrderStatus = OrderStatus.ÖdemeAlındı;

            await _context.SaveChangesAsync();

            return new EmptyResult(); // ödeme başarılı olduktan sonra stripe a boş sonuç gönderiyoruz çünkü tekrar tekrar cevap dönüyor.
        }

    }
}
