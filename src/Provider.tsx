/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import * as React from 'react';
import ProviderContext from './ProviderContext';

/**
 * A value that can be used as an identifier for the Provider
 */
export type ProviderKey = string;

/**
 * Prop type annotation for the Provider
 */
export interface IProviderProps<T> {
  /**
   * The value to be exposed in the component tree.
   */
  value: T,
  /**
   * An optional identifier for a Provider element
   */
  of?: ProviderKey,
  /**
   * Child elements
   */
  children?: React.ReactNode,
}

/**
 * A Provider component is a component that exposes a value in its
 * component tree. The components inside that tree can consume this
 * value through the use of Consumers or Selectors.
 */
export function Provider<T>({ value, of, children }: IProviderProps<T>) {
  /**
   * Gets the contextual value list
   */
  const values = React.useContext(ProviderContext);

  /**
   * Declare the tuple entry for identifying this Provider.
   */
  const entry = [of, value];

  /**
   * Memoize this entry to prevent unreasonable re-renders
   */
  const memoEntry = React.useMemo(() => entry, entry);

  /**
   * Append the tuple entry to the value list.
   */
  const entries = [memoEntry, ...values];

  /**
   * Memoize the value list to prevent unreasonable re-renders
   */
  const memoEntries = React.useMemo(() => entries, entries);

  return (
    <ProviderContext.Provider value={memoEntries}>
      { children }
    </ProviderContext.Provider>
  );
}