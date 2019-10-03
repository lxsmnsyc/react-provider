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
import { ChangeNotifier } from "./ChangeNotifier";
import { useChangeNotifierProvider, ChangeNotifierFinder } from "./useChangeNotifierProvider";
import { BiFunction } from '../utils/Function';
import { Optional } from '../utils/Optional';

/**
 * type definition for ChangeNotifierConsumer.builder property
 */
export type ChangeNotifierBuilder<T extends ChangeNotifier> = BiFunction<T, Optional<React.ReactNode>, React.ReactElement>;

/**
 * property type definitions for the ChangeNotifierConsumer
 */
export interface ChangeNotifierConsumerProps<T extends ChangeNotifier> {
    of: ChangeNotifierFinder<T>,
    children?: React.ReactNode,
    builder: ChangeNotifierBuilder<T>,
}

export function ChangeNotifierConsumer<T extends ChangeNotifier>({ of, builder, children }: ChangeNotifierConsumerProps<T>) {
    const value = useChangeNotifierProvider<T>(of, true);
    if (value == null) {
        return null;
    }
    return builder(value, children);
};