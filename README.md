# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.
Weaher application is displaying 5 days weather cast for given country/city. Weather information is retrieved from
https://openweathermap.org/api using 5 days / 3 hours forecast service https://openweathermap.org/forecast5.
User can choose country and city name (city api retrieves only cities with population greater than 40 000 people).
If user choose country, autocomplete will only suggest cities from choosen country, otherwise any city that match filter options will be suggested. It set to gives maximum 5 suggestions.
On city select it is displayed weather information for closest hour to current time, in next five days. Also avarage temperature is shown and it is used as a parameter from gradient color temperature scale to be set as a background color of page.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.
Development stack is Angular 11 (Angular material), Typescript, OpenWeatherApi and free version of GeoDb API to collect country and city informations. Firebase is used to host demo application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Git

You can find and download source code on the git repository https://github.com/pavkovicmiodrag/angular-weather-app

## Demo

Weather appplication is hosted on firebase and link for demo application is
https://codecraft-weather-app.web.app/dashboard

[![N|Solid] IMPORTANT REMARK!!!

Project is hosted on https and openweatherapi and geodb service calls are http requests. That is causing mixed content errors. To be able to use application it is needed to allow insecure content in browser. You can find more information how to enable mixed content in Chrome on this link https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=en#experiences
