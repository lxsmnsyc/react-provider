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
import { Function2, Function3, Function4, Function5 } from '../utils/Function';
import { Optional } from '../utils/Optional';
import { ChangeNotifier } from './ChangeNotifier';
import { ChangeNotifierFinder, useChangeNotifierProvider } from './useChangeNotifierProvider';

/**
 * type definition for ChangeNotifierConsumer.builder property
 */
export type ChangeNotifierBuilderFunction<T extends ChangeNotifier> = Function2<T, Optional<React.ReactNode>, React.ReactElement>;
export type ChangeNotifierBuilderFunction2<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier
> = Function3<T1, T2, Optional<React.ReactNode>, React.ReactElement>;

export type ChangeNotifierBuilderFunction3<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier
> = Function4<T1, T2, T3, Optional<React.ReactNode>, React.ReactElement>;

export type ChangeNotifierBuilderFunction4<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier,
  T4 extends ChangeNotifier
> = Function5<T1, T2, T3, T4, Optional<React.ReactNode>, React.ReactElement>;

/**
 * property type definitions for the ChangeNotifierConsumer
 */
export interface IChangeNotifierConsumerProps<T extends ChangeNotifier> {
  /**
   * Provider Identifier
   */
  of: ChangeNotifierFinder<T>,
  /**
   * Child elements for the builder
   */
  children?: React.ReactNode,
  /**
   * Builder function
   */
  builder: ChangeNotifierBuilderFunction<T>,
}
export interface IChangeNotifierConsumer2Props<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier
> {
  of: [
    ChangeNotifierFinder<T1>,
    ChangeNotifierFinder<T2>
  ],
  children?: React.ReactNode,
  builder: ChangeNotifierBuilderFunction2<T1, T2>,
}
export interface IChangeNotifierConsumer3Props<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier
> {
  of: [
    ChangeNotifierFinder<T1>,
    ChangeNotifierFinder<T2>,
    ChangeNotifierFinder<T3>
  ],
  children?: React.ReactNode,
  builder: ChangeNotifierBuilderFunction3<T1, T2, T3>,
}
export interface IChangeNotifierConsumer4Props<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier,
  T4 extends ChangeNotifier
> {
  of: [
    ChangeNotifierFinder<T1>,
    ChangeNotifierFinder<T2>,
    ChangeNotifierFinder<T3>,
    ChangeNotifierFinder<T4>
  ],
  children?: React.ReactNode,
  builder: ChangeNotifierBuilderFunction4<T1, T2, T3, T4>,
}

export function ChangeNotifierConsumer<T extends ChangeNotifier>({ of, builder, children }: IChangeNotifierConsumerProps<T>) {
  const value = useChangeNotifierProvider<T>(of, true);
  return React.useMemo(() => builder(value, children), [ builder, value, children ]);
};

export function ChangeNotifierConsumer2<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier
>({ of, builder, children }: IChangeNotifierConsumer2Props<T1, T2>) {
  const v1 = useChangeNotifierProvider<T1>(of[0], true);
  const v2 = useChangeNotifierProvider<T2>(of[1], true);
  return React.useMemo(() => builder(v1, v2, children), [ builder, v1, v2, children ]);
};

export function ChangeNotifierConsumer3<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier
>({ of, builder, children }: IChangeNotifierConsumer3Props<T1, T2, T3>) {
  const v1 = useChangeNotifierProvider<T1>(of[0], true);
  const v2 = useChangeNotifierProvider<T2>(of[1], true);
  const v3 = useChangeNotifierProvider<T3>(of[2], true);
  return React.useMemo(() => builder(v1, v2, v3, children), [ builder, v1, v2, v3, children ]);
};

export function ChangeNotifierConsumer4<
  T1 extends ChangeNotifier,
  T2 extends ChangeNotifier,
  T3 extends ChangeNotifier,
  T4 extends ChangeNotifier
>({ of, builder, children }: IChangeNotifierConsumer4Props<T1, T2, T3, T4>) {
  const v1 = useChangeNotifierProvider<T1>(of[0], true);
  const v2 = useChangeNotifierProvider<T2>(of[1], true);
  const v3 = useChangeNotifierProvider<T3>(of[2], true);
  const v4 = useChangeNotifierProvider<T4>(of[3], true);
  return React.useMemo(() => builder(v1, v2, v3, v4, children), [ builder, v1, v2, v3, v4, children ]);
};
