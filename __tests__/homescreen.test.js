import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/ui/screens/HomeScreen';
import {Alert} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should update state when text input changes', () => {
  const {getByTestId} = render(<HomeScreen />);
  const textInput = getByTestId('textInput');
  fireEvent.changeText(textInput, '12345');
  expect(textInput.props.value).toEqual('12345');
});

it('should navigate to AsteroidDetailsScreen when submit button is pressed', () => {
  const navigation = {navigate: jest.fn()};
  const {getByTestId} = render(<HomeScreen navigation={navigation} />);
  const textInput = getByTestId('textInput');
  const submitButton = getByTestId('submitButton');
  fireEvent.changeText(textInput, '12345');
  fireEvent.press(submitButton);
  expect(navigation.navigate).toHaveBeenCalledWith('AsteroidDetailsScreen', {
    asteroidId: '12345',
  });
});

it('should show an alert when submit button is pressed and asteroidId is empty', () => {
  const {getByTestId} = render(<HomeScreen />);
  const submitButton = getByTestId('submitButton');

  // Mock the Alert.alert function
  const alertMock = jest
    .spyOn(Alert, 'alert')
    .mockImplementation((title, message, buttons, options) => {
      expect(title).toBe('Error');
      expect(message).toBe('Please enter an asteroid ID');
      expect(buttons).toEqual([{text: 'OK', onPress: expect.any(Function)}]);
      expect(options).toEqual({cancelable: false});
    });

  fireEvent.press(submitButton);

  // Verify that the Alert.alert function was called
  expect(alertMock).toHaveBeenCalledTimes(1);

  // Restore the original Alert.alert function
  alertMock.mockRestore();
});

it('should navigate to AsteroidDetailsScreen when Random Asteroid button is pressed', () => {
  const navigation = {navigate: jest.fn()};
  const {getByTestId} = render(<HomeScreen navigation={navigation} />);

  const submitButton = getByTestId('randomAsteroidNavigateButton');
  fireEvent.press(submitButton);
  expect(navigation.navigate).toHaveBeenCalledWith('AsteroidDetailsScreen');
});
