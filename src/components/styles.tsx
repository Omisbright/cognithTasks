import {StyleSheet} from 'react-native';

export const searchbarStyles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
  },
});

export const paginationStyles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    // Add styles for the input element
  },
});

export const postStyles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
