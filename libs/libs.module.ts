import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteCitiesModule } from './autocomplete-cities/autocomplete-cities.module';
import { WeatherModule } from './weather/weather.module';
import { CountryControlModule } from './country-control/country-control.module';
import { GeoDbModule } from './geodb/geodb.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WeatherModule.forRoot({
      apiKey: 'dbf55f3cd04239ffbba88f57a553bf30',
      serviceUri: 'http://api.openweathermap.org/data/2.5/forecast',
    }),
    AutocompleteCitiesModule,
    CountryControlModule,
    GeoDbModule.forRoot({
      apiKey: '',
      serviceUri: 'http://geodb-free-service.wirefreethought.com',
    }),
  ],
  exports: [AutocompleteCitiesModule, CountryControlModule],
})
export class LibsModule {}
