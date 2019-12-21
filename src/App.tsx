import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary, Loading } from '@nareshbhatia/react-force';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { theme } from './components';
import { EnvService } from './services';
import { HomePage } from './pages';

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
        cache: new InMemoryCache()
    });

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <HomePage />
                    </ThemeProvider>
                </ApolloProvider>
            </Suspense>
        </ErrorBoundary>
    );
};
