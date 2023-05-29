import type {StackScreenProps} from '@react-navigation/stack';

interface StoryData {
  item: {
    _highlightResult: {
      author: string[];
      title: string[];
      url: string[];
    };
    _tags: string[];
    author: string;
    comment_text: string | null;
    created_at: string;
    created_at_i: number;
    num_comments: number;
    objectID: string;
    parent_id: string | null;
    points: number;
    story_id: string | null;
    story_text: string | null;
    story_title: string | null;
    story_url: string | null;
    title: string;
    url: string;
  };
}

export type RootStackParamList = {
  PostList: undefined;
  DisplayPage: StoryData;
};

export type AppProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
