import { Component } from '@angular/core';
import { WeatherForecast } from 'src/app/models/weather-forecast.model';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent {
  weatherForecasts: WeatherForecast[] = [];
  message = '';

  constructor(private weatherForecastService: WeatherForecastService) {}

  fetchWeatherForecast() {
    this.weatherForecastService.getWeatherForecast().subscribe(
      (forecasts: WeatherForecast[]) => {
        this.weatherForecasts = forecasts;
        // Handle the retrieved weather forecast data
      },
      (error: HttpErrorResponse) => {
        this.weatherForecasts = [];
        if (error.status === 401) {
          this.message = 'Unauthorized request';
          console.log('Unauthorized request');
          // Handle unauthorized error, e.g., show error message to the user or redirect to the login page
        } else {
          this.message = `Error retrieving weather forecast: ${error}`;
          console.log('Error retrieving weather forecast');
          console.error(error);
          // Handle other error scenarios, display a generic error message, etc.
        }
      }
    );
  }

  // fetchWeatherForecast() {
  //   this.weatherForecastService.getWeatherForecast().subscribe(
  //     (forecasts: WeatherForecast[]) => {
  //       this.weatherForecasts = forecasts;
  //       // Handle the retrieved weather forecast data
  //     },
  //     (error: any) => {
  //       console.log('Error retrieving weather forecast');
  //       console.error(error);
  //       // Handle the error
  //     }
  //   );
  // }
}
