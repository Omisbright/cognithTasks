import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {postStyles} from './styles';

export interface PostProps {
  title: string;
  author: string;
  url: string;
  created_at: string;
  _tags: string[];
  objectID: string;
  item: PostProps;
  navigation: any;
  testID: string;
}

class Post extends React.Component<PostProps> {
  handlePress = () => {
    this.props.navigation.navigate('DisplayPage', {item: this.props.item});
  };

  render() {
    const {title, author, created_at, _tags, item} = this.props;
    return (
      <TouchableOpacity
        testID={`postItem-${item.objectID}`}
        onPress={this.handlePress}
        style={postStyles.container}>
        <View>
          <Text>Title: {title}</Text>
          <Text>Author: {author}</Text>
          <Text>Created At: {created_at}</Text>
          <Text>Tags: {_tags?.join(', ')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Post;
