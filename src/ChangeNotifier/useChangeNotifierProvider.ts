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
import { ProviderFinder, useProvider } from '../useProvider';
import { ChangeNotifier, ChangeNotifierListener } from './ChangeNotifier';

/**
 * Defines the ProviderFinder for ChangeNotiferProvider
 */
export type ChangeNotifierFinder<T extends ChangeNotifier> = ProviderFinder<T>;

/**
 * A hook which gets the nearest corresponding ChangeNotifier
 * instance (given a finder) up to the root Provider.
 */
export function useChangeNotifierProvider<T extends ChangeNotifier>
(of: ChangeNotifierFinder<T>, listen: boolean = true): T {
  /**
   * Gets the corresponding notifier
   */
  const value = useProvider<T>(of);
  /**
   * Used for forcing re-renders whenever the component
   * needs to be notified.
   */
  const [state, setState] = React.useState<boolean>(false);

  React.useEffect(() => {
    /**
     * If there is a value found, and we need to listen for
     * notifications.
     */
    if (listen) {
      /**
       * Define the callback
       */
      const callback: ChangeNotifierListener = () => {
        setState(!state);
      };

      /**
       * Add the callback to the listeners
       */
      value.addListener(callback);

      return () => value.removeListener(callback);
    }

    return () => null;
  }, [ value, listen, state ]);

  /**
   * expose the instance
   */
  return value;
}
