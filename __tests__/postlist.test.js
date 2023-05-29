import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import PostListComponent from '../src/screens/PostList';
import {PostList} from '../src/screens/PostList';
import {Text} from 'react-native';

// Mock the axios.get method to return mock data
jest.mock('axios');

axios.get = jest.fn(() =>
  Promise.resolve({
    data: {
      hits: [
        {objectID: '1', title: 'Post 1'},
        {objectID: '2', title: 'Post 2'},
      ],
      nbPages: 2,
    },
  }),
);

describe('PostListComponent', () => {
  const initialProps = {
    navigation: {
      resetNavigation: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders without crashing
  it('renders without crashing', () => {
    const {getByPlaceholderText} = render(
      <PostListComponent {...initialProps} />,
    );
    expect(getByPlaceholderText('Search posts...')).toBeTruthy();
  });

  // Test 2: Renders correctly
  it('renders correctly', () => {
    const tree = render(<PostListComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test 3: Fetches posts when mounted
  it('fetches posts when mounted', async () => {
    render(<PostListComponent {...initialProps} />);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
    );
  });

  // Test 4: Updates displayed posts when search text changes
  it('updates displayed posts when search text changes', () => {
    const {getByPlaceholderText} = render(
      <PostListComponent {...initialProps} />,
    );
    const searchInput = getByPlaceholderText('Search posts...');
    fireEvent.changeText(searchInput, 'Example Post 3');
    expect(searchInput.props.value).toEqual('Example Post 3');
  });

  // Test 5: Updates displayed posts when page changes
  it('updates displayed posts when page changes', () => {
    const {getByText} = render(<PostListComponent {...initialProps} />);
    fireEvent.press(getByText('Next'));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
    );
  });

  // Test 6: Handles empty search text
  it('handles empty search text', () => {
    const {getByPlaceholderText, UNSAFE_getAllByType} = render(
      <PostList {...initialProps} />,
    );
    const searchInput = getByPlaceholderText('Search posts...');

    const initialDisplayedPosts = UNSAFE_getAllByType(Text);
    const initialPostTitles = initialDisplayedPosts.map(
      textComponent => textComponent.props.children,
    );

    fireEvent.changeText(searchInput, '');

    const updatedDisplayedPosts = UNSAFE_getAllByType(Text);
    const updatedPostTitles = updatedDisplayedPosts.map(
      textComponent => textComponent.props.children,
    );

    expect(updatedPostTitles).toEqual(initialPostTitles);
  });

  // Test 7: Handles errors when fetching posts
  it('handles errors when fetching posts', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch posts'));
    const {getByTestId} = render(<PostList />);
    await waitFor(() => getByTestId('error-message'));
    expect(getByTestId('error-message').props.children).toEqual(
      'Failed to fetch posts',
    );
  });

  // Test 8: Handles pagination correctly
  it('handles pagination correctly', () => {
    const {getByText} = render(<PostListComponent {...initialProps} />);
    getByText('Next');
    getByText('First');
    getByText('Last');
  });

  // Test 9: Fetches posts when pagination page is changed
  it('fetches posts when pagination page is changed', async () => {
    const response = {
      data: {
        hits: [
          {objectID: '1', title: 'Post 1'},
          {objectID: '2', title: 'Post 2'},
        ],
        nbPages: 3,
      },
    };
    axios.get.mockResolvedValueOnce(response);

    const {getByText} = render(<PostList {...initialProps} />);

    await waitFor(() => expect(getByText('Next')).toBeTruthy());

    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Previous'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(3);
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(
        1,
        'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
      );
      expect(axios.get).toHaveBeenNthCalledWith(
        2,
        'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1',
      );
      expect(axios.get).toHaveBeenNthCalledWith(
        3,
        'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
      );
    });
  });
});
