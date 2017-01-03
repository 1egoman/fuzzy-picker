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
        You picked: <code>{this.state.choice}</code>!
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
          'ad',
          'adipisicing',
          'aliqua',
          'aliquip',
          'amet',
          'anim',
          'aute',
          'cillum',
          'commodo',
          'consectetur',
          'consequat',
          'culpa',
          'cupidatat',
          'deserunt',
          'do',
          'dolor',
          'dolore',
          'duis',
          'ea',
          'eiusmod',
          'elit',
          'enim',
          'esse',
          'est',
          'et',
          'eu',
          'ex',
          'excepteur',
          'exercitation',
          'fugiat',
          'id',
          'in',
          'incididunt',
          'ipsum',
          'irure',
          'labore',
          'laboris',
          'laborum',
          'lorem',
          'magna',
          'minim',
          'mollit',
          'nisi',
          'non',
          'nostrud',
          'nulla',
          'occaecat',
          'officia',
          'pariatur',
          'proident',
          'qui',
          'quis',
          'reprehenderit',
          'sint',
          'sit',
          'sunt',
          'tempor',
          'ullamco',
          'ut',
          'velit',
          'veniam',
          'voluptate'
        ]}
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
