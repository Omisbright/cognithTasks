import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {AppProps} from '../navigation/types';
import {displayPageStyles} from './styles';

export default class DisplayPage extends Component<AppProps<'DisplayPage'>> {
  constructor(props: AppProps<'DisplayPage'>) {
    super(props);
  }
  render() {
    const item = this.props?.route?.params?.item;
    return (
      <View style={displayPageStyles.container}>
        <Text style={displayPageStyles.text}>Title: {item.title}</Text>
        <Text style={displayPageStyles.text}>URL: {item.url}</Text>
        <Text style={displayPageStyles.text}>Author: {item.author}</Text>
        <Text style={displayPageStyles.text}>
          Created At: {item.created_at}
        </Text>
        <Text style={displayPageStyles.text}>
          Created At (i): {item.created_at_i}
        </Text>
        <Text style={displayPageStyles.text}>
          Number of Comments: {item.num_comments}
        </Text>
        <Text style={displayPageStyles.text}>Object ID: {item.objectID}</Text>
        <Text style={displayPageStyles.text}>Parent ID: {item.parent_id}</Text>
        <Text style={displayPageStyles.text}>Points: {item.points}</Text>
        <Text style={displayPageStyles.text}>Story ID: {item.story_id}</Text>
        <Text style={displayPageStyles.text}>
          Story Text: {item.story_text}
        </Text>
        <Text style={displayPageStyles.text}>
          Story Title: {item.story_title}
        </Text>
        <Text style={displayPageStyles.text}>Story URL: {item.story_url}</Text>
      </View>
    );
  }
}
