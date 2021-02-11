import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from './weather-widget.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WeatherWidgetComponent],
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule],
  exports: [WeatherWidgetComponent],
})
export class WeatherWidgetModule {}
