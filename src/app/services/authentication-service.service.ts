import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private baseUrl = 'http://your-api-url/api/auth';
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  register(registerModel: any) {
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
