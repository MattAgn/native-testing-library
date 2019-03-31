import React from 'react';
import { Text } from 'react-native';

import { render } from '../../src';
import { NameContext, NameProvider, NameConsumer } from '../react-context';

/**
 * Test default values by rendering a context consumer without a
 * matching provider
 */
test('NameConsumer shows default value', () => {
  const { getByText } = render(<NameConsumer />);
  expect(getByText(/^My Name Is:/).props.children.join('')).toBe('My Name Is: Unknown');
});

/**
 * To test a component tree that uses a context consumer but not the provider,
 * wrap the tree with a matching provider
 */
test('NameConsumer shows value from provider', () => {
  const tree = (
    <NameContext.Provider value="C3P0">
      <NameConsumer />
    </NameContext.Provider>
  );
  const { getByText } = render(tree);
  expect(getByText(/^My Name Is:/).props.children.join('')).toBe('My Name Is: C3P0');
});

/**
 * To test a component that provides a context value, render a matching
 * consumer as the child
 */
test('NameProvider composes full name from first, last', () => {
  const tree = (
    <NameProvider first="Boba" last="Fett">
      <NameContext.Consumer>{value => <Text>Received: {value}</Text>}</NameContext.Consumer>
    </NameProvider>
  );
  const { getByText } = render(tree);
  expect(getByText(/^Received:/).props.children.join('')).toBe('Received: Boba Fett');
});

/**
 * A tree containing both a provider and consumer can be rendered normally
 */
test('NameProvider/Consumer shows name of character', () => {
  const tree = (
    <NameProvider first="Leia" last="Organa">
      <NameConsumer />
    </NameProvider>
  );
  const { getByText } = render(tree);
  expect(getByText(/^My Name Is:/).props.children.join('')).toBe('My Name Is: Leia Organa');
});