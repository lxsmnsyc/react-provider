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
/**
 * Functions
 *
 * Functions  allows accepting values and returning a different
 * type of value
 */
export type Function<T, R> = (p: T) => R;
export type Function2<T1, T2, R> = (p1: T1, p2: T2) => R;
export type Function3<T1, T2, T3, R> = (p1: T1, p2: T2, p3: T3) => R;
export type Function4<T1, T2, T3, T4, R> =
  (p1: T1, p2: T2, p3: T3, p4: T4) => R;
export type Function5<T1, T2, T3, T4, T5, R> =
  (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) => R;
export type Function6<T1, T2, T3, T4, T5, T6, R> =
  (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6) => R;
export type Function7<T1, T2, T3, T4, T5, T6, T7, R> =
  (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7: T7) => R;
export type Function8<T1, T2, T3, T4, T5, T6, T7, T8, R> =
  (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7: T7, p8: T8) => R;
export type Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> =
  (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7: T7, p8: T8, p9: T9) => R;
export type FunctionN<T extends any[], R> = (...p: T) => R;

/**
 * Predicate
 *
 * A function that accepts values and returns a boolean.
 */
export type Predicate<T> = Function<T, boolean>;
export type Predicate2<T1, T2> = Function2<T1, T2, boolean>;
export type Predicate3<T1, T2, T3> = Function3<T1, T2, T3, boolean>;
export type Predicate4<T1, T2, T3, T4> = Function4<T1, T2, T3, T4, boolean>;
export type Predicate5<T1, T2, T3, T4, T5> =
  Function5<T1, T2, T3, T4, T5, boolean>;
export type Predicate6<T1, T2, T3, T4, T5, T6> =
  Function6<T1, T2, T3, T4, T5, T6, boolean>;
export type Predicate7<T1, T2, T3, T4, T5, T6, T7> =
  Function7<T1, T2, T3, T4, T5, T6, T7, boolean>;
export type Predicate8<T1, T2, T3, T4, T5, T6, T7, T8> =
  Function8<T1, T2, T3, T4, T5, T6, T7, T8, boolean>;
export type Predicate9<T1, T2, T3, T4, T5, T6, T7, T8, T9> =
  Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, boolean>;
export type PredicateN<T extends any[]> = FunctionN<T, boolean>;

/**
 * Consume
 *
 * Commonly used for side-effects, Consume accepts values.
 */
export type Consume<T> = Function<T, void>;
export type Consume2<T1, T2> = Function2<T1, T2, void>;
export type Consume3<T1, T2, T3> = Function3<T1, T2, T3, void>;
export type Consume4<T1, T2, T3, T4> = Function4<T1, T2, T3, T4, void>;
export type Consume5<T1, T2, T3, T4, T5> = Function5<T1, T2, T3, T4, T5, void>;
export type Consume6<T1, T2, T3, T4, T5, T6> =
  Function6<T1, T2, T3, T4, T5, T6, void>;
export type Consume7<T1, T2, T3, T4, T5, T6, T7> =
  Function7<T1, T2, T3, T4, T5, T6, T7, void>;
export type Consume8<T1, T2, T3, T4, T5, T6, T7, T8> =
  Function8<T1, T2, T3, T4, T5, T6, T7, T8, void>;
export type Consume9<T1, T2, T3, T4, T5, T6, T7, T8, T9> =
  Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, void>;
export type ConsumeN<T extends any[]> = FunctionN<T, void>;

/**
 * Supplier
 *
 * Commonly used for deferring values, Suppliers do not accept
 * any value but it returns a value.
 */
export type Supplier<R> = () => R;

/**
 * Action
 *
 * Commonly used for side-effects, Actions are functions that do not
 * accept parameters, as well as, not returning any value.
 */
export type Action = () => void;
