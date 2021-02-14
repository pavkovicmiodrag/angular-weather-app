import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LibsModule } from '../../../../libs/libs.module';
import { WeatherModule } from '../weather/weather.module';
import { SetBackgroundColorDirective } from './set-background-color.directive';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ColorPickerModule } from '../color-picker/color-picker.module';

@NgModule({
  declarations: [DashboardComponent, SetBackgroundColorDirective],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LibsModule,
    WeatherModule,
    ColorPickerModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
})
export class DashboardModule {}
