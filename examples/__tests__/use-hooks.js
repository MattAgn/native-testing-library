import { useState } from 'react';
import { renderHook, act } from 'react-hooks-testing-library';

describe('useState tests', () => {
  test('should use setState value', () => {
    const { result } = renderHook(() => useState('foo'));
    const [value] = result.current;

    expect(value).toBe('foo');
  });

  test('should update setState value using setter', () => {
    const { result } = renderHook(() => useState('foo'));
    const [_, setValue] = result.current;

    act(() => setValue('bar'));

    const [value] = result.current;
    expect(value).toBe('bar');
  });
});