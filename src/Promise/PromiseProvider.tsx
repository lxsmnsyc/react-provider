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
import { Provider, ProviderKey, ProviderProps } from '../Provider';

export interface PromiseProviderProps<T> extends ProviderProps<Promise<T>> {
    of?: ProviderKey,
    value: Promise<T>,
    children?: React.ReactNode,
};

export type PromiseStates = 'default' | 'loading' | 'success' | 'failure';

export type PromiseDefault = {
    state: 'default',
    error?: null,
    value?: null,
};

export type PromiseLoading = {
    state: 'loading',
    error?: null,
    value?: null,
};

export type PromiseSuccess<T> = {
    state: 'success',
    value?: T,
    error?: null,
};

export type PromiseFailure = {
    state: 'failure',
    error?: Error,
    value?: null,
};

export type PromiseResult<T> = PromiseDefault | PromiseLoading | PromiseSuccess<T> | PromiseFailure;

function usePromise<T>(promise: Promise<T>) {
    const [state, setState] = React.useState<PromiseResult<T>>({
        state: 'default',
    });

    const mounted = React.useRef(false);

    /**
     * Component lifecycle tracking
     */
    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    React.useEffect(() => {
        setState({ state: 'loading' });

        promise.then(
            (value) => {
                if (mounted.current) {
                    setState({ state: 'success', value });
                }
                return value;
            },
            (error) => {
                if (mounted.current) {
                    setState({ state: 'failure', error });
                }
                return error;
            }
        );
    }, [ promise ]);

    return state;
}

export function PromiseProvider<T>({ of, value, children }: PromiseProviderProps<T>) {
    const state = usePromise(value);
    return (
        <Provider of={of} value={state}>
            { children }
        </Provider>
    );
};