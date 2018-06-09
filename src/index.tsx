import React from 'react';
import { render } from 'react-dom';
import { BoardContainer } from './boards/Board/BoardContainer';
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
http.baseUrl = 'http://34.219.246.138';

/* Polyfills */
import 'core-js/es7/array';
import 'core-js/es7/map';
import 'core-js/es7/string';
import 'core-js/es7/promise';
import 'core-js/es7/set';

const App = () => (
    <BoardContainer ID={1} />
);

render(<App/>, document.getElementById('root'));
