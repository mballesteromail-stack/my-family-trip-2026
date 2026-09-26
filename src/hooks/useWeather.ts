"use client";

import { useEffect, useState } from "react";

export interface DayWeather {
  tempMax: number;
  tempMin: number;
  precipProb: number;
  code: number;
}

type WeatherMap = Record<string, DayWeather>;

const START_DATE = "2026-10-03";
const END_DATE = "2026-10-11";
// Central Park, NYC
const LAT = 40.78;
const LON = -73.97;

let cachedPromise: Promise<WeatherMap> | null = null;

function fetchWeather(): Promise<WeatherMap> {
  if (!cachedPromise) {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode` +
      `&timezone=America%2FNew_York` +
      `&start_date=${START_DATE}&end_date=${END_DATE}`;

    cachedPromise = fetch(url)
      .then((r) => r.json())
      .then((json) => {
        const map: WeatherMap = {};
        const days: string[] = json?.daily?.time ?? [];
        days.forEach((date: string, i: number) => {
          map[date] = {
            tempMax: json.daily.temperature_2m_max[i],
            tempMin: json.daily.temperature_2m_min[i],
            precipProb: json.daily.precipitation_probability_max[i],
            code: json.daily.weathercode[i],
          };
        })
        return map;
      })
      .catch(() => ({}));
  }
  return cachedPromise;
}

export function useWeather() {
  const [data, setData] = useState<WeatherMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchWeather().then((map) => {
      if (!cancelled) {
        setData(map);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}

export function weatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code === 1) return "🌤️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "🌨️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌡️";
}
