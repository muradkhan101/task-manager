import React from 'react';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';
import { TaskItem } from '../Task/TaskItem';

interface Props {
    board: IBoard;
    issues: Array<ITask>;
}
export class BoardContainer extends React.PureComponent<Props> {

    createTask = (Title) => {
        let task: ITask = {
            ID: -1,
            Description: '',
            DueDate: 'future',
            Status: 0,
            Board: this.props.board.ID,
            Name: Title,
            CreatedBy: 1,
            Owner: 1
        };

        this.setState({
            board: Object.assign({}, this.props.board, { Issues: this.props.board.Issues.concat(task) }),
            tempTask: null
        });
        // Make temp task
        // If someone enters that, append to array and dispatch AJAX
    }
    toggleTaskStatus = (id: number) => {
        // do a thing
    }
    getBoardData = () => {
        // Do AJAX
    }
    render() {
        const { board, issues } = this.props;
        return (
            <Board board={board} createTask={this.createTask} >
                {issues.filter(issue => issue.Board === board.ID)
                    .map(issue => <TaskItem key={issue.ID} boardID={board.ID} click={this.toggleTaskStatus} {...issue} />)
                }
            </Board>
        );
    }
}
