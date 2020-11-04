import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest, AuthenticationResponse, ChangePasswordRequest } from '../models/Authentication';
import { RestApiService } from './rest-api.service';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    constructor(private readonly rest: RestApiService){}

    public signup(req : AuthenticationRequest) : Observable<AuthenticationResponse> {
        return this.rest.post<AuthenticationResponse>("/signup", req);
    }

    public login(req : AuthenticationRequest) : Observable<AuthenticationResponse> {
        return this.rest.post<AuthenticationResponse>("/login", req)
    }

    public changePassword(req : ChangePasswordRequest){
        this.rest.post("/changepw", req)
    } 
}