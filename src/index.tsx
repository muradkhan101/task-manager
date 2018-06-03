import React from 'react';
import { render } from 'react-dom';
import { BoardContainer } from './boards/Board/BoardContainer';
import { IBoard } from './boards/common/interfaces';
import './index.scss';
import 'whatwg-fetch';

const App = () => (
    <BoardContainer id={1} />
);

render(<App/>, document.getElementById('root'));
