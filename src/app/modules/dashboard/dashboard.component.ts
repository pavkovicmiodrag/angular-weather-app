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

@Component({
  selector: 'app-dashboard',
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
  // Color picker is 1000px and temperature scale goes from  -50 to 50 Celsius degree.
  // 1 Celsius is presented with 10px on color picker pallete (1000px/100 Celsius min max temperature difference).
  GRADIENT_FACTOR: number = 10;
  // TEMP_MIN Use to count X position starting from 0px.
  // Since temperature start wit -50 Celsius degree to count position
  // for given temperature we should use next formula:
  // (temperature + minimal temperature) * GRADIENT_FACTOR
  TEMP_MIN: number = 50;
  // center height from 50px height
  Y_POSITION: number = 25;

  weatherObservable: Observable<WeatherSummary> = of();
  backgroundColor1: string;
  backgroundColor2: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  setBackgroundColor(temperature: number) {
    // Starting color for  linear-gradient
    this.backgroundColor1 = this.colorPicker.getColorAtPosition(
      (temperature + this.TEMP_MIN) * this.GRADIENT_FACTOR,
      this.Y_POSITION
    );
    // Ending  color for linear-gradient
    this.backgroundColor2 = this.colorPicker.getColorAtPosition(
      (temperature + this.TEMP_MIN) * (this.GRADIENT_FACTOR + 1),
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
