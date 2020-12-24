using System.ComponentModel;
using System.Threading;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Net.Cache;
using System.Net;
using System.Net.Http;
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
using Microsoft.AspNetCore.Cors;

namespace Backend.Controllers
{
    [Route("api/")]
    [EnableCors("AllowSpecificOrigin")]
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
                        
            var opt  = new CookieOptions();
            opt.HttpOnly = true;
            opt.IsEssential = true;
            opt.SameSite = SameSiteMode.Strict;
            opt.MaxAge = TimeSpan.FromDays(60);
            Response.Cookies.Append("RefreshToken", refreshToken, opt);
            return new AuthenticationResponse
            {
                AccessToken = accessToken
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(AuthenticationRequest request){
            var (claimsAccess, claimsRefresh, authentication) = await this.authenticationService.Authenticate(request.Email, request.Password);
            
            var accessToken = this.tokenHandler.GenerateToken(claimsAccess, TimeSpan.FromMinutes(30));
            var refreshToken = this.tokenHandler.GenerateToken(claimsRefresh, TimeSpan.FromDays(60));

            var opt  = new CookieOptions();
            opt.HttpOnly = true;
            opt.IsEssential = true;
            opt.SameSite = SameSiteMode.Strict;
            opt.MaxAge = TimeSpan.FromDays(60);
            Response.Cookies.Append("RefreshToken", refreshToken, opt);
            return new AuthenticationResponse
            {
                AccessToken = accessToken
            };
        }

        [HttpPost("changepw")]
        public async Task ChangePassword(ChangePasswordRequest request) {
            string AccessToken = request.AccessToken; 
            if(!this.tokenHandler.ValidateToken(AccessToken)){
                throw new ApiException(401, "Passwort kann gerade leider nicht geändert werden");
            }
            IEnumerable<Claim> claims = this.tokenHandler.getClaims(AccessToken);
            string uid = claims.Where(c => c.Type == "Uid").FirstOrDefault().Value;
            await this.authenticationService.ChangePassword(uid ,request.OldPassword, request.NewPassword);
        }

        [HttpPost("refreshAccessToken")]
        public async Task<ActionResult<AuthenticationResponse>> GetRefreshToken() {
            string RefreshToken = Request.Cookies["RefreshToken"];

            if(String.IsNullOrEmpty(RefreshToken) || !this.tokenHandler.ValidateToken(RefreshToken)){
                throw new ApiException(401, "Invalid RefreshToken");
            }
            
            IEnumerable<Claim> claims = this.tokenHandler.getClaims(RefreshToken);
            string uid = claims.Where(c => c.Type == "Uid").FirstOrDefault().Value;
            string count = claims.Where(c => c.Type == "Count").FirstOrDefault().Value; 

            var claimsAccess = await this.authenticationService.RefreshAccessToken(uid, count);
            var accessToken = this.tokenHandler.GenerateToken(claimsAccess, TimeSpan.FromMinutes(30));

            return new AuthenticationResponse
            {
                AccessToken = accessToken
            };
        }

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
