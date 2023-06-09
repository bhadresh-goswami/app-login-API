import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from '../models/weather-forecast.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  private baseUrl = 'https://localhost:7240';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  getWeatherForecast(): Observable<WeatherForecast[]> {
    const url = `${this.baseUrl}/WeatherForecast`;

    // Get the authentication token from your authentication service
    const authToken = this.authService.getAccessToken();
    console.log(authToken);

    // Set the request headers with the authentication token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.get<WeatherForecast[]>(url, { headers });
  }
}
