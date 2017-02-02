import {FuzzyPicker, AsyncFuzzyPicker, FuzzyWrapper} from '../src';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// A class to wrap our example and maintain its state
class FuzzySearchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>
      {this.state.choice ? <p>
        You picked: <code>{this.state.choice.value}</code>!
      </p> : <span>
        <p>
          Give it a try!
        </p>
        <p>
          Press <code>/</code> to open and try searching for <code>lorem</code>!
        </p>
      </span>}

      <FuzzyPicker
        {...this.props}
        onChange={choice => {
          this.setState({choice});
          this.props.onClose();
        }}

        label="Search for a thing!"
        items={[
          {value: 'ad',},
          {value: 'adipisicing',},
          {value: 'aliqua',},
          {value: 'aliquip',},
          {value: 'amet',},
          {value: 'anim',},
          {value: 'aute',},
          {value: 'cillum',},
          {value: 'commodo',},
          {value: 'consectetur',},
          {value: 'consequat',},
          {value: 'culpa',},
          {value: 'cupidatat',},
          {value: 'deserunt',},
          {value: 'do',},
          {value: 'dolor',},
          {value: 'dolore',},
          {value: 'duis',},
          {value: 'ea',},
          {value: 'eiusmod',},
          {value: 'elit',},
          {value: 'enim',},
          {value: 'esse',},
          {value: 'est',},
          {value: 'et',},
          {value: 'eu',},
          {value: 'ex',},
          {value: 'excepteur',},
          {value: 'exercitation',},
          {value: 'fugiat',},
          {value: 'id',},
          {value: 'in',},
          {value: 'incididunt',},
          {value: 'ipsum',},
          {value: 'irure',},
          {value: 'labore',},
          {value: 'laboris',},
          {value: 'laborum',},
          {value: 'lorem',},
          {value: 'magna',},
          {value: 'minim',},
          {value: 'mollit',},
          {value: 'nisi',},
          {value: 'non',},
          {value: 'nostrud',},
          {value: 'nulla',},
          {value: 'occaecat',},
          {value: 'officia',},
          {value: 'pariatur',},
          {value: 'proident',},
          {value: 'qui',},
          {value: 'quis',},
          {value: 'reprehenderit',},
          {value: 'sint',},
          {value: 'sit',},
          {value: 'sunt',},
          {value: 'tempor',},
          {value: 'ullamco',},
          {value: 'ut',},
          {value: 'velit',},
          {value: 'veniam',},
          {value: 'voluptate'},
        ]}

        itemValue={item => item.value}
        renderItem={item => <span className="item-wrapper">{item.value}</span>}
      />
    </div>;
  }
}

// Use the FuzzyWrapper to control whether the fuzzy searcher is open or not.
ReactDOM.render(<FuzzyWrapper
  isKeyPressed={e => {
    // Press slash.
    return e.key === '/';
  }}
  popup={(isOpen, onClose) => <FuzzySearchExample isOpen={isOpen} onClose={onClose} />}
/>, document.getElementById('react'));
