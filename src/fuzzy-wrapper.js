import React from 'react';
import PropTypes from "prop-types";

export default class FuzzyWrapper extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
    };

    // create a bound function to invoke when keys are pressed on the body.
    this.keyEvent = (function(event) {
      if (this.props.isKeyPressed(event)) {
        event.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
      }
    }).bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.keyEvent);
  }
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.keyEvent);
  }

  // Called by the containing fuzzysearcher to close itself.
  onClose() {
    this.setState({isOpen: false});
  }
  render() {
    return this.props.popup(
      this.state.isOpen,
      this.onClose.bind(this),
    );
  }
}
FuzzyWrapper.propTypes = {
  isKeyPressed: PropTypes.func.isRequired,
  popup: PropTypes.func.isRequired,
};
FuzzyWrapper.defaultProps = {
  isKeyPressed: () => false,
  popup: () => null,
};
