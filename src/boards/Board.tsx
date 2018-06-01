import React, { Component } from 'react';
import styled from 'react-emotion';
import { plus as Plus } from 'react-icons-kit/fa/plus';

import { MAIN_COLORS } from '../common/css';
import { ITask, IBoard } from './common/interfaces';
import { TaskItem } from './TaskItem';

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TaskContainer = styled.div`
    padding: 12px 8px;
`;
const TaskAdder = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 8px;
    background: white;
    color: ${MAIN_COLORS.grassy};
`;

interface Props {
    board: IBoard;
}
export class Board extends Component<Props> {
    state = {
        tempTask: null
    };

    toggleTaskStatus = (id) => {
        // Should the board know how to update a to-do status?
        // Or should it be the main page itself that handles that shizz?
        // Probably whatever is doing the AJAX call for the boards
        console.log(id);
    }
    createTask = () => {
        // Make temp task
        // If someone enters that, append to array and dispatch AJAX
    }
    render() {
        const { board } = this.props;
        return (
            <BoardContainer>
                <TaskContainer>
                    {board.issues.map(issue => <TaskItem task={issue} key={issue.id} click={this.toggleTaskStatus} />)}
                </TaskContainer>
                <TaskAdder>
                    <h3>Create Task</h3>
                    <Plus/>
                </TaskAdder>
            </BoardContainer>
        );
    }
}
