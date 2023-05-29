// import React from 'react';
// import {View, FlatList, Text} from 'react-native';
// import axios from 'axios';
// import Post, {PostProps} from '../components/Post';
// import Pagination from '../components/Pagination';
// import SearchBar from '../components/SearchBar';
// import {postListStyles} from './styles';
// import {AppProps} from '../navigation/types';

// type State = {
//   posts: PostProps[];
//   displayedPosts: PostProps[];
//   currentPage: number;
//   totalPages: number;
//   searchText: string;
//   interval: number | undefined;
//   error: string | undefined;
// };

// const SEARCH_PAGE = 0;

// export class PostList extends React.Component<AppProps<'PostList'>, State> {
//   constructor(props: AppProps<'PostList'>) {
//     super(props);
//     this.state = {
//       posts: [],
//       displayedPosts: [],
//       currentPage: SEARCH_PAGE,
//       totalPages: 0,
//       searchText: '',
//       interval: undefined,
//       error: undefined,
//     };
//   }

//   componentDidMount() {
//     this.fetchPosts(this.state.currentPage);
//     const interval = setInterval(() => {
//       this.fetchPosts(this.state.currentPage);
//     }, 10000);
//     this.setState({interval});
//   }

//   componentWillUnmount() {
//     if (this.state.interval) {
//       clearInterval(this.state.interval);
//     }
//   }

//   fetchPosts = async (page: number) => {
//     try {
//       const response = await axios.get(
//         `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
//       );
//       const {hits, nbPages} = response.data;
//       const uniqueArray = hits.filter(
//         (item: {objectID: string}, index: number, self: PostProps[]) =>
//           index ===
//           self.findIndex((t: {objectID: any}) => t.objectID === item.objectID),
//       );

//       this.setState({
//         posts: uniqueArray,
//         totalPages: nbPages,
//         currentPage: this.state.currentPage + 1,
//       });
//       this.setState({displayedPosts: uniqueArray});
//     } catch (error) {
//       console.log('Error fetching posts:', error);
//       this.setState({error: 'Failed to fetch posts'});
//     }
//   };

//   renderItem = ({item}: {item: PostProps}) => {
//     return (
//       <Post
//         title={item.title}
//         url={item.url}
//         created_at={item.created_at}
//         _tags={item._tags}
//         author={item.author}
//         objectID={item.objectID}
//         item={item}
//         navigation={this.props.navigation}
//       />
//     );
//   };

//   emptyComponent = () => {
//     return (
//       <View style={postListStyles.emptyComponentContainer}>
//         <Text style={postListStyles.emptyComponentText}>List is Empty</Text>
//       </View>
//     );
//   };

//   renderError = () => {
//     const {error} = this.state;
//     if (error) {
//       return (
//         <View style={postListStyles.errorContainer}>
//           <Text testID="error-message" style={postListStyles.errorText}>
//             {error}
//           </Text>
//         </View>
//       );
//     }
//     return null;
//   };

//   handlePageChange = (page: number) => {
//     this.setState({currentPage: page}, () => {
//       this.fetchPosts(page);
//     });
//   };

//   onChangeSearchText = (text: string) => {
//     this.setState({searchText: text});
//     const {posts} = this.state;
//     const filteredArray = posts.filter(
//       (element: {author: string; title: string}) => {
//         let searchableText = `${element.author} ${element.title}`.toLowerCase();
//         let searchText = text.toLowerCase();
//         return searchableText.includes(searchText);
//       },
//     );
//     this.setState({displayedPosts: filteredArray});
//   };

//   render() {
//     const {searchText, currentPage, totalPages, displayedPosts} = this.state;
//     return (
//       <View style={postListStyles.container}>
//         {this.renderError()}
//         <SearchBar
//           searchText={searchText}
//           onChangeSearchText={this.onChangeSearchText}
//         />
//         <FlatList
//           data={displayedPosts}
//           renderItem={this.renderItem}
//           keyExtractor={item => item.objectID}
//           ListEmptyComponent={this.emptyComponent}
//         />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onChangePage={this.handlePageChange}
//         />
//       </View>
//     );
//   }
// }

