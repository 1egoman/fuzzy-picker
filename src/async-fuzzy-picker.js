import React from 'react';
import PropTypes from "prop-types";

import FuzzyPicker from './fuzzy-picker';

export default class AsyncFuzzyPicker extends FuzzyPicker {
  // Since we're fetching async, fetch the new items to show.
  onInputChanged({target: {value}}) {
    return this.props.fetchItems(content).then(items => {
      if (Array.isArray(items)) {
        this.setState({items});
      } else {
        throw new Error(`Resolved data isn't an array, and react-fuzzy-picker expects an array of strings to be resolved - like ["foo", "bar", "baz"]`);
      }
    });
  }
}
AsyncFuzzyPicker.propTypes = Object.assign({}, FuzzyPicker.PropTypes, {
  fetchItems: PropTypes.func.isRequired,
});
delete AsyncFuzzyPicker.propTypes.items; // reset the value of items since that isn't needed here.
AsyncFuzzyPicker.defaultProps = Object.assign({}, FuzzyPicker.defaultProps, {
  // by default, don't show any items.
  fetchItems() {
    return Promise.resolve([]);
  }
});
