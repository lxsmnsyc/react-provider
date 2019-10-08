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
import { Function2 } from '../utils/Function';
import { Optional } from '../utils/Optional';
import { EventOptions, EventTargetProviderFinder, useEventTargetProvider } from './useEventTargetProvider';

/**
 * Type definition for an EventTargetProviderBuilder
 */
export type EventTargetProviderBuilder = Function2<Event, Optional<React.ReactNode>, React.ReactElement>;

/**
 * Property type definitions for the EventTargetConsumer
 */
export interface IEventTargetConsumerProps<T extends EventTarget> {
  /**
   * Provider identifier
   */
  of: EventTargetProviderFinder<T>,
  /**
   * Builder function
   */
  builder: EventTargetProviderBuilder,
  /**
   * Child elements
   */
  children?: React.ReactNode,
  /**
   * Event type to listen for changes
   */
  eventType: string,
  /**
   * Event options
   */
  options?: EventOptions,
}

/**
 * An EventTargetConsumer is a kind of Consumer component that consumes the recently emitted Event value
 * the provided EventTarget instance. This Consumer rebuilds everytime a new value is emitted.
 */
export function EventTargetConsumer<T extends EventTarget>({ of, builder, children, eventType, options }: IEventTargetConsumerProps<T>) {
  const value = useEventTargetProvider<T>(of, eventType, options);

  if (value == null) {
    return null;
  }
  return builder(value, children);
}