import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationRequest, AuthenticationResponse, ChangePasswordRequest } from '../models/Authentication';
import { ActionRequest, ActionSuccessResponse } from "../models/Model";
import { RestApiService } from './rest-api.service';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {

    public isLoggedIn = false;

    constructor(private readonly rest: RestApiService) { }

    public signup(req: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.rest.post<AuthenticationResponse>("/signup", req).pipe(
            map(res => {
                this.isLoggedIn = true;
                return res;
            })
        );
    }

    public login(req: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.rest.post<AuthenticationResponse>("/login", req).pipe(
            map(res => {
                console.log("logged in");
                this.isLoggedIn = true;
                return res;
            })
        )
    }

    public verifySession() : Observable<AuthenticationResponse> {
        return this.rest.get<AuthenticationResponse>("/verifySession").pipe(
            map(res => {
                console.log("logged in");
                this.isLoggedIn = true;
                return res;
            })
        );
    }

    public refreshAccessToken(): Observable<any> {
        return this.rest.get<AuthenticationResponse>("/refreshAccessToken");
    }

    public changePassword(req: ChangePasswordRequest): Observable<unknown> {
        return this.rest.post("/changepw", req);
    }

    public logout(req: ActionRequest): Observable<ActionSuccessResponse> {
        return this.rest.post<ActionSuccessResponse>("/logout", req).pipe(
            map(res => {
                if (res.success) {
                    this.isLoggedIn = false;
                }
                return res
            })
        );
    }
}