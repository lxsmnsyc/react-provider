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
import { IProviderBaseProps, Provider } from './Provider';
import { ProviderFinder, useProvider } from './useProvider';
import { Function, Function2, Function3, Function4 } from './utils/Function';
import { useDispose } from './utils/useDispose';

/**
 * Type definition for the ProxyProvider builders
 */
export interface IProxyProviderProps1<T, R> extends IProviderBaseProps<R> {
  identifiers: ProviderFinder<T>,
  builder: Function<T, R>,
}
export interface IProxyProviderProps2<T1, T2, R> extends IProviderBaseProps<R> {
  identifiers: [
    ProviderFinder<T1>,
    ProviderFinder<T2>
  ],
  builder: Function2<T1, T2, R>,
}
export interface IProxyProviderProps3<T1, T2, T3, R> extends IProviderBaseProps<R> {
  identifiers: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
    ProviderFinder<T3>
  ],
  builder: Function3<T1, T2, T3, R>,
}
export interface IProxyProviderProps4<T1, T2, T3, T4, R> extends IProviderBaseProps<R> {
  identifiers: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
    ProviderFinder<T3>,
    ProviderFinder<T4>
  ],
  builder: Function4<T1, T2, T3, T4, R>,
}

/**
 * The ProxyProvider component is a Provider component that consumes values from its identified
 * Provider ancestors, transforms it, and provides it to its children.
 */
export function ProxyProvider<T, R>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps1<T, R>) {
  const value = useProvider<T>(identifiers);

  const memo = React.useMemo(() => builder(value), [ value, builder ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <Provider of={of} value={memo}>
      { children }
    </Provider>
  );
}
export function ProxyProvider2<T1, T2, R>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps2<T1, T2, R>) {
  const v1 = useProvider<T1>(identifiers[0]);
  const v2 = useProvider<T2>(identifiers[1]);

  const memo = React.useMemo(() => builder(v1, v2), [ builder, v1, v2 ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <Provider of={of} value={memo}>
      { children }
    </Provider>
  );
}
export function ProxyProvider3<T1, T2, T3, R>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps3<T1, T2, T3, R>) {
  const v1 = useProvider<T1>(identifiers[0]);
  const v2 = useProvider<T2>(identifiers[1]);
  const v3 = useProvider<T3>(identifiers[2]);

  const memo = React.useMemo(() => builder(v1, v2, v3), [ builder, v1, v2, v3 ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <Provider of={of} value={memo}>
      { children }
    </Provider>
  );
}
export function ProxyProvider4<T1, T2, T3, T4, R>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps4<T1, T2, T3, T4, R>) {
  const v1 = useProvider<T1>(identifiers[0]);
  const v2 = useProvider<T2>(identifiers[1]);
  const v3 = useProvider<T3>(identifiers[2]);
  const v4 = useProvider<T4>(identifiers[3]);

  const memo = React.useMemo(() => builder(v1, v2, v3, v4), [ builder, v1, v2, v3, v4 ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <Provider of={of} value={memo}>
      { children }
    </Provider>
  );
}
