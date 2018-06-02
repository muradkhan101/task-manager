import React from 'react';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';

const boardData: IBoard = {
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

interface Props {
    id: number;
}
export class BoardContainer extends React.PureComponent<Props> {
    state: { board: IBoard } = {
        board: boardData
    };

    createTask = (title) => {
        let task: ITask = {
            id: Math.floor(Math.random() * 10000),
            title,
            description: '',
            dueDate: 'future',
            status: 0
        };

        this.setState({
            board: Object.assign({}, this.state.board, { issues: this.state.board.issues.concat(task) }),
            tempTask: null
        });
        // Make temp task
        // If someone enters that, append to array and dispatch AJAX
    }
    getBoardData() {
        // Do AJAX
    }
    render() {
        const { board } = this.state;
        return (
            <Board board={board} createTask={this.createTask} />
        );
    }
}
