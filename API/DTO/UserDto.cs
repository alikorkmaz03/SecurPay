using API.DTOs;
using API.Entities;

namespace API.DTO
{
    public class UserDto
    {
        public string Email { get; set; }

        public string Token { get; set; }
        public BasketDto Basket { get; set; }
    }
}
