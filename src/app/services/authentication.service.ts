import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'https://localhost:7240/api/Auth';
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  register(registerModel: any) {
    console.log(`${this.baseUrl}/register`);

    return this.http.post(`${this.baseUrl}/register`, registerModel);
  }

  login(loginModel: any) {
    return this.http.post(`${this.baseUrl}/login`, loginModel).pipe(
      tap((response: any) => {
        const token = response.token;
        this.storeAccessToken(token);
      })
    );
  }

  private storeAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  removeAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }
}
