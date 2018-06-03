import React from 'react';
import { render } from 'react-dom';
import { BoardContainer } from './boards/Board/BoardContainer';
import './index.scss';
import 'whatwg-fetch';
import { HttpClient } from './common/helpers/http/HttpClient';
import { Inject } from './common/helpers/decorators/Inject';

let http: HttpClient = Inject(HttpClient);
http.get('');

/* Polyfills */
import 'core-js/es7/array';
import 'core-js/es7/map';
import 'core-js/es7/string';
import 'core-js/es7/promise';
import 'core-js/es7/set';

const App = () => (
    <BoardContainer id={1} />
);

render(<App/>, document.getElementById('root'));
