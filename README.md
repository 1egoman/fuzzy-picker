# React Fuzzy Searcher
 A React component that implements a fuzzy searcher (similar to Sublime Text's command pallete).

![Here's what it looks like!](assets/example.gif)

## Example
A super basic example of the component:

```javascript
import FuzzySearcher from 'react-fuzzy-searcher';
ReactDOM.render(<FuzzySearcher
  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-searcher')}
  onChange={choice => console.log('You picked', choice)}
  items={["foo", "bar", "baz"]}
  label="Fuzzy Searcher Label"
/>, element);
```

### Uncontrolled

The above renders, however, the component is "stuck" open. This is because the component is written
to be controlled, ie, ties in a parent component's state to keep track of whether is is open or
closed. Don't want that, or would rather an uncontrolled varient? Wrap it in a `FuzzyWrapper`:

```javascript
import FuzzySearcher, {FuzzyWrapper} from 'react-fuzzy-searcher';
// This is the code from above, just wrapped in a factory function.
function renderFuzzySearcher(isOpen, onClose) {
  return <FuzzySearcher
    isOpen={true}
    onClose={() => console.log('You closed the fuzzy-searcher')}
    onChange={choice => console.log('You picked', choice)}
    items={["foo", "bar", "baz"]}
    label="Fuzzy Searcher Label"
  />;
}

// Here, we check what key must be pressed to open the fuzzy searcher
// We'll use the '/' key for this example.
function isCorrectKeyPressed(event) {
  return e.key === '/';
}

ReactDOM.render(<FuzzyWrapper
  isKeyPressed={isCorrectKeyPressed}
  popup={renderFuzzySearcher}
/>, element);
```

With the above, pressing `/` will open the fuzzy searcher (and you don't have to worry about that
state.)

### Async
Sometimes, you want to fetch items async. Here's how you'd do that here.

```javascript
import {AsyncFuzzySearcher} from 'react-fuzzy-searcher';
ReactDOM.render(<AsyncFuzzySearcher
  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-searcher')}
  onChange={choice => console.log('You picked', choice)}
  label="Fuzzy Searcher Label"

  // Here's where it gets interesting. This prop takes a function, and expects a promise to be
  returned with a list of values that should be specified.
  fetchItems={value => {
    // "value" is what the user typed into the box.
    if (value === "foo") {
      // Pretend to be async!
      return Promise.resolve(["foo", "bar", "baz"]);
    } else {
      return Promise.resolve(["hello", "world"]);
    }
  }}
/>, element);
```

