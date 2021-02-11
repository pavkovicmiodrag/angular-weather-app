export class Weather {
  dt?: number;
  day?: string;
  hour?: string;
  temperature?: number;
  temp_min?: number;
  temp_max?: number;
  feels_like?: number;
  icon?: string;
  description?: string;
  city?: string;
  constructor(
    dt: number,
    day: string,
    hour: string,
    temperature: number,
    temp_min: number,
    temp_max: number,
    feels_like: number,
    icon: string,
    description: string,
    city: string
  ) {
    this.dt = dt;
    this.day = day;
    this.hour = hour;
    this.temperature = temperature;
    this.temp_min = temp_min;
    this.temp_max = temp_max;
    this.feels_like = feels_like;
    this.icon = icon;
    this.description = description;
    this.city = city;
  }
}
