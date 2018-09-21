import React from 'react';
import {FuzzyPicker, AsyncFuzzyPicker, FuzzyWrapper} from '../../src';
import {mount, shallow} from 'enzyme';
import jsdom from 'jsdom';
import assert from 'assert';
import sinon from 'sinon';

describe('React Picker Component', function() {
  // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
  function propagateToGlobal(window) {
    for (let key in window) {
      if (!window.hasOwnProperty(key)) continue
      if (key in global) continue

      global[key] = window[key]
    }
  }

  let doc;
  beforeEach(() => {
    doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;
    propagateToGlobal(global.window);
  });

  it('should be empty when closed', function() {
    let component = shallow(<FuzzyPicker
      isOpen={false}
      label="My Label"
      items={['foo', 'bar', 'baz']}
    />), elem;
    assert.equal(component.type(), null);
  });

  it('should by default have no items and have no input text (when open)', function() {
    let component = shallow(<FuzzyPicker
      isOpen={true}
      label="My Label"
      items={['foo', 'bar', 'baz']}
    />), elem;

    assert.equal(component.find('.fuzzy-picker-label').first().text(), "My Label"); // label set correctly
    assert.equal(component.find('.fuzzy-input').first().text(), ''); // Input box should be empty
    assert.equal(component.find('.fuzzy-items li').length, 0); // should be no items shown
  });

  it('should be able to optionally show all items before any text is typed', function() {
    let component = shallow(<FuzzyPicker
      isOpen={true}
      label="My Label"
      displayCount={2}
      items={['foo', 'food', 'follow']}
      showAllItems={true}
    />), elem;
    let input = component.find('.fuzzy-input').first();

    // Verify its showing the right number of items
    assert.deepEqual(
        component.find('.fuzzy-items li').map(n => n.text()),
        ['foo', 'food', 'follow']
      );
  });
  

  it('should show how many items its told to', function() {
    let component = shallow(<FuzzyPicker
      isOpen={true}
      label="My Label"
      displayCount={2}
      items={['foo', 'food', 'follow']}
    />), elem;
    let input = component.find('.fuzzy-input').first();

    // Enter 'f' into the textbox.
    input.simulate('change', {target: {value: 'f'}});
    // Verify its showing the right number of items
    assert.deepEqual(component.find('.fuzzy-items li').map(n => n.text()).length, 2);
  });

  it('should find items when user searches for them', function() {
    let component = shallow(<FuzzyPicker
      isOpen={true}
      items={['foo', 'food', 'follow', 'bar', 'baz']}
    />), elem;
    let input = component.find('.fuzzy-input').first();

    // Enter 'f' into the textbox.
    input.simulate('change', {target: {value: 'f'}});
    assert.deepEqual(
      component.find('.fuzzy-items li').map(n => n.text()),
      ['foo', 'food', 'follow']
    );
  });

  it('should find items when user searches for them (and a user uses custom keys)', function() {
    let component = shallow(<FuzzyPicker
      isOpen={true}
      items={[{value: 'foo'}, {value: 'food'}, {value: 'follow'}, {value: 'bar'}, {value: 'baz'}]}
      itemValue={item => item.value}
      renderItem={item => <span>{item.value}</span>}
    />), elem;
    let input = component.find('.fuzzy-input').first();

    // Enter 'f' into the textbox.
    input.simulate('change', {target: {value: 'f'}});
    assert.deepEqual(
      component.find('.fuzzy-items li').map(n => n.text()),
      ['foo', 'food', 'follow']
    );
  });

  it('should be able to move up and down in the list', function() {
    // Initialze the component with 'f' in the input.
    let component = shallow(<FuzzyPicker
      isOpen={true}
      items={['foo', 'food', 'follow', 'fake']}
      cycleAtEndsOfList={false}
    />), preventDefault;
    let input = component.find('.fuzzy-input').first();
    input.simulate('change', {target: {value: 'f'}});

    // Move down with arrow keys
    preventDefault = sinon.spy();
    input.simulate('keydown', {
      key: 'ArrowDown',
      ctrlKey: false,
      shiftKey: false,
      preventDefault,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'food');
    assert(preventDefault.called);

    // Move down with tab
    preventDefault = sinon.spy();
    input.simulate('keydown', {
      key: 'Tab',
      ctrlKey: false,
      shiftKey: false,
      preventDefault,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'follow');
    assert(preventDefault.called);

    // Move down with ctrl+j
    input.simulate('keydown', {
      key: 'j',
      ctrlKey: true,
      shiftKey: false,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'fake');

    // try one more time to prove we can't cycle past bounds
    input.simulate('keydown', {
      key: 'j',
      ctrlKey: true,
      shiftKey: false,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'fake');



    // Move up with arrow keys
    preventDefault = sinon.spy();
    input.simulate('keydown', {
      key: 'ArrowUp',
      ctrlKey: false,
      shiftKey: false,
      preventDefault,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'follow');
    assert(preventDefault.called);

    // Move up with shift+tab
    preventDefault = sinon.spy();
    input.simulate('keydown', {
      key: 'Tab',
      ctrlKey: false,
      shiftKey: true,
      preventDefault,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'food');
    assert(preventDefault.called);

    // Move up with ctrl+k
    input.simulate('keydown', {
      key: 'k',
      ctrlKey: true,
      shiftKey: false,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'foo');

    // ry one more time to prove we can't cycle past bounds
    input.simulate('keydown', {
      key: 'k',
      ctrlKey: true,
      shiftKey: false,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'foo');
  });

  it('should be able to move up and down past the bounds in the list when told to', function() {
    // Initialze the component with 'f' in the input.
    let component = shallow(<FuzzyPicker
      isOpen={true}
      items={['foo', 'food', 'follow', 'fake', 'filled']}
      cycleAtEndsOfList={true}
    />), preventDefault;
    let input = component.find('.fuzzy-input').first();
    input.simulate('change', {target: {value: 'f'}});

    // Move up and cycle to the bottom
    preventDefault = sinon.spy();
    input.simulate('keydown', {
      key: 'ArrowUp',
      ctrlKey: false,
      shiftKey: false,
      preventDefault,
    });
    assert.equal(component.find('.fuzzy-items li.selected').text(), 'filled');
    assert(preventDefault.called);
  });

  it('should be able to select an item', function() {
    let onChangeSpy = sinon.spy();
    let component = shallow(<FuzzyPicker
      isOpen={true}
      items={['foo', 'food', 'follow', 'bar', 'baz']}
      onChange={onChangeSpy}
    />), elem;
    let input = component.find('.fuzzy-input').first();

    input.simulate('change', {target: {value: 'f'}}); // enter data
    input.simulate('keydown', {key: 'Enter'}); // select it

    assert(onChangeSpy.calledWith('foo')); // selected first item
  });

  it('should be able to listen for item highlight updates', function() {
    let onChangeSpy = sinon.spy(), preventDefault = sinon.spy();
    let component = shallow(<FuzzyPicker
      isOpen={true}
      items={['foo', 'food', 'follow', 'bar', 'baz']}
      onChangeHighlightedItem={onChangeSpy}
    />), elem;
    let input = component.find('.fuzzy-input').first();

    input.simulate('change', {target: {value: 'f'}}); // enter data
    input.simulate('keydown', {key: 'ArrowDown', preventDefault});

    assert(onChangeSpy.calledWith('food')); // selected first item
    assert(preventDefault.called);
  });

  it('should be able to be closed with escape', function() {
    let onCloseSpy = sinon.spy();
    let component = shallow(<FuzzyPicker
      isOpen={true}
      onClose={onCloseSpy}
      items={['foo', 'bar', 'baz']}
    />), elem;
    let input = component.find('.fuzzy-input').first();
    input.simulate('keydown', {key: 'Escape'}); // select it
    assert(onCloseSpy.called);
  });

  it('by default enter does not close', function() {
    let onCloseSpy = sinon.spy();
    let component = shallow(<FuzzyPicker
      isOpen={true}
      onClose={onCloseSpy}
      items={['foo', 'bar', 'baz']}
    />);
    let input = component.find('.fuzzy-input').first();
    input.simulate('change', {target: {value: 'f'}}); // enter data
    input.simulate('keydown', {key: 'Enter'}); // select it
    assert(onCloseSpy.notCalled);
  });
  
  it('should be able to be optionally closed with enter', function() {
    let onCloseSpy = sinon.spy();
    let component = shallow(<FuzzyPicker
      isOpen={true}
      onClose={onCloseSpy}
      autoCloseOnEnter={true}
      items={['foo', 'bar', 'baz']}
    />);
    let input = component.find('.fuzzy-input').first();
    input.simulate('change', {target: {value: 'f'}}); // enter data
    input.simulate('keydown', {key: 'Enter'}); // select it
    assert(onCloseSpy.called);
  });

  it('close on enter can be explictly disabled', function() {
    let onCloseSpy = sinon.spy();
    let component = shallow(<FuzzyPicker
      isOpen={false}
      onClose={onCloseSpy}
      items={['foo', 'bar', 'baz']}
    />);
    let input = component.find('.fuzzy-input').first();
    input.simulate('change', {target: {value: 'f'}}); // enter data
    input.simulate('keydown', {key: 'Enter'}); // select it
    assert(onCloseSpy.notCalled);
  });
});
