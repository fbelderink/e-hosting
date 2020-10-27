import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    constructor(private readonly rest: RestApiService){}
}