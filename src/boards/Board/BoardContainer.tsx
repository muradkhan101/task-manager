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
// This will handle create, update, delete, etc
// Could split echo of those functionalities out into a decorator or something
// Composeable CRUD
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
    // Whwn task item is passed through this component, this function is allowed to
    // go to the task instance directly without passing through Board
    toggleTaskStatus = (id: number) => {
        let item = this.props.issues.filter(issue => issue.ID === id)[0];
        if (item)
            this.props.dispatch(new UpdateTask$(item, {Status: Number(!item.Status)}));
    }
    render() {
        // Because functions return thing as value we dont have to worry about its usage mulyple times
        // If it kept one reference, it would overwrite the old value the next time it was used
        // like when you pass by reference and mutate
        // Haskell is basically always pass by value because you have to construct a new item
        // For each time a value is asked for
        // Thats  how thunking works there, since values cant be altered once created
        // dont need to calculate until last second because guarantee of correct operation
        // JIT compiling could be like this, gives assurance of value when needed
        const { board, issues } = this.props;
        return (
            <Board board={board} createTask={this.createTask} >
                // Can the filter be removed without passing unnecessary-to-render data (boardID)
                // and doing something like passing a function that renders the data whenn it needs it
                {issues.filter(issue => issue.Board === board.ID)
                    .map(issue => <TaskItem key={issue.ID} boardID={board.ID} click={this.toggleTaskStatus} {...issue} />)
                }
            </Board>
        );
    }
}
