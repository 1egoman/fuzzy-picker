import React from 'react';
import PropTypes from "prop-types"
import classnames from 'classnames';
import fuzzysearch from 'fuzzysearch';

export default class FuzzyPicker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedIndex: 0, // which item is selected?
      items: this.getInitialItems(), // the items wich are displayed in the fuzzy find list
    };
  }

  // Move the selected index up or down.
  onMoveUp() {
    if (this.state.selectedIndex > 0) {
      this.selectIndex(--this.state.selectedIndex);

    // User is at the start of the list. Should we cycle back to the end again?
    } else if (this.props.cycleAtEndsOfList) {
      this.selectIndex(this.state.items.length-1);
    }
  }
  onMoveDown() {
    let itemsLength = this.state.items.length - 1;
    if (this.state.selectedIndex < itemsLength) {
      this.selectIndex(++this.state.selectedIndex);

    // User is at the end of the list. Should we cycle back to the start again?
    } else if (this.props.cycleAtEndsOfList) {
      this.selectIndex(0);
    }
  }

  // handle key events in the textbox
  onKeyDown(event) {
    switch (event.key) {
      // Moving up and down
      // Either arrow keys, tab/shift+tab, or ctrl+j/ctrl+k (what's used in vim sometimes)
      case 'ArrowUp': {
        this.onMoveUp();
        event.preventDefault();
        break;
      }
      case 'ArrowDown': {
        this.onMoveDown();
        event.preventDefault();
        break;
      }
      case 'j': {
        if (event.ctrlKey) {
          this.onMoveDown();
        }
        break;
      }
      case 'k': {
        if (event.ctrlKey) {
          this.onMoveUp();
        }
        break;
      }
      case 'Tab': {
        if (event.shiftKey) {
          this.onMoveUp();
        } else {
          this.onMoveDown();
        }
        event.preventDefault();
        break;
      }

      case 'Enter': { // Enter key
        let item = this.state.items[this.state.selectedIndex];
        if (item) {
          this.setState({items: this.getInitialItems()});
          this.props.onChange(item);
        }
        break;
      }
      case 'Escape': {
        this.setState({items: this.getInitialItems()});
        this.props.onClose();
      }
    }
  }

  getInitialItems() {
    return [];
  }

  // When the user types into the textbox, this handler is called.
  // Though the textbox is an uncontrolled input, this is needed to regenerate the
  // list of choices under the textbox.
  onInputChanged({target: {value}}) {
    if (value.length) {
      // Pick the closest matching items if possible.
      let items = this.props.items.filter(item => fuzzysearch(
        value.toLowerCase(),
        this.props.itemValue(item).toLowerCase()
      ));
      this.setState({items: items.slice(0, this.props.displayCount), selectedIndex: 0});
    } else {
      // initially, show an empty picker.
      this.setState({items: this.getInitialItems(), selectedIndex: 0});
    }
  }

  // Highlight the given item
  selectIndex(ct) {
    this.props.onChangeHighlightedItem(this.state.items[ct]); // fire a callback
    this.setState({selectedIndex: ct}); // update the state for real
  }

  onClickOnBg(event) {
    if (event.target.className === 'fuzzy-switcher-background') {
      this.props.onClose();
    }
  }

  render() {
    if (this.props.isOpen) {
      return <div className="fuzzy-picker-background" onClick={this.onClickOnBg.bind(this)}>
        <div className="fuzzy-picker">
          <span className="fuzzy-picker-top-text">
            <span className="fuzzy-picker-label">
              {this.props.label}
            </span>
            <span className="fuzzy-picker-instructions">
              <span><strong>tab</strong> or <strong>↑↓</strong> to navigate</span>
              <span><strong>enter</strong> to select</span>
              <span><strong>esc</strong> to dismiss</span>
            </span>
          </span>

          <input
            type="text"
            className="fuzzy-input"
            autoFocus
            onKeyDown={this.onKeyDown.bind(this)}
            onChange={this.onInputChanged.bind(this)}
          />
          <ul className="fuzzy-items">
            {this.state.items.map((item, ct) => {
              // render each item
              return <li
                key={this.props.itemValue(item)}
                className={classnames({
                  selected: ct === this.state.selectedIndex,
                })}
                onMouseOver={this.selectIndex.bind(this, ct)}
                onClick={this.props.onChange.bind(this, this.state.items[ct])}
              >{this.props.renderItem(item)}</li>;
            })}
          </ul>
        </div>
      </div>;
    } else {
      return null;
    }
  }
}
FuzzyPicker.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  label: PropTypes.string,
  displayCount: PropTypes.number,
  cycleAtEndsOfList: PropTypes.bool,
  onChangeHighlightedItem: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,

  renderItem: PropTypes.func,
  itemValue: PropTypes.func,
};
FuzzyPicker.defaultProps = {
  label: 'Search', // The text above the searchbox that describes what's happening
  displayCount: 5, // How many items to display at once
  cycleAtEndsOfList: true, // When a user arrows past the end of the list, should the highlight wrap?
  onChangeHighlightedItem(item) {}, // Called when the user highlights a new item
  onChange(item) {}, // Called when an item is selected
  onClose() {}, // Called when the popup is closed

  // By default, the item as its value (ie, each item is a string.)
  renderItem(item) { return item; },
  itemValue(item) { return item; },
};
