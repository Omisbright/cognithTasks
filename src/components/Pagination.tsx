// import React from 'react';
// import {TouchableOpacity, Text, View} from 'react-native';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onChangePage: (page: number) => void;
// }

// export default class Pagination extends React.Component<PaginationProps> {
//   render() {
//     const {currentPage, totalPages, onChangePage} = this.props;

// const handlePreviousClick = () => {
//   if (currentPage > 0) {
//     onChangePage(currentPage - 1);
//   }
// };

// const handleNextClick = () => {
//   if (currentPage < totalPages) {
//     onChangePage(currentPage + 1);
//   }
// };

// const handleFirstClick = () => {
//   if (currentPage !== 0) {
//     onChangePage(0);
//   }
// };

// const handleLastClick = () => {
//   if (currentPage !== totalPages) {
//     onChangePage(totalPages);
//   }
// };

//     return (
//       <View>
//     <Text>{`< ${currentPage + 1}>`}</Text>
//     <TouchableOpacity onPress={handlePreviousClick}>
//       <Text>Previous</Text>
//     </TouchableOpacity>
//     <Text>{`${currentPage + 1} of ${totalPages}`}</Text>
//     <TouchableOpacity onPress={handleNextClick}>
//       <Text>Next</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={handleFirstClick}>
//       <Text>First</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={handleLastClick}>
//       <Text>Last</Text>
//     </TouchableOpacity>
//   </View>
//     );
//   }
// }
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {paginationStyles} from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default class Pagination extends React.Component<PaginationProps> {
  render() {
    const {currentPage, totalPages, onChangePage} = this.props;

    const handlePreviousClick = () => {
      if (currentPage > 0) {
        onChangePage(currentPage - 1);
      }
    };

    const handleNextClick = () => {
      if (currentPage < totalPages) {
        onChangePage(currentPage + 1);
      }
    };

    const handleFirstClick = () => {
      if (currentPage !== 0) {
        onChangePage(0);
      }
    };

    const handleLastClick = () => {
      if (currentPage !== totalPages) {
        onChangePage(totalPages);
      }
    };

    return (
      <>
        <View style={paginationStyles.container}>
          <TouchableOpacity onPress={handlePreviousClick}>
            <Text>Previous</Text>
          </TouchableOpacity>
          <Text>{`${currentPage + 1} of ${totalPages}`}</Text>
          <TouchableOpacity onPress={handleNextClick}>
            <Text>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFirstClick}>
            <Text>First</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLastClick}>
            <Text>Last</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
