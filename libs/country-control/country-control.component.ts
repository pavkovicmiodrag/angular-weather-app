import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountrySummary } from 'libs/geodb/model/country-summary.model';
import { GeoDbService } from 'libs/geodb/geodb.service';
import { AutoSuggestConstants } from 'libs/common/autosuggest-constants.class';
import { GeoResponse } from 'libs/geodb/model/geo-response.model';

@Component({
  selector: 'app-country-control',
  templateUrl: './country-control.component.html',
  styleUrls: ['./country-control.component.css'],
})
export class CountryControlComponent implements OnInit {
  @Output('countryCode')
  countryCodeSubject = new BehaviorSubject<string>('');

  countryControl = new FormControl();

  filteredCountries: Observable<CountrySummary[]>;

  constructor(private geoDbService: GeoDbService) {}

  ngOnInit() {
    this.filteredCountries = this.countryControl.valueChanges.pipe(
      switchMap((namePrefix: string) => {
        let countriesObservable: Observable<CountrySummary[]> = of([]);

        if (
          namePrefix &&
          namePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH
        ) {
          countriesObservable = this.geoDbService
            .findCountries({
              namePrefix: namePrefix,
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0,
            })
            .pipe(
              map(
                (response: GeoResponse<CountrySummary[]>) => {
                  return response.data;
                },

                (error: any) => console.log(error)
              )
            );
        }

        return countriesObservable;
      })
    );
  }

  onCountrySelected(countryCode: string) {
    this.countryCodeSubject.next(countryCode);
  }
}
