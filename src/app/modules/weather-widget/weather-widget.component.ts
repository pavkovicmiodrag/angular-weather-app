import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../weather/weather.model.';
import { Constants } from '../shared/constants.util';

/**
 * WeatherWidgetComponent widget with weather information to be displayed as a single unit.
 */
@Component({
  selector: 'weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() item: Weather;
  CELSIUS = Constants.CELSIUS;

  constructor() {}

  ngOnInit(): void {}
}
