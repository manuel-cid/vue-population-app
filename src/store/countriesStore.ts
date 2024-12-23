import { defineStore } from 'pinia';
import { fetchAllCountries } from '../services/countryService';
import type { Country, Region } from '../models';

export type RootState = {
  countries: Country[];
  regions: Region[];
  isLoading: boolean;
};

export const useCountriesStore = defineStore('store', {
  state: () =>
    ({
      countries: [],
      regions: [],
      isLoading: false,
    } as RootState),
  getters: {
    getRegions:
      (state) =>
      (minPopulation: number = 0, maxPopulation: number = Infinity) =>
        state.regions.filter(
          (region: Region) =>
            region.population >= minPopulation &&
            region.population <= maxPopulation
        ),
    getRegionCountries:
      (state) =>
      (
        region: string,
        minPopulation: number = 0,
        maxPopulation: number = Infinity
      ) => {
        return state.countries.filter(
          (country: Country) =>
            country.region === region &&
            country.population >= minPopulation &&
            country.population <= maxPopulation
        );
      },
  },
  actions: {
    async fetchCountries() {
      try {
        this.isLoading = true;
        const data = await fetchAllCountries();
        this.countries = data;
        const regions = data.reduce((acc, country) => {
          const currentRegion = country.region;
          if (!acc.has(currentRegion)) {
            acc.set(currentRegion, country.population);
          } else {
            acc.set(
              currentRegion,
              (acc.get(currentRegion) || 0) + country.population
            );
          }
          return acc;
        }, new Map<string, number>());
        this.regions = Array.from(regions).map(([name, population]) => ({
          name,
          population,
        }));
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching countries:', error);
        this.isLoading = false;
      }
    },
  },
});
