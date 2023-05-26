import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import AsteroidDetailsScreen from '../src/ui/screens/AsteroidDetailsScreen';
import axios from 'axios';
import renderer from 'react-test-renderer';

jest.mock('axios');

describe('AsteroidDetailsScreen', () => {
  const asteroidData = {
    name: 'Test Asteroid',
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 1,
        estimated_diameter_max: 2,
      },
    },
    is_potentially_hazardous_asteroid: true,
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  it('renders correctly', async () => {
    const mockResponse = {
      data: {
        url: '2000405',
      },
    };

    axios.get.mockResolvedValue(mockResponse);
    const tree = renderer
      .create(<AsteroidDetailsScreen route={{params: {asteroidId: '123'}}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render asteroid details when mounted with asteroidId', async () => {
    axios.get.mockResolvedValueOnce({data: asteroidData});

    const {getByText} = render(
      <AsteroidDetailsScreen route={{params: {asteroidId: '123'}}} />,
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText(`Name: ${asteroidData.name}`)).toBeTruthy();
    expect(
      getByText(
        `Estimated Diameter: ${asteroidData.estimated_diameter.kilometers.estimated_diameter_min} - ${asteroidData.estimated_diameter.kilometers.estimated_diameter_max} km`,
      ),
    ).toBeTruthy();
    expect(
      getByText(
        `Potentially Hazardous: ${
          asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'
        }`,
      ),
    ).toBeTruthy();
  });

  it('should render asteroid details when mounted without asteroidId', async () => {
    const route = {
      params: {asteroidId: undefined}, // Provide the necessary params here
    };

    const randomAsteroid = {
      id: '456',
    };

    axios.get
      .mockResolvedValueOnce({data: {near_earth_objects: [randomAsteroid]}})
      .mockResolvedValueOnce({data: asteroidData});

    const {getByText} = render(<AsteroidDetailsScreen route={route} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    expect(getByText(`Name: ${asteroidData.name}`)).toBeTruthy();
    expect(
      getByText(
        `Estimated Diameter: ${asteroidData.estimated_diameter.kilometers.estimated_diameter_min} - ${asteroidData.estimated_diameter.kilometers.estimated_diameter_max} km`,
      ),
    ).toBeTruthy();
    expect(
      getByText(
        `Potentially Hazardous: ${
          asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'
        }`,
      ),
    ).toBeTruthy();
  });

  it('should render error message when API call fails', async () => {
    const route = {
      params: {asteroidId: undefined}, // Provide the necessary params here
    };

    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const {getByText} = render(<AsteroidDetailsScreen route={route} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText('No asteroid data found')).toBeTruthy();
  });
});
