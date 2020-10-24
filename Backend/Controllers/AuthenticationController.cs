using System.Diagnostics;
using System.Security.Claims;
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService authenticationService;

        private readonly TokenHandler tokenHandler;

        public AuthenticationController(AuthenticationService authenticationService, TokenHandler tokenHandler)
        {
            this.authenticationService = authenticationService;
            this.tokenHandler = tokenHandler;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<AuthenticationResponse>> Signup(AuthenticationRequest request)
        {
            var (claimsAccess, claimsRefresh) = await this.authenticationService.CreateAuthentication(request.Email, request.Password, RoleType.User);
            
            var accessToken = this.tokenHandler.GenerateToken(claimsAccess, TimeSpan.FromMinutes(30));
            var refreshToken = this.tokenHandler.GenerateToken(claimsRefresh, TimeSpan.FromDays(60));
            
            return new AuthenticationResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Role = RoleType.User
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(AuthenticationRequest request){
            var (claimsAccess, claimsRefresh, authentication) = await this.authenticationService.Authenticate(request.Email, request.Password);
            
            var accessToken = this.tokenHandler.GenerateToken(claimsAccess, TimeSpan.FromMinutes(30));
            var refreshToken = this.tokenHandler.GenerateToken(claimsRefresh, TimeSpan.FromDays(60));

            return new AuthenticationResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Role = authentication.Role
            };
        }

        // DELETE: api/authentication/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Authentication>> DeleteAuthentication(Guid id)
        {
            var authentication = await authenticationService.Authentications.FindAsync(id);
            if (authentication == null)
            {
                return NotFound();
            }

            authenticationService.Authentications.Remove(authentication);
            await authenticationService.SaveChangesAsync();

            return authentication;
        }

        private bool AuthenticationExists(Guid id)
        {
            return authenticationService.Authentications.Any(e => e.Uid == id);
        }
    }
}
