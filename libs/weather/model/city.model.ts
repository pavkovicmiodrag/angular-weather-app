export class City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

class Coord {
  latitude: string;
  longitude: string;
}
