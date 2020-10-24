using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Backend.Services
{
    public class AuthenticationService : DbContext
    {
        public AuthenticationService(DbContextOptions<AuthenticationService> options) : base(options) { }

        public async Task<(ClaimsIdentity, ClaimsIdentity)> CreateAuthentication(string Email, string Password, RoleType role)
        {
            var guid = Guid.NewGuid();
            var salt = GenerateSalt();

            var newAuthentiation = new Authentication
            {
                Uid = guid,
                Email = Email,
                Password = HashPassword(Password, salt),
                Salt = salt,
                Role = role,
                Count = 0,
            };

            this.Authentications.Add(newAuthentiation);
            await this.SaveChangesAsync();

            var claimsAccess = new Claim[]
            {
                new Claim("Uid", guid.ToString()),
                new Claim("Role", role.ToString())
            };

            var claimsRefresh = new Claim[]
            {
                new Claim("Uid", guid.ToString()),
                new Claim("Count", "0"),
            };

            var claimsIdentityAccess = new ClaimsIdentity(claimsAccess);
            var claimsIdentityRefresh = new ClaimsIdentity(claimsRefresh);

            return (claimsIdentityAccess, claimsIdentityRefresh);
        }

        public async Task<(ClaimsIdentity, ClaimsIdentity, Authentication)> Authenticate(string email, string password){
            var authentication = await this.Authentications.FirstOrDefaultAsync(res => res.Email == email);
            
            if(authentication == null || authentication.Password != HashPassword(password, authentication.Salt)){
                throw new Exception("Username or password wrong!");
            }

            var claimsAccess = new Claim[]
            {
                new Claim("Uid", authentication.Uid.ToString()),
                new Claim("Role", authentication.Role.ToString())
            };

            var claimsRefresh = new Claim[]
            {
                new Claim("Uid", authentication.Uid.ToString()),
                new Claim("Count", authentication.Count.ToString()),
            };

            var claimsIdentityAccess = new ClaimsIdentity(claimsAccess);
            var claimsIdentityRefresh = new ClaimsIdentity(claimsRefresh);

            return (claimsIdentityAccess, claimsIdentityRefresh, authentication);
        }

        private string HashPassword(string password, byte[] salt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            ));
        }

        private byte[] GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public DbSet<Authentication> Authentications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Authentication>()
                .HasIndex(p => p.Email)
                .IsUnique();
        }
    }
}