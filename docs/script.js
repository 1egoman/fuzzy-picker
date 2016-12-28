import {FuzzySearcher, AsyncFuzzySearcher, FuzzyWrapper} from '../src';

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
      </p> : <p>
        Give it a try!
        Press <code>Ctrl+p</code> or <code>&#8984;p</code> to open and
        try searching for <code>lorem</code>!
      </p>}

      <FuzzySearcher
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
    // Either ctrl+p or command+p
    return e.key === 'p' && (e.metaKey || e.ctrlKey);
  }}
  popup={(isOpen, onClose) => <FuzzySearchExample isOpen={isOpen} onClose={onClose} />}
/>, document.getElementById('react'));
