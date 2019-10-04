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
import { Function2, Function3, Function4, Function5 } from './utils/Function';
import { Optional } from './utils/Optional';

/**
 * type definition for the Consumer.builder property
 */
export type ConsumerBuilder<T> = Function2<T, Optional<React.ReactNode>, React.ReactElement>;
export type ConsumerBuilder2<T1, T2> = Function3<T1, T2, Optional<React.ReactNode>, React.ReactElement>;
export type ConsumerBuilder3<T1, T2, T3> = Function4<T1, T2, T3, Optional<React.ReactNode>, React.ReactElement>;
export type ConsumerBuilder4<T1, T2, T3, T4> = Function5<T1, T2, T3, T4, Optional<React.ReactNode>, React.ReactElement>;

/**
 * Property type definition for the Consumer component
 */
export interface IConsumerProps<T> {
  /**
   * Provider identifier
   */
  of: ProviderFinder<T>,
  /**
   * Builder function
   */
  builder: ConsumerBuilder<T>,
  /**
   * Child elements
   */
  children?: React.ReactNode,
}
export interface IConsumer2Props<T1, T2> {
  of: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
  ],
  builder: ConsumerBuilder2<T1, T2>,
  children?: React.ReactNode,
}
export interface IConsumer3Props<T1, T2, T3> {
  of: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
    ProviderFinder<T3>,
  ],
  builder: ConsumerBuilder3<T1, T2, T3>,
  children?: React.ReactNode,
}
export interface IConsumer4Props<T1, T2, T3, T4> {
  of: [
    ProviderFinder<T1>,
    ProviderFinder<T2>,
    ProviderFinder<T3>,
    ProviderFinder<T4>,
  ],
  builder: ConsumerBuilder4<T1, T2, T3, T4>,
  children?: React.ReactNode,
}
/**
 * A Consumer is a component that consumes the exposed value of an specific
 * Provider. This Provider can be specified through "of" property which
 * is identifies the Provider. Consumers can then build an element through
 * the builder property.
 */
export function Consumer<T>({ of, builder, children }: IConsumerProps<T>) {
  const value = useProvider<T>(of);

  return React.useMemo(() => builder(value, children), [ builder, value ]);
}

export function Consumer2<T1, T2>({ of, builder, children }: IConsumer2Props<T1, T2>) {
  const v1 = useProvider<T1>(of[0]);
  const v2 = useProvider<T2>(of[1]);

  return React.useMemo(() => builder(v1, v2, children), [ builder, v1, v2 ]);
}

export function Consumer3<T1, T2, T3>({ of, builder, children }: IConsumer3Props<T1, T2, T3>) {
  const v1 = useProvider<T1>(of[0]);
  const v2 = useProvider<T2>(of[1]);
  const v3 = useProvider<T3>(of[2]);

  return React.useMemo(() => builder(v1, v2, v3, children), [ builder, v1, v2, v3 ]);
}

export function Consumer4<T1, T2, T3, T4>({ of, builder, children }: IConsumer4Props<T1, T2, T3, T4>) {
  const v1 = useProvider<T1>(of[0]);
  const v2 = useProvider<T2>(of[1]);
  const v3 = useProvider<T3>(of[2]);
  const v4 = useProvider<T4>(of[3]);

  return React.useMemo(() => builder(v1, v2, v3, v4, children), [ builder, v1, v2, v3, v4 ]);
}