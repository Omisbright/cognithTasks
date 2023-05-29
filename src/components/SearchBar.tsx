import React from 'react';
import {View, TextInput} from 'react-native';
import {searchbarStyles} from './styles';

interface SearchBarProps {
  onChangeSearchText: (text: string) => void;
  searchText: string;
}

export default class SearchBar extends React.Component<SearchBarProps> {
  render() {
    return (
      <View>
        <TextInput
          value={this.props.searchText}
          style={searchbarStyles.textInput}
          placeholder="Search posts..."
          onChangeText={text => this.props.onChangeSearchText(text)}
        />
      </View>
    );
  }
}
