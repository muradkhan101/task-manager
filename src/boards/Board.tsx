import React, { Component } from 'react';
import styled from 'react-emotion';
import FaPlus from 'react-icons/lib/fa/plus';

import { MAIN_COLORS } from '../common/css';
import { ITask, IBoard } from './common/interfaces';
import { TaskItem } from './TaskItem';

const BoardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
`;

const TaskContainer = styled('div')`
    padding: 12px 8px;
`;

const TaskAdder = styled('div')`
    display: flex;
    border-top: 1px solid ${MAIN_COLORS.grassy};
    justify-content: space-between;
    padding: 8px 8px;
    background: white;
    color: ${MAIN_COLORS.grassy};
`;

const TaskInput = styled('input')`
    border: none;
    border-top: 1px solid ${MAIN_COLORS.grassy};
`;

interface Props {
    board: IBoard;
}
export class Board extends Component<Props> {
    state: { tempTask: string } = {
        tempTask: null,
    };

    toggleTaskStatus = (id) => {
        // Should the board know how to update a to-do status?
        // Or should it be the main page itself that handles that shizz?
        // Probably whatever is doing the AJAX call for the boards
        console.log(id);
    }
    createTask = () => {
        this.setState({tempTask: ''});
        // Make temp task
        // If someone enters that, append to array and dispatch AJAX
    }
    updateTask = (e) => {
        this.setState({tempTask: e.target.value});
    }
    render() {
        const { board } = this.props;
        const { tempTask } = this.state;
        return (
            <BoardContainer>
                <TaskContainer>
                    {board.issues.map(issue => <TaskItem task={issue} key={issue.id} click={this.toggleTaskStatus} />)}
                </TaskContainer>
                { tempTask === null
                    ? <TaskAdder onClick={() => this.setState({tempTask: ''})}>
                        <h3>Create Task</h3>
                        <FaPlus/>
                    </TaskAdder>
                    : <TaskInput value={tempTask} onChange={this.updateTask}/>
                }
            </BoardContainer>
        );
    }
}
