import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class TokenUpdateService implements HttpInterceptor {

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map(res => {
            if (res instanceof HttpResponse && res.status == 400) {
                switch (req.body["Message"]) {
                    case ErrorMessages.INVALID_AT:
                        var access_token = this.authenticationService.refreshAccessToken()["access_token"];
                        localStorage.setItem("access_token", access_token);
                        break;
                }
            }
            return res;
        }));
    }
}

export enum ErrorMessages {
    INVALID_RT = "Invalid RefreshToken",
    INVALID_AT = "Invalid AccessToken"
}