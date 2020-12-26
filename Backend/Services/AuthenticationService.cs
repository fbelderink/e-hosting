using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Services
{
    public class AuthenticationService : DbContext
    {
        public AuthenticationService(DbContextOptions<AuthenticationService> options) : base(options) { }

        public async Task<(ClaimsIdentity, ClaimsIdentity)> CreateAuthentication(string Email, string Password, RoleType role)
        {
            var guid = Guid.NewGuid();
            var salt = GenerateSalt();

            Authentication newAuthentiation = new Authentication
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

        public async Task<(ClaimsIdentity, ClaimsIdentity, Authentication)> Authenticate(string email, string password)
        {
            Authentication authentication = await this.Authentications.FirstOrDefaultAsync(res => res.Email == email);

            if (authentication == null || authentication.Password != HashPassword(password, authentication.Salt))
            {
                throw new ApiException(401, "Username or password wrong!");
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

        public async Task<ClaimsIdentity> VerifySession(IEnumerable<Claim> claims)
        {
            string uid = claims.Where(c => c.Type == "Uid").FirstOrDefault().Value;
            Authentication authentication = await this.Authentications.FirstOrDefaultAsync(res => res.Uid.ToString() == uid);
            if (authentication == null)
            {
                throw new ApiException(401, "Invalid Session!");
            }

            return new ClaimsIdentity(new Claim[]
            {
                new Claim("Uid", uid),
                new Claim("Role", authentication.Role.ToString())
            });
        }

        public async Task ChangePassword(string uid, string oldPassword, string newPassword)
        {
            Authentication authentication = await this.Authentications.FirstOrDefaultAsync(res => res.Uid.ToString() == uid);

            if (authentication == null)
            {
                throw new ApiException(404, "Ihr Benutzerkonto kann nicht gefunden werden!");
            }

            if (authentication.Password != HashPassword(oldPassword, authentication.Salt))
            {
                throw new ApiException(401, "Ihr aktuelles Passwort ist falsch!");
            }

            authentication.Password = HashPassword(newPassword, authentication.Salt);
            await this.SaveChangesAsync();
        }

        public async Task<ClaimsIdentity> RefreshAccessToken(string uid, string count)
        {
            Authentication authentication = await this.Authentications.FirstOrDefaultAsync(res => res.Uid.ToString() == uid);

            if (authentication == null || !authentication.Count.ToString().Equals(count))
            {
                throw new ApiException(404, "Invalid Token");
            }

            var claims = new Claim[]
            {
                new Claim("Uid", authentication.Uid.ToString()),
                new Claim("Role", authentication.Role.ToString()),
            };

            return new ClaimsIdentity(claims);
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Authentication>()
                .HasIndex(p => p.Email)
                .IsUnique();
        }
    }
}