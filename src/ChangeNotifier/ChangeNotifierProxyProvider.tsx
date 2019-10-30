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
import {
  IProxyProviderProps1, IProxyProviderProps2, IProxyProviderProps3, IProxyProviderProps4,
} from '../ProxyProvider';
import { useDispose } from '../utils/useDispose';
import { ChangeNotifier } from './ChangeNotifier';
import { ChangeNotifierProvider } from './ChangeNotifierProvider';
import { useChangeNotifierProvider } from './useChangeNotifierProvider';

/**
 * ChangeNotifierProxyProvider
 *
 * a variant of ProxyProvider but injects values with a ChangeNotifierProvider
 */
export function ChangeNotifierProxyProvider<
  T extends ChangeNotifier,
  R extends ChangeNotifier,
>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps1<T, R>) {
  const value = useChangeNotifierProvider<T>(identifiers);

  const memo = React.useMemo(() => builder(value), [ value, builder ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <ChangeNotifierProvider of={of} value={memo}>
      { children }
    </ChangeNotifierProvider>
  );
}
export function ChangeNotifierProxyProvider2<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  R extends ChangeNotifier,
>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps2<T1, T2, R>) {
  const v1 = useChangeNotifierProvider<T1>(identifiers[0]);
  const v2 = useChangeNotifierProvider<T2>(identifiers[1]);

  const memo = React.useMemo(() => builder(v1, v2), [ builder, v1, v2 ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <ChangeNotifierProvider of={of} value={memo}>
      { children }
    </ChangeNotifierProvider>
  );
}

export function ChangeNotifierProxyProvider3<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier,
  R extends ChangeNotifier
>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps3<T1, T2, T3, R>) {
  const v1 = useChangeNotifierProvider<T1>(identifiers[0]);
  const v2 = useChangeNotifierProvider<T2>(identifiers[1]);
  const v3 = useChangeNotifierProvider<T3>(identifiers[2]);

  const memo = React.useMemo(() => builder(v1, v2, v3), [ builder, v1, v2, v3 ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <ChangeNotifierProvider of={of} value={memo}>
      { children }
    </ChangeNotifierProvider>
  );
}
export function ChangeNotifierProxyProvider4<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier,
  T4 extends ChangeNotifier,
  R extends ChangeNotifier
>
({ of, identifiers, builder, children, dispose }: IProxyProviderProps4<T1, T2, T3, T4, R>) {
  const v1 = useChangeNotifierProvider<T1>(identifiers[0]);
  const v2 = useChangeNotifierProvider<T2>(identifiers[1]);
  const v3 = useChangeNotifierProvider<T3>(identifiers[2]);
  const v4 = useChangeNotifierProvider<T4>(identifiers[3]);

  const memo = React.useMemo(() => builder(v1, v2, v3, v4), [ builder, v1, v2, v3, v4 ]);

  /**
   * Apply lifecycle
   */
  useDispose(memo, dispose);

  return (
    <ChangeNotifierProvider of={of} value={memo}>
      { children }
    </ChangeNotifierProvider>
  );
}
