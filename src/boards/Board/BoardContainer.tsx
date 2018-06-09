import React from 'react';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';

const boardData: IBoard = {
    ID: 1,
    Name: 'Testerino',
    Issues: [
        {
            ID: 2,
            Title: 'Make test data',
            Description: 'data used for testing',
            DueDate: 'today',
            Status: 1
        },
        {
            ID: 3,
            Title: 'Teach doo doo manners',
            Description: 'She\'s a monster!',
            DueDate: 'tomorrow',
            Status: 0
        }
    ]
};

interface Props {
    ID: number;
}
export class BoardContainer extends React.PureComponent<Props> {
    state: { board: IBoard } = {
        board: boardData
    };

    createTask = (Title) => {
        let task: ITask = {
            ID: Math.floor(Math.random() * 10000),
            Title,
            Description: '',
            DueDate: 'future',
            Status: 0
        };

        this.setState({
            board: Object.assign({}, this.state.board, { Issues: this.state.board.Issues.concat(task) }),
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
