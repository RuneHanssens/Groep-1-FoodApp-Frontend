import PropTypes from ‘prop-types’;
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Category extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }
}
export default Category;
