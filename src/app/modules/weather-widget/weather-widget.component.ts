import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../weather/weather.model.';

@Component({
  selector: 'weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() item: Weather;

  constructor() {
    console.log('WeatherWidgetComponent');
  }

  ngOnInit(): void {}
}
