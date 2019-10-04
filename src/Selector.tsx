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
import { Function, Function2, Function3, Function4 } from './utils/Function';
import { Optional } from './utils/Optional';
/**
 * A builder function type for the Selector.builder property
 */
export type SelectorBuilder<T> = Function2<T, Optional<React.ReactNode>, React.ReactElement>;
/**
 * Prop type definition for the Selector component
 */
export interface ISelectorProps<T, R> {
  of: ProviderFinder<T>,
  selector: Function<T, R>,
  children?: React.ReactNode,
  builder: SelectorBuilder<R>,
}
export interface ISelector2Props<T1, T2, R> {
  of: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
  ],
  selector: Function2<T1, T2, R>,
  children?: React.ReactNode,
  builder: SelectorBuilder<R>,
}
export interface ISelector3Props<T1, T2, T3, R> {
  of: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
    ProviderFinder<T3>,
  ],
  selector: Function3<T1, T2, T3, R>,
  children?: React.ReactNode,
  builder: SelectorBuilder<R>,
}
export interface ISelector4Props<T1, T2, T3, T4, R> {
  of: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
    ProviderFinder<T3>,
    ProviderFinder<T4>,
  ],
  selector: Function4<T1, T2, T3, T4, R>,
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
  const value = useProvider<T>(of);
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

export function Selector2<T1, T2, R>({ of, selector, builder, children }: ISelector2Props<T1, T2, R>) {
  const v1 = useProvider<T1>(of[0]);
  const v2 = useProvider<T2>(of[1]);
  const selected = selector(v1, v2);
  return React.useMemo(() => builder(selected, children), [ selected ]);
}

export function Selector3<T1, T2, T3, R>({ of, selector, builder, children }: ISelector3Props<T1, T2, T3, R>) {
  const v1 = useProvider<T1>(of[0]);
  const v2 = useProvider<T2>(of[1]);
  const v3 = useProvider<T3>(of[2]);
  const selected = selector(v1, v2, v3);
  return React.useMemo(() => builder(selected, children), [ selected ]);
}

export function Selector4<T1, T2, T3, T4, R>({ of, selector, builder, children }: ISelector4Props<T1, T2, T3, T4, R>) {
  const v1 = useProvider<T1>(of[0]);
  const v2 = useProvider<T2>(of[1]);
  const v3 = useProvider<T3>(of[2]);
  const v4 = useProvider<T4>(of[3]);
  const selected = selector(v1, v2, v3, v4);
  return React.useMemo(() => builder(selected, children), [ selected ]);
}