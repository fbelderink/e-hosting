import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, finalize, map, retry, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { RestApiService } from "./rest-api.service";
import { AuthenticationResponse } from "@app/models/Authentication";

@Injectable({
    providedIn: 'root'
})

export class TokenUpdateService implements HttpInterceptor {

    private refreshAccessTokenInProgress = false;
    private refreshAccessTokenSubject = new BehaviorSubject<any>(null);

    constructor(
        private readonly authenticationService: AuthenticationService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.error.Code === 401) {
                    if (!this.refreshAccessTokenInProgress) {
                        this.refreshAccessTokenInProgress = true;

                        this.refreshAccessTokenSubject.next(null);

                        switch (error.error.Message) {
                            case ErrorMessages.INVALID_AT:
                                return this.authenticationService.refreshAccessToken().pipe(
                                    switchMap(res => {
                                        let accessToken = res["accessToken"];
                                        localStorage.setItem("accessToken", accessToken);
                                        this.refreshAccessTokenSubject.next(accessToken !== null);
                                        this.refreshAccessTokenInProgress = false;
                                        return next.handle(this.cloneRequest(req, accessToken));
                                    }),
                                    catchError((error: HttpErrorResponse) => {
                                        this.refreshAccessTokenInProgress = false;
                                        console.log("caught error", error);
                                        return throwError(error);
                                    })
                                    
                                );
                        }
                    } else {
                        return this.refreshAccessTokenSubject.pipe(
                            filter(res => res !== null),
                            take(1),
                            switchMap(() => this.authenticationService.refreshAccessToken())
                        );
                    }
                } else {
                    throwError(error);
                }
            }),
        );
        /*return next.handle(req).pipe(map(res => {
            console.log(res);
            if (res instanceof HttpResponse && res.status == 400) {
                switch (req.body["Message"]) {
                    case ErrorMessages.INVALID_AT:
                        var access_token = this.authenticationService.refreshAccessToken()["access_token"];
                        localStorage.setItem("access_token", access_token);
                        break;
                }
            }
            return res;
        }));*/
    }

    cloneRequest(req : HttpRequest<any>, token : string) : HttpRequest<any>{
        console.log("token after refresh", token);
        if(!token){
            return req;
        }

        if(!req.url.match('http://127.0.0.1:5000/api/changepw')){
            return req;
        }

        let body = req.body;
        body["AccessToken"] = token;
        return req.clone({
            body: body
        })
    }
}

export enum ErrorMessages {
    INVALID_RT = "Invalid RefreshToken",
    INVALID_AT = "Invalid AccessToken"
}