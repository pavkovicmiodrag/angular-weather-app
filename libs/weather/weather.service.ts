import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherConfig } from './model/weather-config.model';
import { WeatherResponse } from './model/weather-response.model';
import { WeatherRequest } from './model/weather-request.model';
import { WeatherSummary } from './model/weather-summary.model';
import { Weather } from 'src/app/modules/weather/weather.model.';
import { WeatherUtils } from 'src/app/modules/weather/weather-utils.class';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private fiveDayForecastEndpoint: string;

  constructor(private httpClient: HttpClient, private config: WeatherConfig) {
    this.fiveDayForecastEndpoint = config.serviceUri;
  }

  cityWeather(cityName: string): Observable<WeatherResponse<WeatherSummary>> {
    const endpoint = this.buildWeatherEndpoint();
    const params: HttpParams = WeatherService.buildRequestParams(
      {
        cityName: cityName,
      },
      this.config
    );
    this.config.apiKey;

    return this.httpClient.get<WeatherResponse<WeatherSummary>>(endpoint, {
      params: params,
    });
  }

  private static buildRequestParams(
    request: WeatherRequest,
    config: WeatherConfig
  ): HttpParams {
    const params = new HttpParams()
      .set('q', '' + request.cityName)
      .set('APPID', config.apiKey)
      .set('units', 'metric');
    return params;
  }

  private buildWeatherEndpoint(): string {
    return this.fiveDayForecastEndpoint;
  }

  getWeatherDataList(
    weatherData: WeatherSummary | null
  ): Weather[] | undefined {
    const city = weatherData?.city?.name || '';
    const weatherList = weatherData?.list
      ?.slice()
      .filter((el, index) => index % 8 === 0)
      .map((el) => {
        console.log('Element ', el);

        return new Weather(
          el.dt,
          format(el.dt * 1000, 'EEEE').toUpperCase(),
          format(el.dt * 1000, 'p'),
          el?.main?.temp,
          el?.main?.temp_min,
          el?.main?.temp_max,
          el?.main?.feels_like,
          el.weather[0].icon,
          el.weather[0].description,
          city
        );
      });

    return weatherList;
  }

  countAvarageWeekTemp = (weatherList: Weather[] | undefined): number => {
    const total = weatherList?.reduce(
      (acc, x) => (x.temperature ? acc + x.temperature : acc),
      0
    );
    if (total) {
      return WeatherUtils.round(total / 5, 1);
    }
    return 0;
  };

  getWeathercastPeriod = (weatherList: Weather[] | undefined): string => {
    let startOfWeek,
      endOfWeek: string | undefined = '';

    if (weatherList) {
      const startTime = weatherList[0]?.dt || 0;
      const endTime = weatherList[4]?.dt || 0;

      startOfWeek = format(startTime * 1000, 'PPP').toUpperCase();
      endOfWeek = format(endTime * 1000, 'PPP').toUpperCase();
    }

    return startOfWeek + ' - ' + endOfWeek;
  };
}
