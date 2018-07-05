import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Client from 'aws-appsync'
import {Rehydrated} from 'aws-appsync-react'
import {ApolloProvider} from 'react-apollo'

import config from './AppSync'

const client = new Client (
    {
        url: config.graphqlEndpoint,
        region: config.region,
        auth: {
            type: config.authenticationType,
            apiKey: config.apiKey
        },
        disableOffline: true
    }
)
//import registerServiceWorker from './registerServiceWorker';

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'));
//registerServiceWorker();
