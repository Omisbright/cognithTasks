import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AppProps} from '../../navigation/types';
import {asteroidDetailsScreenStyles} from '../styles/styles';
import axios from 'axios';

type State = {
  asteroidData: {
    name: string;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    is_potentially_hazardous_asteroid: boolean;
  } | null;
  loading: boolean;
};

class AsteroidDetailsScreen extends Component<
  AppProps<'AsteroidDetailsScreen'>,
  State
> {
  constructor(props: AppProps<'AsteroidDetailsScreen'>) {
    super(props);
    this.state = {
      asteroidData: null,
      loading: false,
    };
  }

  componentDidMount() {
    const asteroidId = this.props.route.params?.asteroidId;
    this.fetchAsteroidDetails(asteroidId);
  }

  fetchAsteroidDetails(id: string | undefined) {
    this.setState({loading: true});
    const apiKey = 'eGo5f1A3A8Z6xlOZW1fbLBuVEO0vgJIdhWAQrjH8';
    const baseUrl = 'https://api.nasa.gov/neo/rest/v1/neo/';
    let asteroidUrl = '';

    if (id) {
      asteroidUrl = `${baseUrl}${id}?api_key=${apiKey}`;
      this.fetchAsteroidData(asteroidUrl);
    } else {
      const randomAsteroidUrl = `${baseUrl}browse?api_key=${apiKey}`;
      axios
        .get(randomAsteroidUrl)
        .then(response => {
          this.setState({loading: false});
          const data = response.data;
          const randomIndex = Math.floor(
            Math.random() * data.near_earth_objects.length,
          );
          const randomAsteroid = data.near_earth_objects[randomIndex];
          asteroidUrl = `${baseUrl}${randomAsteroid.id}?api_key=${apiKey}`;
          this.fetchAsteroidData(asteroidUrl);
        })
        .catch(error => {
          this.setState({loading: false});
          console.log('error', error);
        });
    }
  }

  fetchAsteroidData(asteroidUrl: string) {
    this.setState({loading: true});
    axios
      .get(asteroidUrl)
      .then(asteroidResponse => {
        this.setState({loading: false});
        const asteroidData = asteroidResponse.data;
        this.setState({asteroidData});
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('error', error);
      });
  }

  render() {
    const {asteroidData, loading} = this.state;

    if (loading) {
      return (
        <View style={asteroidDetailsScreenStyles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!asteroidData) {
      return (
        <View style={asteroidDetailsScreenStyles.container}>
          <Text>No asteroid data found</Text>
        </View>
      );
    }

    return (
      <View style={asteroidDetailsScreenStyles.container}>
        <Text>Name: {asteroidData.name}</Text>
        <Text>
          Estimated Diameter:{' '}
          {asteroidData.estimated_diameter.kilometers.estimated_diameter_min} -{' '}
          {asteroidData.estimated_diameter.kilometers.estimated_diameter_max} km
        </Text>
        <Text>
          Potentially Hazardous:{' '}
          {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
        </Text>
      </View>
    );
  }
}

export default AsteroidDetailsScreen;
