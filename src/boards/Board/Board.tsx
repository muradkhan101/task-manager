import React, { Component, ReactElement } from 'react';
import styled from 'react-emotion';
import FaPlus from 'react-icons/lib/fa/plus';

import { MAIN_COLORS } from '../../common/css';
import { ITask, IBoard } from '../common/interfaces';

const BoardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 16px;
    width: 350px;
`;

const TaskContainer = styled('div')`
    padding: 12px 8px;
`;

const BottomText = styled('div')`
    display: flex;
    border-top: 1px solid ${MAIN_COLORS.grassy};
    justify-content: space-between;
    padding: 8px 8px;
    background: white;
    color: ${MAIN_COLORS.grassy};
`;

const TaskInput = styled('input')`
    border: none;
    border: 1px solid ${MAIN_COLORS.grassy};
`;

interface Props {
    board: IBoard;
    createTask: (title: string) => void;
}
// This component  displays Issues AND adds a Task
// Could split "text adding" ability into own component
// Styling applys here too. (BAsically themes in React)
export class Board extends Component<Props> {
    state = {
        tempTask: null
    };
    // toggleTaskStatus = (id) => {
        // Should the board know how to update a to-do status?
        // Or should it be the main page itself that handles that shizz?
        // Probably whatever is doing the AJAX call for the boards
        // console.log(id);
        // let issues = this.state.board.issues.map( issue => {
        //     if (issue.id === id) {
        //         issue.status = Number(!issue.status);
        //     }
        //     return issue;
        // });
        // this.setState({board: Object.assign({issues}, this.state.board, )});
    // }
    // After refactor, thils would still just manage internal state
    // I think that is good sign of code structure
    // We just take one functionality out and replace it with similar and it still works
    updateInternalTask = (e) => {
        this.setState({tempTask: e.target.value});
    }
    handleKey = ({charCode}) => {
        if (charCode === 13) {
            this.props.createTask(this.state.tempTask);
            this.setState({tempTask: null});
        }
    }
    render() {
        const { tempTask } = this.state;
        const { children } = this.props;
        const newChildren = React.Children.map(children, (child: React.ReactElement<any>) => {
            return React.cloneElement(child, {boardID: this.props.board.ID});
        });
        return (
            <BoardContainer>
                <TaskContainer>
                    {newChildren}
                </TaskContainer>
                { tempTask === null
                    // Task adder handles the escape stuff internally
                    // Leaves this stuff with tempTask for us here
                    // Terrible name foro variable -> TaskAdder
                    // Bottom text could be btetter in case of reuse
                    ? <BottomText onClick={() => this.setState({tempTask: ''})}>
                        <h3>Create Task</h3>
                        <FaPlus/>
                    </BottomText>
                    : <TaskInput value={tempTask} onKeyPress={this.handleKey} onChange={this.updateInternalTask}/>
                }
            </BoardContainer>
        );
    }
}
