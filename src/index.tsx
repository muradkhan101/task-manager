import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './boards/store/storeConfig';

import { DashboardContainer } from './boards/dashboard';
import './index.scss';
import 'whatwg-fetch';
import { http, StorageHelper } from './common/helpers';

http.authFn = (options: RequestInit) => {
    let user = StorageHelper.get('user');
    let jwtString = user && user.jwt;
    if (options && options.headers) {
        options.headers['Authorization'] = `Bearer ${jwtString}`;
    } else {
        options.headers = {Authorization: `Bearer ${jwtString}`};
    }
    return options;
};
http.baseUrl = 'https://34.219.246.138/';

import { TextToInput } from './boards/Board/TextToInput';

/* Polyfills */
import 'core-js/es7/array';
import 'core-js/es7/map';
import 'core-js/es7/string';
import 'core-js/es7/promise';
import 'core-js/es7/set';

const store = configureStore();

// <TextToInput  submit={(test)=>console.log(test)} text={'Temporary'} theme={{fontSize: '24px', fontFamily:'system-ui,sans-serif',color:'#313131'}}> <h1>Testing 1 2 3</h1></TextToInput>
const App = () => (
    <Provider store={store}>
        <DashboardContainer />
    </Provider>
);

render(<App/>, document.getElementById('root'));
