export class Weather {
  dt: number;
  main: MainProps;
  weather: WeatherProps[];
  cloudds: CloudsProps;
  wind: WindProps;
  visibility: number;
  pop: number;
  rain: RainProps;
  sys: SysProps;
  dt_txt: string;
}

class MainProps {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

class WeatherProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}

class CloudsProps {
  all: number;
}

class WindProps {
  speed: number;
  deg: number;
}

class RainProps {
  ['3h']: number;
}

class SysProps {
  pod: string;
}
