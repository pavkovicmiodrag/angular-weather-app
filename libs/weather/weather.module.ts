import { NgModule, ModuleWithProviders } from '@angular/core';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherConfig } from './model/weather-config.model';

@NgModule({
  providers: [WeatherService],
  imports: [HttpClientModule],
})
export class WeatherModule {
  static forRoot(config: WeatherConfig): ModuleWithProviders<any> {
    return {
      ngModule: WeatherModule,
      providers: [{ provide: WeatherConfig, useValue: config }],
    };
  }
}
