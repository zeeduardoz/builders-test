import { useState, createContext, ReactNode, useEffect } from "react";

import { api } from "../services/api";

type WeatherProps = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type DataProps = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherProps[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type WeatherContextProps = {
  data: DataProps | null;
  status: string | null;

  getUpdate: () => Promise<void>;
};

type WeatherProviderProps = {
  children: ReactNode;
};

export const WeatherContext = createContext({} as WeatherContextProps);

export function WeatherProvider({ children }: WeatherProviderProps) {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    // initial fuction for get geo location and data
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus("A geolocalização não é compatível com seu navegador");
      } else {
        setStatus("Localizando...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(null);
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);

            api
              .get(
                `weather?lang=pt_br&units=metric&lat=${position.coords.longitude}&lon=${position.coords.latitude}&appid=${process.env.REACT_APP_API_KEY}`
              )
              .then((response) => {
                if (response.data) setData(response.data);
              });
          },
          () => {
            setStatus("Não foi possível recuperar sua localização");
          }
        );
      }
    };

    getLocation();
  }, []);

  // fuction for update geo data
  const getUpdate = async () => {
    setData(null);

    const response = await api.get(
      `weather?lang=pt_br&units=metric&lat=${longitude}&lon=${latitude}&appid=${process.env.REACT_APP_API_KEY}`
    );

    if (response.data) setData(response.data);
  };

  return (
    <WeatherContext.Provider value={{ data, status, getUpdate }}>
      {children}
    </WeatherContext.Provider>
  );
}
