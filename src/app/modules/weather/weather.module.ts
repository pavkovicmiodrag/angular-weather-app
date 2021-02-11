import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { LibsModule } from 'libs/libs.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { WeatherWidgetModule } from '../weather-widget/weather-widget.module';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    LibsModule,
    MatGridListModule,
    MatListModule,
    WeatherWidgetModule,
  ],
  exports: [WeatherComponent],
})
export class WeatherModule {}
