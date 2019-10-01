import * as React from 'react';

interface PromiseProvider<T> {
    value: Promise<T>,
    children: React.ReactNode,
}

interface PromiseLoading {
    loading: true,
    value: null,
    error: null,
}

interface PromiseSuccess<T> {
    loading: false,
    value: T,
    error: null,
}

interface PromiseFailure {
    loading: false,
    value: null,
    error: Error,
}

type PromiseResult<T> = PromiseLoading | PromiseSuccess<T> | PromiseFailure;

function usePromise<T>(value: Promise<T>) {

}

export default function PromiseProvider<T>({ value, children }: PromiseProviderProps<T>) {
    return (
        
    )
}