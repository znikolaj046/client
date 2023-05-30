import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import { AppContextProvider } from './components/AppContext.js';
import { CookiesProvider } from 'react-cookie';

const root = createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <React.StrictMode>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </React.StrictMode>
    </CookiesProvider>
);
