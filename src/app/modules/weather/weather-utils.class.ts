export class WeatherUtils {
  // Util method to round number to given decimal precision
  static round(value: number, precision: number): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  // Util method to convert temeprature from Kelvin to Celsius.
  static kelvinToCelsius(temperature: number) {
    if (temperature) {
      return Math.round(temperature - 273.15);
    }
    return null;
  }
}
