import { Component, OnInit, Input } from '@angular/core';
import { Weather } from './weather.model.';
@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  @Input()
  avarageTemperature: number = 0;
  @Input()
  weatherDataList: Weather[] | undefined;
  @Input()
  weathercastPeriod: string;

  constructor() {}

  ngOnInit(): void {}
}
