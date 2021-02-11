import { WeatherError } from './weather-error.model';

export class WeatherResponse<T> {
  errors: WeatherError[] = new Array<WeatherError>();
  data: T;
  metadata: any;

  static buildForData(data: any, metadata: any): WeatherResponse<any> {
    const response: WeatherResponse<any> = new WeatherResponse<any>();

    response.data = data;
    response.metadata = metadata;

    return response;
  }

  static buildForError(error: WeatherError): WeatherResponse<any> {
    const response: WeatherResponse<any> = new WeatherResponse<any>();

    response.errors.push(error);

    return response;
  }

  static buildForErrors(errors: WeatherError[]): WeatherResponse<any> {
    const response: WeatherResponse<any> = new WeatherResponse<any>();

    for (const error of errors) {
      response.errors.push(error);
    }

    return response;
  }
}
