using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace API.Controllers
{
    
    public class AccountController :BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly NtContext _context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, NtContext context) 
        {
            _userManager = userManager;
            _tokenService = tokenService;
            context = _context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            // Kullanıcının adını kullanarak kullanıcıyı veritabanından arar
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            // Eğer kullanıcı yoksa veya parola doğrulanamazsa 401 Unauthorized yanıtı gönderir.
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return  Unauthorized(new ProblemDetails { Title = "Hatalı Giriş" });

            // Kullanıcının sepetini anonim kullanıcının sepetiyle birleştirir.
            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                await _context.SaveChangesAsync();
            }
            // Kullanıcının e - posta adresi, JWT token ve sepetinin DTO'su olan UserDto nesnesi döndürülür.
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketDto() : userBasket.MapBasketDto()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            //burada kullanıcı ve şifre kontrolü yapıyoruz
            var result =  await _userManager.CreateAsync(user,registerDto.Password);

            if (!result.Succeeded) 
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);

        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };

        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId)) { Response.Cookies.Delete("buyerId"); return null; }
            return await _context.Baskets
              .Include(i => i.Items)
              .ThenInclude(p => p.Product)
              .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }


    }
}
