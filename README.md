# React Fuzzy Picker
 A React component that implements a fuzzy picker (similar to Sublime Text's command pallete). In a
 nutshell, it provides a quick way for user's to pick from a long list of items.

![Here's what it looks like!](assets/example.gif)

[![Build Status](https://travis-ci.org/1egoman/fuzzy-picker.svg?branch=master)](https://travis-ci.org/1egoman/fuzzy-picker)

## Demo and Examples
A live demo is available here: https://1egoman.github.io/fuzzy-picker
A super basic example of the component:

```javascript
import FuzzySearcher from 'react-fuzzy-searcher';
ReactDOM.render(<FuzzySearcher
  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-searcher')}
  onChange={choice => console.log('You picked', choice)}
  items={["foo", "bar", "baz"]}
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

With the above, pressing `/` will open the fuzzy searcher (and you don't have to worry about
managing that state.)

### Asynchronous Items
Sometimes, you want to fetch items asynchronously. Here's how you'd do that here.

```javascript
import {AsyncFuzzySearcher} from 'react-fuzzy-searcher';
ReactDOM.render(<AsyncFuzzySearcher
  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-searcher')}
  onChange={choice => console.log('You picked', choice)}

  // Here's where it gets interesting. This prop takes a function, and expects a promise to be
  // returned with a list of values that should be specified.
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


## Documentation

### `FuzzySearcher`
A component for fuzzy searching through a collection of items.

```javascript
<FuzzySearcher
  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-searcher')}
  onChange={choice => console.log('You picked', choice)}
  items={["foo", "bar", "baz"]}
/>
```

Props:
- `label`: A string, a label to print above the fuzzysearcher textbox.
- `items`: An array of strings. These are a "haystack" of all items. THis is searched against to
  find a match.
- `displayCount`: An integer, how many matches to show at maximum.
- `cycleAtEndsOfList`: A boolean, when a user arrows past the end of the list, should the highlight wrap?
- `onChangeHighlightedItem`: a callback that is fired when the highlight changes within the
  fuzzyfinder. Passed one argument, the newly highlighted item.
- `onChange`: When the user selects a final item, this callback is fired with that item. Passed one
  argument, the chosen item.
- `onClose`: When the user closes the fuzzy-finder by either pressing escape of clicking on the
  background, this callback is fired. Passed zero arguments.

### `AsyncFuzzySearcher`

An asynchronous version of the `FuzzySearcher` component.

```javascript
<AsyncFuzzySearcher
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
/>
```


Props:
- `label`: A string, a label to print above the fuzzy-finder textbox.
- `fetchItems`: A function called to asynchronously fetch new items for a given search phrase. Must
  return a promise with an array of strings. For example, `value => Promise.resolve(["foo", "bar",
  "baz"])`
- `displayCount`: An integer, how many matches to show at maximum.
- `cycleAtEndsOfList`: A boolean, when a user arrows past the end of the list, should the highlight
  wrap around to the other end?
- `onChangeHighlightedItem`: a callback that is fired when the highlight item changes within the
  fuzzy-finder (because the user moved up or down). Passed one argument, the newly highlighted item.
- `onChange`: When the user selects a final item, this callback is fired with that item. Passed one
  argument, the chosen item.
- `onClose`: When the user closes the fuzzy-finder by either pressing escape of clicking on the
  background, this callback is fired. Passed zero arguments.

### `FuzzyWrapper`

A wrapper component that controls a `FuzzyFinder` and will bind its opening to a keyboard event.

```javascript
// This is the code from above, just wrapped in a factory function.
function renderFuzzySearcher(isOpen, onClose) {
  return <FuzzySearcher
    isOpen={true}
    onClose={() => console.log('You closed the fuzzy-searcher')}
    onChange={choice => console.log('You picked', choice)}
    items={["foo", "bar", "baz"]}
  />;
}

// Here, we check what key must be pressed to open the fuzzy searcher
// We'll use the '/' key for this example.
function isCorrectKeyPressed(event) {
  return e.key === '/';
}

<FuzzyWrapper isKeyPressed={isCorrectKeyPressed} popup={renderFuzzySearcher} />
```


Props:
- `isKeyPressed`: A callback, fired when a key is pressed. Expected to return a boolean indicating
  whether the given keypress should open the fuzzy-finder.
- `popup`: A callback that is passed two arguments, the first being whether the contained
  fuzzy-finder shoule be open (`isOpen`), and the second being a callback that the fuzzy-finder can
  use to close itself (`onClose`). See the above examples for usage.
