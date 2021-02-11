import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryControlComponent } from './country-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { COUNTRIES_DB } from 'libs/common/i18n/en';

@NgModule({
  declarations: [CountryControlComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CountryControlComponent],
})
export class CountryControlModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerCountries();
  }

  registerCountries() {
    for (const country of COUNTRIES_DB) {
      const countryAlpha2Code = country.alpha2Code.toLowerCase();

      try {
        this.iconRegistry.addSvgIcon(
          countryAlpha2Code,
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `/src/assets/svg-country-flags/svg/${countryAlpha2Code}.svg`
          )
        );
      } catch (err) {
        console.error('Error: icon not found for ' + countryAlpha2Code, err);
      }
    }
  }
}
