import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from 'libs/weather/weather.service';
import { PlaceSummary } from 'libs/geodb/model/place-summary.model';
import { WeatherSummary } from 'libs/weather/model/weather-summary.model';
import { Observable, of } from 'rxjs';
import { SetBackgroundColorDirective } from './set-background-color.directive';
import { Weather } from '../weather/weather.model.';
import { AutoUnsub } from 'libs/common/auto-unsubscribe.class';
import { CountryControlComponent } from 'libs/country-control/country-control.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { Constants } from '../shared/constants.util';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
@AutoUnsub()
export class DashboardComponent implements OnInit {
  weatherData: WeatherSummary;
  weatherDatalist: Weather[] | undefined;
  avarageTemperature: number;
  weathercastPeriod: string;
  @ViewChild(SetBackgroundColorDirective)
  appHighlight: SetBackgroundColorDirective;
  @ViewChild(ColorPickerComponent)
  colorPicker: ColorPickerComponent;
  @ViewChild('countryControl')
  countryControlComponent: CountryControlComponent;

  countryCode: string;

  TEMP_MIN: number = Constants.TEMP_MIN;
  TEMP_MAX: number = Constants.TEMP_MAX;
  Y_POSITION: number = Constants.Y_POSITION;

  WIDTH: number = Constants.WIDTH;
  CELSIUS = Constants.CELSIUS;

  weatherObservable: Observable<WeatherSummary> = of();
  backgroundColor1: string;
  backgroundColor2: string;
  colorValue: number;
  temperature: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  setBackgroundColor(temperature: number) {
    // gradientFactor represent width for 1 Celsius on color picker.
    const gradientFactor = this.WIDTH / (this.TEMP_MAX - this.TEMP_MIN);
    // X_POS position is equal to temperature + absolute value of min temperature,
    // since min temperature starts at 0.
    const X_POS = temperature + Math.abs(this.TEMP_MIN);
    this.temperature = temperature;
    this.colorValue = ((X_POS * gradientFactor) / this.WIDTH) * 100;
    // Starting stop color for linear-gradient
    this.backgroundColor1 = this.colorPicker.getColorAtPosition(
      X_POS * gradientFactor,
      this.Y_POSITION
    );
    // Ending stop color for linear-gradient, take the next color from color picker
    this.backgroundColor2 = this.colorPicker.getColorAtPosition(
      X_POS * (gradientFactor + 1),
      this.Y_POSITION
    );
    this.updateBackground(this.backgroundColor1, this.backgroundColor2);
  }

  private updateBackground(backgroundColor1: string, backgroundColor2: string) {
    this.appHighlight.highlight(backgroundColor1, backgroundColor2);
  }

  onCountryCodeSelected(countryCode: string) {
    this.countryCode = countryCode;
  }

  getWeatherData(place: PlaceSummary) {
    this.weatherService.cityWeather(place.city).subscribe((response: any) => {
      this.weatherData = response;
      this.weatherDatalist = this.weatherService.getWeatherDataList(response);
      this.weathercastPeriod = this.weatherService.getWeathercastPeriod(
        this.weatherDatalist
      );
      this.avarageTemperature = this.weatherService.countAvarageWeekTemp(
        this.weatherDatalist
      );
      this.setBackgroundColor(this.avarageTemperature);
    });
  }
}
