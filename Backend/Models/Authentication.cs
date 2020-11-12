using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public partial class Authentication 
    {
        [Key]
        public Guid Uid { get; set; }
        public string Email {get; set; }
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public RoleType Role {get; set; }
        public int Count { get; set; }
    }
    public partial class AuthenticationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public partial class AuthenticationResponse
    {
        public string AccessToken { get; set; }
    }

    public partial class ChangePasswordRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string AccessToken { get; set; }
    }

    public enum RoleType 
    {
        Admin = 0,
        User = 1,
        Guest = 2,
    }
}


