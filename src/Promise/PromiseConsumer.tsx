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
import { Function, Function2 } from '../utils/Function';
import { Optional } from '../utils/Optional';
import { IPromiseDefault, IPromiseFailure, IPromiseLoading, IPromiseSuccess, PromiseResult } from './PromiseProvider';
import { PromiseProviderFinder, usePromiseProvider } from './usePromiseProvider';

/**
 * Type definition for onDefault builder
 */
export type PromiseConsumerOnDefaultBuilder = Function<Optional<React.ReactNode>, React.ReactElement>;
/**
 * Type definition for onLoading builder
 */
export type PromiseConsumerOnLoadingBuilder = Function<Optional<React.ReactNode>, React.ReactElement>;
/**
 * Type definition for onSuccess builder
 */
export type PromiseConsumerOnSuccessBuilder<T> = Function2<Optional<T>, Optional<React.ReactNode>, React.ReactElement>;
/**
 * Type definition for onFailure builder
 */
export type PromiseConsumerOnFailureBuilder = Function2<Optional<Error>, Optional<React.ReactNode>, React.ReactElement>; 
/**
 * Type definition for builder
 */
export type PromiseConsumerBuilder<T> = Function2<PromiseResult<T>, Optional<React.ReactNode>, React.ReactElement>;

/**
 * Property type definitions for the PromiseConsumer
 */
export interface IPromiseConsumerProps<T> {
  /**
   * Property identifier
   */
  of: PromiseProviderFinder<T>,
  /**
   * onDefault builder
   * called before Consumer component mounts.
   */
  onDefault?: PromiseConsumerOnDefaultBuilder,
  /**
   * onLoading builder
   * called after Consumer component mounts.
   */
  onLoading?: PromiseConsumerOnLoadingBuilder,
  /**
   * onSuccess builder
   * called after Promise value resolves
   */
  onSuccess?: PromiseConsumerOnSuccessBuilder<T>,
  /**
   * onFailure builder
   * called after Promise value rejects
   */
  onFailure?: PromiseConsumerOnFailureBuilder,
  /**
   * Superset of all builder functions; receives the PromiseResult
   */
  builder?: PromiseConsumerBuilder<T>,
  /**
   * Child elements used for builders
   */
  children?: React.ReactNode,
};

function PromiseDefaultFilter<T>(x: PromiseResult<T>): x is IPromiseDefault {
  return (x as IPromiseDefault).state === 'default';
}
function PromiseLoadingFilter<T>(x: PromiseResult<T>): x is IPromiseLoading {
  return (x as IPromiseLoading).state === 'loading';
}
function PromiseSuccessFilter<T>(x: PromiseResult<T>): x is IPromiseSuccess<T> {
  return (x as IPromiseSuccess<T>).state === 'success';
}
function PromiseFailureFilter<T>(x: PromiseResult<T>): x is IPromiseFailure {
  return (x as IPromiseFailure).state === 'failure';
}

/**
 * A PromiseConsumer is a Consumer component that consumes the states of a provided Promise
 * instance using the PromiseProvider.
 * 
 * A PromiseConsumer has 4 building states, and 3 building phases:
 * 1. onDefault: called before the PromiseConsumer mounts.
 * 2. onLoading: called after the PromiseConsumer mounts.
 * 3.a onSuccess: called after the Promise instance resolves.
 * 3.b onFailure: called after the Promise instnace rejects.
 */
export function PromiseConsumer<T>({ of, builder, onDefault, onLoading, onSuccess, onFailure, children }: IPromiseConsumerProps<T>) {
  const result = usePromiseProvider<T>(of);
  if (builder != null) {
    return builder(result, children);
  }
  if (onLoading && PromiseLoadingFilter(result)) {
    return onLoading(children);
  }
  if (onSuccess && PromiseSuccessFilter(result)) {
    return onSuccess(result.value, children);
  }
  if (onFailure && PromiseFailureFilter(result)) {
    return onFailure(result.error, children);
  }
  if (onDefault && PromiseDefaultFilter(result)) {
    return onDefault(children);
  }
  return null;
};