// export default PostList;

import React from 'react';
import {View, FlatList, Text} from 'react-native';
import axios from 'axios';
import Post, {PostProps} from '../components/Post';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import {postListStyles} from './styles';
import {AppProps} from '../navigation/types';

type State = {
  posts: PostProps[];
  displayedPosts: PostProps[];
  currentPage: number;
  totalPages: number;
  searchText: string;
  interval: number | undefined;
  error: string | undefined;
  loading: boolean;
};

const SEARCH_PAGE = 0;

export class PostList extends React.Component<AppProps<'PostList'>, State> {
  constructor(props: AppProps<'PostList'>) {
    super(props);
    this.state = {
      posts: [],
      displayedPosts: [],
      currentPage: SEARCH_PAGE,
      totalPages: 0,
      searchText: '',
      interval: undefined,
      error: undefined,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchPosts(this.state.currentPage);
    const interval = setInterval(() => {
      this.fetchPosts(this.state.currentPage + 1);
    }, 10000);
    this.setState({interval});
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  fetchPosts = async (page: number) => {
    this.setState({loading: true});
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
      );
      this.setState({loading: false});
      const {hits, nbPages} = response.data;
      const uniqueArray = hits.filter(
        (item: {objectID: string}, index: number, self: PostProps[]) =>
          index ===
          self.findIndex((t: {objectID: any}) => t.objectID === item.objectID),
      );

      this.setState({
        posts: uniqueArray,
        totalPages: nbPages,
        currentPage: page,
      });
      this.setState({displayedPosts: uniqueArray});
    } catch (error) {
      this.setState({loading: false});
      console.log('Error fetching posts:', error);
      this.setState({error: 'Failed to fetch posts'});
    }
  };

  renderItem = ({item, index}: {item: PostProps; index: number}) => {
    return (
      <Post
        title={item.title}
        url={item.url}
        created_at={item.created_at}
        _tags={item._tags}
        author={item.author}
        objectID={item.objectID}
        item={item}
        navigation={this.props.navigation}
        testID={`postItem.${index}`}
      />
    );
  };

  emptyComponent = () => {
    return (
      <View style={postListStyles.emptyComponentContainer}>
        <Text style={postListStyles.emptyComponentText}>List is Empty</Text>
      </View>
    );
  };

  renderError = () => {
    const {error} = this.state;
    if (error) {
      return (
        <View style={postListStyles.errorContainer}>
          <Text testID="error-message" style={postListStyles.errorText}>
            {error}
          </Text>
        </View>
      );
    }
    return null;
  };

  handlePageChange = (page: number) => {
    this.setState({currentPage: page}, () => {
      this.fetchPosts(page);
    });
  };

  onChangeSearchText = (text: string) => {
    this.setState({searchText: text});
    const {posts} = this.state;
    const filteredArray = posts.filter(
      (element: {author: string; title: string}) => {
        let searchableText = `${element.author} ${element.title}`.toLowerCase();
        let searchText = text.toLowerCase();
        return searchableText.includes(searchText);
      },
    );
    this.setState({displayedPosts: filteredArray});
  };

  render() {
    const {searchText, currentPage, totalPages, displayedPosts} = this.state;
    return (
      <View style={postListStyles.container}>
        <SearchBar
          searchText={searchText}
          onChangeSearchText={this.onChangeSearchText}
        />
        <FlatList
          data={displayedPosts}
          renderItem={this.renderItem}
          keyExtractor={item => item.objectID}
          ListEmptyComponent={!this.state.error ? this.emptyComponent : null}
          onEndReached={() => {
            if (this.state.loading) {
              return;
            }
            this.fetchPosts(this.state.currentPage + 1);
          }}
          onEndReachedThreshold={0.5}
        />
        {this.renderError()}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={this.handlePageChange}
        />
      </View>
    );
  }
}

export default PostList;
