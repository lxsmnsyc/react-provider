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
import { usePromiseProvider, PromiseProviderFinder } from "./usePromiseProvider";
import { PromiseDefault, PromiseResult, PromiseLoading, PromiseSuccess, PromiseFailure } from "./PromiseProvider";

export interface PromiseConsumerProps<T> {
    of: PromiseProviderFinder<T>,
    onDefault?: (children: React.ReactNode) => React.ReactElement,
    onLoading?: (children: React.ReactNode) => React.ReactElement,
    onSuccess?: (value: T, children: React.ReactNode) => React.ReactElement,
    onFailure?: (error: Error, children: React.ReactNode) => React.ReactElement,
    children?: React.ReactNode,
};

function PromiseDefaultFilter<T>(x: PromiseResult<T>): x is PromiseDefault {
    return (x as PromiseDefault).state === 'default';
}
function PromiseLoadingFilter<T>(x: PromiseResult<T>): x is PromiseLoading {
    return (x as PromiseLoading).state === 'loading';
}
function PromiseSuccessFilter<T>(x: PromiseResult<T>): x is PromiseSuccess<T> {
    return (x as PromiseSuccess<T>).state === 'success';
}
function PromiseFailureFilter<T>(x: PromiseResult<T>): x is PromiseFailure {
    return (x as PromiseFailure).state === 'failure';
}

export function PromiseConsumer<T>({ of, onDefault, onLoading, onSuccess, onFailure, children }: PromiseConsumerProps<T>) {
    const result = usePromiseProvider<T>(of);

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