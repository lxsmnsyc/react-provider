import * as React from 'react';
import { ProviderProps } from "./Provider";

export type ProviderType = React.FC<ProviderProps<any>>;

export interface MultiProviderProps {
    providers: React.ReactElement<ProviderProps<any>, ProviderType>[],
    children: React.ReactNode,
}

export function MultiProvider({ providers, children }: MultiProviderProps) {
    return (
        <>
            {providers.reverse().reduce((reduced, provider) => React.cloneElement(provider, {}, reduced), children)}
        </>
    )
}