import { CurrentWeather } from "./types/CurrentWeather"
import { HourlyWeather } from "./types/HourlyWeather"

export const getCurrentWeather = async (lat: number, long: number): Promise<CurrentWeather> => {
    const API_KEY = `${import.meta.env.VITE_API_KEY}`
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

    const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)

    if (!response.ok)
        throw new Error('Something went wrong.')

    return response.json()
}

export const getWeatherByCity = async (city: string): Promise<CurrentWeather> => {
    const API_KEY = `${import.meta.env.VITE_API_KEY}`
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

    const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)

    if (!response.ok)
        throw new Error('Something went wrong.')

    return response.json()
}

export const getHourlyWeather = async (lat: number, long: number): Promise<HourlyWeather> => {
    const API_KEY = `${import.meta.env.VITE_API_KEY}`
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

    const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)

    if (!response.ok)
        throw new Error('Something went wrong.')

    return response.json()
}

export const getHourlyWeatherByCity = async (city: string): Promise<HourlyWeather> => {
    console.log('hourly weather')
    const API_KEY = `${import.meta.env.VITE_API_KEY}`
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

    const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`)

    if (!response.ok)
        throw new Error('Something went wrong.')

    return response.json()
}