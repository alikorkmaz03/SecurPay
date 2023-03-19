using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;

        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        //JWT Token şifreleme ve üretme  işlemlerini burada yapıyoruz
        public async Task<string> GenerateToken(User user)
        {
            // Yük, token ile iletilen gerçek verileri içerir. Bu veriler, genellikle "claim" adı verilen ifadelerdir ve key-value çiftlerinden oluşan bir JSON nesnesidir
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            //JWT ile token symetric key üretiyoruz
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));

            //key'i imazlıyoruz. HmacSha512 algoritması ile farklı key şifrelme algoritmaları kullanılabilir.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken
                (
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(7),//1 haftalık 
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
