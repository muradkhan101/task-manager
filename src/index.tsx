import React from 'react';
import { render } from 'react-dom';
import { Board } from './boards/Board';
import { IBoard } from './boards/common/interfaces';
import './index.scss';

const board: IBoard = {
    id: 1,
    name: 'Testerino',
    issues: [
        {
            id: 2,
            title: 'Make test data',
            description: 'data used for testing',
            dueDate: 'today',
            status: 1
        },
        {
            id: 3,
            title: 'Teach doo doo manners',
            description: 'She\'s a monster!',
            dueDate: 'tomorrow',
            status: 0
        }
    ]
};

const App = () => (
    <Board board={board}>
    </Board>
);

render(<App/>, document.getElementById('root'));
