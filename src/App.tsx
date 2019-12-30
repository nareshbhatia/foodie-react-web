import React, { Suspense, useReducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary, Loading } from '@nareshbhatia/react-force';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { theme } from './components';
import { RootStoreContext } from './contexts';
import { initApp } from './init';
import { INITIAL_SEARCH_STATE, SearchContext, searchReducer } from './reducers';
import { Router } from './Router';
import { EnvService } from './services';

// Initialize the app
const rootStore = initApp();

export const App: React.FC = () => {
    const httpLink = createHttpLink({
        uri: EnvService.apiUrl()
    });

    const authLink = setContext((_, { headers }: any) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${EnvService.accessToken()}`,
                'Accept-Language': 'en_US'
            }
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({ freezeResults: true }),
        assumeImmutableResults: true
    });

    // Keep searchReducer at the app level so that search parameters
    // are preserved across page navigation
    const [state, dispatch] = useReducer(searchReducer, INITIAL_SEARCH_STATE);

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <ApolloProvider client={client}>
                    <SearchContext.Provider value={{ state, dispatch }}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <RootStoreContext.Provider value={rootStore}>
                                <Router />
                            </RootStoreContext.Provider>
                        </ThemeProvider>
                    </SearchContext.Provider>
                </ApolloProvider>
            </Suspense>
        </ErrorBoundary>
    );
};
