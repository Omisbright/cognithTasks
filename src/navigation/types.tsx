import type {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  AsteroidDetailsScreen: {asteroidId: string} | undefined;
};

export type AppProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
