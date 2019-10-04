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
import { ProviderFinder, useProvider } from './useProvider';
import { BiFunction, Function } from './utils/Function';
import { Optional } from './utils/Optional';

export type SelectorFunction<T, R> = Function<T, R>;

/**
 * A builder function type for the Selector.builder property
 */
export type SelectorBuilder<T> = BiFunction<T, Optional<React.ReactNode>, React.ReactElement>;

/**
 * Prop type definition for the SelectorComponent (Selector.component)
 */
export interface ISelectorComponentProps<T> {
  value: T,
  children?: React.ReactNode,
}

/**
 * Type definition for the SelectorComponent (Selector.component)
 */
export type SelectorComponent<T> = React.ComponentType<ISelectorComponentProps<T>>;

/**
 * Prop type definition for the Selector component
 */
export interface ISelectorProps<T, R> {
  of: ProviderFinder<T>,
  selector: SelectorFunction<T, R>,
  children?: React.ReactNode,
  builder: SelectorBuilder<R>,
}

/**
 * A Selector component is a kind of Consumer component that can filter
 * the exposed value from a Provider and prevents re-building the generated
 * component if the selector value doesn't change.
 * 
 * A Selector can accept a builder function, which is a function that produces
 * a React.Element, or a component value, which accepts a React.ComponentType.
 * If both values are provided, the component value is returned first, otherwise,
 * the builder function is called.
 * 
 * If the selected value didn't change, the builder won't be called again until
 * such time the value changes.
 */
export function Selector<T, R>({ of, selector, builder, children }: ISelectorProps<T, R>) {
  /**
   * Consume value from the Provider
   */
  const value = useProvider<Optional<T>>(of);

  /**
   * Check if the value does not exist
   */
  if (value == null) {
    return null;
  }
  /**
   * Perform value selection
   */
  const selected = selector(value);

  /**
   * Memoize the result of the builder to prevent re-build calls,
   * where the selected value is a dependency value.
   */
  return React.useMemo(() => builder(selected, children), [ selected ]);
}