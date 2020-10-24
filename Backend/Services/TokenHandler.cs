using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using Backend.Models;

namespace Backend.Services 
{
    public class TokenHandler 
    {
        public const string Issuer = "BE";
        public const string Audience = "FE";
        
        private readonly JwtKeys _jwtKeys;

        public TokenHandler(IOptions<JwtKeys> jwtKeysEntity){
            _jwtKeys = jwtKeysEntity.Value;
        }

        public string GenerateToken(ClaimsIdentity claimsIdentity, TimeSpan expiresIn) {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var privateKey = Encoding.ASCII.GetBytes(_jwtKeys.PrivateKey);

            using RSA rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKey, out _);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = DateTime.UtcNow + expiresIn,
                Issuer = Issuer,
                Audience = Audience,
                SigningCredentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateToken(string token){
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var publicKey = Encoding.ASCII.GetBytes(_jwtKeys.PublicKey);

            using RSA rsa = RSA.Create();
            rsa.ImportRSAPublicKey(publicKey, out _);
            
            try{
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = Issuer,
                    ValidAudience = Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new RsaSecurityKey(rsa)
                }, out SecurityToken validatedToken);
            }catch{
                return false;
            }
            return true;
        }
    }
}