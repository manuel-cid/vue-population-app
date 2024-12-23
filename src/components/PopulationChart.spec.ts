import { render, waitFor } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import PopulationChart from './PopulationChart.vue';
import { Chart } from 'chart.js';

describe('PopulationChart.vue', () => {
  const mockData = [
    { name: 'Region 1', population: 1000 },
    { name: 'Region 2', population: 2000 },
  ];

  it('should render the chart with provided data', async () => {
    render(PopulationChart, {
      props: {
        data: mockData,
      },
    });

    await waitFor(() => {
      const chartInstance = Chart.instances[0];
      expect(chartInstance.data.labels).toEqual(['Region 1', 'Region 2']);
      expect(chartInstance.data.datasets[0].data).toEqual([1000, 2000]);
    });
  });

  it.skip('should update the chart when data changes', async () => {
    const { rerender } = render(PopulationChart, {
      props: {
        data: mockData,
      },
    });

    const newData = [
      { name: 'Region 3', population: 3000 },
      { name: 'Region 4', population: 4000 },
    ];

    await rerender({ data: newData });

    await waitFor(() => {
      const chartInstance = Chart.instances[0];
      expect(chartInstance.destroy).toHaveBeenCalled();
      expect(Chart).toHaveBeenCalledTimes(2);
      expect(chartInstance.data.labels).toEqual(['Region 3', 'Region 4']);
      expect(chartInstance.data.datasets[0].data).toEqual([3000, 4000]);
    });
  });
});
