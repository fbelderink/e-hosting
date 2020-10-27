using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models 
{
    public partial class User {
        [Key]
        public Guid Uid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
    }
}