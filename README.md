# React Fuzzy Searcher
 A React component that implements a fuzzy searcher (similar to Sublime Text's command pallete).

![Here's what it looks like!](assets/example.gif)

## Example
```javascript
ReactDOM.render(<FuzzySearcher
  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-searcher')}
  onChange={choice => console.log('You picked', choice)}
  items={["foo", "bar", "baz"]}
  label="Fuzzy Searcher Label"
/>, element);
```

The above renders, however, the component is "stuck" open. This is because the component is written
to be controlled, ie, ties in a parent component's state to keep track of whether is is open or
closed. Don't want that, or would rather an uncontrolled varient? Wrap it in a `FuzzyWrapper`:

```javascript
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
