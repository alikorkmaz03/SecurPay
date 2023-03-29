//using API.Data;
//using API.DTO;
//using API.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Stripe;
//using TokenService = API.Services.TokenService;


 /////burası yapılacak
//namespace API.Controllers
//{
//    public class CardController : BaseApiController
//    {
     
//        private readonly TokenService _tokenService;
//        private readonly SecurePayContext _context;

//        public CardController(  TokenService tokenService, SecurePayContext context)
//        {
       
//            _tokenService = tokenService;
//            _context = context;
             
//        }
//        [HttpPost("add")]
//        public async Task<ActionResult<CreditCardDTO>> AddToCard(AddToCardDto addToCardDto)
//        {
//            var product = await _productService.GetProductByIdAsync(addToCardDto.ProductId);
//            if (product == null) return NotFound(new ProblemDetails { Title = "Ürün bulunamadı." });
//            var card = await _cardService.AddToCardAsync(addToCardDto.ProductId, addToCardDto.Quantity);
//            return Ok(card);
//        }
//        [HttpGet("get")]
//        public async Task<ActionResult<CardDto>> GetCard()
//        {
//            var card = await _cardService.GetCardAsync();
//            return Ok(card);
//        }
//        [HttpDelete("delete/{productId}")]
//        public async Task<ActionResult<CardDto>> DeleteFromCard(int productId)
//        {
//            var card = await _cardService.DeleteFromCardAsync(productId);
//            return Ok(card);
//        }
//        [HttpPut("update")]
//        public async Task<ActionResult<CardDto>> UpdateCard(UpdateCardDto updateCardDto)
//        {
//            var card = await _cardService.UpdateCardAsync(updateCardDto);
//            return Ok(card);
//        }
//    }
