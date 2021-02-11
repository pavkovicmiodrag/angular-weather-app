import { Observable, of } from 'rxjs';
import { map, switchMap, delay, take, concat, retryWhen } from 'rxjs/operators';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AutoSuggestConstants } from '../common/autosuggest-constants.class';
import { PlaceDetails } from 'libs/geodb/model/place-details.model';
import { PlaceSummary } from 'libs/geodb/model/place-summary.model';
import { GeoDbService } from 'libs/geodb/geodb.service';
import { GeoResponse } from 'libs/geodb/model/geo-response.model';
import { RestConstants } from 'libs/common/rest-constants.class';

@Component({
  selector: 'autocomplete-cities',
  templateUrl: './autocomplete-cities.component.html',
  styleUrls: ['./autocomplete-cities.component.scss'],
})
export class AutocompleteCitiesComponent implements OnInit {
  @Input() countryCode: string;
  @Output()
  selectCity: EventEmitter<PlaceDetails> = new EventEmitter<PlaceDetails>();

  private MIN_CITY_POPULATION = 40000;

  selectedCity: PlaceDetails;
  cityControl: FormControl;
  filteredCities: Observable<PlaceSummary[]>;

  constructor(private geoDbService: GeoDbService) {}

  ngOnInit() {
    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges.pipe(
      switchMap((cityNamePrefix: string) => {
        let citiesObservable: Observable<PlaceSummary[]> = of([]);

        if (
          cityNamePrefix &&
          cityNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH
        ) {
          citiesObservable = this.geoDbService
            .findPlaces({
              namePrefix: cityNamePrefix,
              countryIds: [this.countryCode],
              minPopulation: this.MIN_CITY_POPULATION,
              types: ['CITY'],
              sortDirectives: ['-population'],
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0,
            })
            .pipe(
              map(
                (response: GeoResponse<PlaceSummary[]>) => {
                  return response.data;
                },
                (error: any) => console.log(error)
              )
              // retryWhen((errors: any) =>
              //   errors.pipe(
              //     delay(1000),
              //     take(RestConstants.MAX_RETRY),
              //     concat(Observable.throw(errors))
              //   )
              // )
            );
        }

        return citiesObservable;
      })
    );
  }

  getCityDisplayName(city: PlaceSummary) {
    if (!city) {
      return '';
    }

    let name = city.name;

    if (city.region) {
      name += ', ' + city.region;
    }

    name += ', ' + city.country;

    return name;
  }

  onCitySelected(city: PlaceSummary) {
    this.geoDbService
      .findPlace({
        placeId: city.id,
      })
      .subscribe((response: GeoResponse<PlaceDetails>) => {
        this.selectedCity = response.data;
        this.selectCity.emit(this.selectedCity);
      });
  }
}
