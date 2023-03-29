using API.Entities;

namespace API.DTO
{
    public class CreditCardDTO
    {
        public string CardNo { get; set; }
        public string CardHolderName { get; set; }
        public string ExpirationDate { get; set; }
        public string CVV { get; set; }
        public string CardType { get; set; }
        public string UserId { get; set; }
        public User User { get; set; } 
    }
}
