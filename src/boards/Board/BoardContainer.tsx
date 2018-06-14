import React from 'react';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';
import { TaskItem } from '../Task/TaskItem';
import { Dispatch } from 'redux';
import { AddTask$, UpdateTask$ } from '../Task/store';
interface Props {
    board: IBoard;
    issues: Array<ITask>;
    dispatch: Dispatch<any>;
}
export class BoardContainer extends React.PureComponent<Props> {
    createTask = (Title) => {
        let task: ITask = {
            ID: -1,
            Description: '',
            CreateDate: (new Date()).toISOString(),
            Status: 0,
            Board: this.props.board.ID,
            Name: Title,
            CreatedBy: 1,
            Owner: 1
        };
        this.props.dispatch(new AddTask$(task));
    }
    toggleTaskStatus = (id: number) => {
        let item = this.props.issues.filter(issue => issue.ID === id)[0];
        if (item)
            this.props.dispatch(new UpdateTask$(item, {Status: Number(!item.Status)}));
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
