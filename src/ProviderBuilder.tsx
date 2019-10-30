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
import { IProviderBaseProps } from './Provider';
import ProviderContext from './ProviderContext';
import { Supplier } from './utils/Function';
import { useDispose } from './utils/useDispose';
/**
 * Prop type annotation for the Provider
 */
export interface IProviderBuilderProps<T> extends IProviderBaseProps<T> {
  /**
   * The value to be exposed in the component tree.
   */
  builder: Supplier<T>,
}

/**
 * A Provider component is a component that exposes a value in its
 * component tree. The components inside that tree can consume this
 * value through the use of Consumers or Selectors.
 */
export function ProviderBuilder<T>({ builder, of, children, dispose }: IProviderBuilderProps<T>) {
  /**
   * Gets the contextual value list
   */
  const values = React.useContext(ProviderContext);

  /**
   * Memoize value from the builder
   */
  const value = React.useMemo(builder, [ builder ]);
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

  /**
   * Apply lifecycle
   */
  useDispose(value, dispose);

  return (
    <ProviderContext.Provider value={memoEntries}>
      { children }
    </ProviderContext.Provider>
  );
}
