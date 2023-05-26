import React, {Component} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {AppProps} from '../../navigation/types';
import {homeScreenStyles} from '../styles/styles';

type State = {
  asteroidId: string;
};
class HomeScreen extends Component<AppProps<'HomeScreen'>, State> {
  constructor(props: AppProps<'HomeScreen'>) {
    super(props);
    this.state = {
      asteroidId: '',
    };
  }

  handleSubmit = () => {
    const {asteroidId} = this.state;
    if (!asteroidId) {
      Alert.alert(
        'Error',
        'Please enter an asteroid ID',
        [{text: 'OK', onPress: () => console.log('OK pressed')}],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('AsteroidDetailsScreen', {
        asteroidId: this.state.asteroidId,
      });
    }
  };

  render() {
    return (
      <View style={homeScreenStyles.container}>
        <Text style={homeScreenStyles.text}>Enter Asteroid ID:</Text>
        <TextInput
          testID="textInput"
          style={homeScreenStyles.textInput}
          onChangeText={text => this.setState({asteroidId: text})}
          value={this.state.asteroidId}
        />
        <Button
          testID="submitButton"
          title="Submit"
          onPress={() => this.handleSubmit()}
        />
        <Button
          testID="randomAsteroidNavigateButton"
          title="Random Asteroid"
          onPress={() =>
            this.props.navigation.navigate('AsteroidDetailsScreen')
          }
        />
      </View>
    );
  }
}

export default HomeScreen;
