import {axiosInstance} from '../config/axios';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getForecast = async () => {
  const {data} = await axiosInstance.get(`/forecast.json?key=${apiKey}&q=Hanoi&lang=vi`);
  return data;
};