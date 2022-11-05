import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';

import { AppStore, RootState } from "../store";


interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: {

        },
        preloadedState,
    });
};

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        store = getMockStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren): JSX.Element {
        return (
            <ProSidebarProvider>
                <Provider store={store}>{children}</Provider>
            </ProSidebarProvider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}