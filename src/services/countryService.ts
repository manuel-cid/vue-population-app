import axios from 'axios';
import type { Country } from '../models';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/all?fields=name,region,population'
  );
  return response.data.map((country: any) => ({
    name: country.name.common,
    population: country.population,
    region: country.region,
  }));
};
