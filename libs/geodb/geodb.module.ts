import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { GeoDbService } from './geodb.service';
import { GeoDbConfig } from './model/geodb-config.model';

@NgModule({
  providers: [GeoDbService],
  imports: [HttpClientModule],
})
export class GeoDbModule {
  static forRoot(config: GeoDbConfig): ModuleWithProviders<any> {
    return {
      ngModule: GeoDbModule,
      providers: [{ provide: GeoDbConfig, useValue: config }],
    };
  }

  constructor(config: GeoDbConfig) {}
}
