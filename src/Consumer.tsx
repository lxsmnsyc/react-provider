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
import { BiFunction } from './utils/Function';
import { Optional } from './utils/Optional';

/**
 * type definition for the Consumer.builder property
 */
export type ConsumerBuilder<T> = BiFunction<T, Optional<React.ReactNode>, React.ReactElement>;

/**
 * Property type definition for the Consumer component
 */
export interface IConsumerProps<T> {
    of: ProviderFinder<T>,
    builder: ConsumerBuilder<T>,
    children?: React.ReactNode,
    defaultValue?: T,
}

/**
 * A Consumer is a component that consumes the exposed value of an specific
 * Provider. This Provider can be specified through "of" property which
 * is a ProviderFinder type. Consumers can then build an element through
 * the builder property.
 */
export function Consumer<T>({ of, builder, children, defaultValue }: IConsumerProps<T>) {
    const value = useProvider<T>(of, defaultValue);

    return React.useMemo(() => {
        if (value == null) {
            return null;
        }
        return builder(value, children)
    }, [ value ]);
}