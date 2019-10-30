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
import { ProviderKey } from './Provider';
import ProviderContext from './ProviderContext';

/**
 * A filter function which searches the up to the root
 * Provider for the passing value.
 */
export type ProviderFilter<T> = (x: any) => x is T;

/**
 * Type annotation for a ProviderFinder which can be either
 * a filter function or a key.
 */
export type ProviderFinder<T> = ProviderFilter<T> | ProviderKey;

/**
 * Searches up to the root Provider for the corresponding
 * value.
 * @param finder
 * @param values
 */
function findValue<T>(finder: ProviderFinder<T>, values: any[]) {
  if (typeof finder === 'function') {
    return values.find(([, value]) => finder(value));
  }
  if (typeof finder === 'string') {
    return values.find(([key]) => key === finder);
  }

  return null;
}

export class ProviderNotFoundError extends Error {
  constructor(of: ProviderFinder<any>) {
    super(`Value not found for finder: ${of.toString()}`);
  }
}

/**
 * A hook which gets the nearest corresponding value (given a finder)
 * up to the root Provider. If no corresponding value was found, the
 * default value will be returned (if provided).
 */
export function useProvider<T>(finder: ProviderFinder<T>): T {
  /**
   * Gets the contextual value list
   */
  const values = React.useContext(ProviderContext);

  /**
   * finds the corresponding value
   */
  const result = findValue(finder, values);

  /**
   * If no value was found, throw an error.
   */
  if (result == null) {
    throw new ProviderNotFoundError(finder);
  }

  /**
   * Since the value list are comprised of [key, value] tuples
   * return the second value.
   */
  return result[1];
}
