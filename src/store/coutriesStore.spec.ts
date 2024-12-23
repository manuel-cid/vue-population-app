import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCountriesStore } from './countriesStore';

describe('Countries Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should fetch the data', async () => {
    const store = useCountriesStore();
    expect(store.isLoading).toBe(false);
    expect(store.countries.length).toBe(0);
    expect(store.regions.length).toBe(0);
    await store.fetchCountries();
    expect(store.isLoading).toBe(false);
    expect(store.countries.length).not.toBe(0);
    expect(store.regions.length).not.toBe(0);
  });
});
