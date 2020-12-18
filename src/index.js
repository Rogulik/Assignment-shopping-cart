import React from 'react';
import {  
    QueryClient,
    QueryClientProvider
} from 'react-query'
import { render } from 'react-dom';

import { App } from './components/App/App';

const queryClient = new QueryClient()

render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
    document.getElementById('root')
);
