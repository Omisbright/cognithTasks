import {StyleSheet} from 'react-native';

export const postListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  emptyComponentContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyComponentText: {
    color: 'red',
  },
  errorContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  flatListContainer: {
    flex: 1,
  },
});

export const displayPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  text: {
    marginVertical: 3,
  },
});
