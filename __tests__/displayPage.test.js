import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import DisplayPage from '../src/screens/DisplayPage';

// Test if the component renders correctly
test('renders correctly', async () => {
  const mockProps = {
    route: {
      params: {
        item: {
          title: 'Sample Title',
          url: 'https://www. ツ',
          author: 'John Doe',
          created_at: '2023-05-29T12:34:56Z',
          created_at_i: '123456',
          num_comments: 2,
          objectID: '123',
          parent_id: '456',
          points: 5,
          story_id: '789',
          story_text: 'Sample Story Text',
          story_title: 'Sample Story Title',
          story_url: 'https://www.首页',
        },
      },
    },
  };

  const {findByText} = render(<DisplayPage {...mockProps} />);
  expect(await findByText(/Sample Title/)).toBeTruthy();
  expect(await findByText(/John Doe/)).toBeTruthy();
});

// Test if the component navigates to the display page when a post item is clicked
test('navigates to display page when a post item is clicked', async () => {
  const mockProps = {
    route: {
      params: {
        item: {
          title: 'Sample Title',
          url: 'https://www. ツ',
          author: 'John Doe',
          created_at:
            '2023-05-test-navigates-to-display-page-when-a-post-item-is-clicked',
          created_at_i: '123456',
          num_comments: 2,
          objectID: '123',
          parent_id: '456',
          points: 5,
          story_id: '789',
          story_text: 'Sample Story Text',
          story_title: 'Sample Story Title',
          story_url: 'https://www. from the navigation stack',
        },
      },
    },
  };

  const {findByText} = render(<DisplayPage {...mockProps} />);
  await fireEvent.press(await findByText(/Sample Title/));
});
