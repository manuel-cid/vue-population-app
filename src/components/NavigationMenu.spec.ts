import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import NavigationMenu from './NavigationMenu.vue';
import router from '../router';

describe('# NavigationMenu', () => {
  it('should render the navigation menu', () => {
    const { getAllByTestId } = render(NavigationMenu, {
      global: {
        plugins: [router],
      },
    });

    const linkNames = [
      'All',
      'Africa',
      'Americas',
      'Antarctic',
      'Asia',
      'Europe',
      'Oceania',
    ];

    const links = getAllByTestId('nav-link');
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveTextContent(linkNames[i]);
    }
  });
});
