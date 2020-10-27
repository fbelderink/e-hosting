using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace Backend.Models 
{
    public class CloudOffer 
    {
        [Key]
        public string Storage { get; set; }
        public string Text { get; set; }
        public IEnumerable<string> Features { get; set; } 
        public double Price { get; set; }
        public string Extras { get; set; }
    }
}