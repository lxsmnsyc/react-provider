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
import { Action } from "../utils/Function";
import { Optional } from "../utils/Optional";

export type ChangeNotifierListener = Action;

/**
 * A class that acts similarly to an EventTarget interface, with the
 * exceptions of:
 * - notifying callbacks are debounced.
 * - callbacks are called asynchronously.
 */
export class ChangeNotifier {
  /**
   * Contains the listeners
   */
  private listeners: Optional<Set<ChangeNotifierListener>>;

  private scheduled: boolean;

  constructor() {
    this.listeners = new Set<ChangeNotifierListener>();
    this.scheduled = false;
  }

  /**
   * Adds a listener
   * @param listener A function that is executed whenever
   * notifyListeners is called.
   */
  public addListener(listener: ChangeNotifierListener) {
    if (this.listeners) {
      this.listeners.add(listener);
    }
  }

  /**
   * Removes a listener
   * @param listener A function that is already added
   * for notifying.
   */
  public removeListener(listener: ChangeNotifierListener) {
    if (this.listeners) {
      this.listeners.delete(listener);
    }
  }

  /**
   * Disposes this instance for cleanup logic
   */
  public dispose() {
    this.listeners = null;
  }

  /**
   * Notifies all listeners
   */
  protected notifyListeners() {
    if (this.listeners == null) {
      return;
    }
    /**
     * Debounce calls
     */
    if (this.scheduled) {
      return;
    }
    this.scheduled = true;

    /**
     * Schedule the task
     */
    Promise.resolve().then(() => {
      /**
       * Allow debouncing
       */
      this.scheduled = false;

      if (this.listeners == null) {
        return;
      }
      /**
       * Clone the Set instance to prevent synchronous
       * addListener calls
       */
      new Set<ChangeNotifierListener>(this.listeners).forEach(fn => fn());
    });
  }
}