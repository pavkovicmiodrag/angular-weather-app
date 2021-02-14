import { Component, OnInit, Input } from '@angular/core';
import { Weather } from './weather.model.';
import { Constants } from '../shared/constants.util';
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

  CELSIUS = Constants.CELSIUS;

  constructor() {}

  ngOnInit(): void {}
}
