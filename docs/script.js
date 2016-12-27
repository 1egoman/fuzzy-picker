import {FuzzySearcher, AsyncFuzzySearcher, FuzzyWrapper} from '../src';

// React
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<FuzzyWrapper
  isKeyPressed={e => e.key === '/'}
  popup={(isOpen, onClose) => <FuzzySearcher
    isOpen={isOpen}
    onClose={onClose}
    onChange={choice => {
      console.log('picked this item', choice)
      onClose();
    }}

    label="Search for a thing"
    items={[
      "foo",
      "bar",
      "baz",
      "another",
      "wonder",
      "lorem",
      "ipsum",
      "dolar",
      "dolcite",
      "set",
      "amet",
    ]}
  />}
/>, document.getElementById('react-1'));

// ReactDOM.render(<Async
//   isOpen={true}
//   label="Search for a thing"
//   onChange={choice => console.log('picked this item', choice)}
//   onClose={() => console.log('close it!')}
//
//   fetchItems={phrase => {
//     return Promise.resolve(["foo", "bar", "baz"]);
//   }}
// />, document.getElementById('react-1'));
