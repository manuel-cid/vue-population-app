import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import PopulationFilter from './PopulationFilter.vue';

describe('PopulationFilter.vue', () => {
  it('should render the input fields', () => {
    const { getByLabelText } = render(PopulationFilter);
    expect(getByLabelText('Min Population:')).toBeInTheDocument();
    expect(getByLabelText('Max Population:')).toBeInTheDocument();
  });

  it('should emit the filter event with correct values', async () => {
    const { getByLabelText, emitted } = render(PopulationFilter);
    const minInput = getByLabelText('Min Population:');
    const maxInput = getByLabelText('Max Population:');

    await userEvent.type(minInput, '1000');
    await userEvent.type(maxInput, '5000');

    expect(emitted().filter).toBeTruthy();
    expect(emitted().filter[emitted().filter.length - 1]).toEqual([
      { min: 1000, max: 5000 },
    ]);
  });

  it('should emit the filter event with default values when inputs are empty', async () => {
    const { getByLabelText, emitted } = render(PopulationFilter);
    const minInput = getByLabelText('Min Population:');
    const maxInput = getByLabelText('Max Population:');

    await fireEvent.update(minInput, '');
    await fireEvent.update(maxInput, '');

    expect(emitted().filter).toBeTruthy();
    expect(emitted().filter[0]).toEqual([{ min: 0, max: Infinity }]);
  });
});
