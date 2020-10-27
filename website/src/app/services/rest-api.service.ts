import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})

export class RestApiService {
    constructor(private readonly httpClient : HttpClient){}

    public get<T>(endpoint : string): Observable<T>{
        return this.httpClient.get<T>(environment.apiUrl + endpoint).pipe();
    }

    public post<T>(endpoint : string, body : any): Observable<T>{
        return this.httpClient.post<T>(environment.apiUrl + endpoint, body).pipe();
    }

    public delete<T>(endpoint: string): Observable<T>{
        return this.httpClient.delete<T>(environment.apiUrl + endpoint).pipe()
    }
}