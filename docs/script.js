import FuzzySearcher, {Async} from '../src';

// React
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<FuzzySearcher
  isOpen={true}
  label="Search for a thing"
  onChange={choice => console.log('picked this item', choice)}
  onClose={() => console.log('close it!')}

  items={[
    "foo",
    "bar",
    "baz",
    "another",
    "wonder",
    "lorem",
    "ipsum",
    "dolar",
    "set",
    "amet",
  ]}

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
