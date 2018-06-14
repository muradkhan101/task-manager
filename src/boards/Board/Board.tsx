import React, { Component } from 'react';
import styled from 'react-emotion';
import FaPlus from 'react-icons/lib/fa/plus';
import { TextToInput } from './TextToInput';
import { MAIN_COLORS } from '../../common/css';
import { ITask, IBoard } from '../common/interfaces';

const BoardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 350px;
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
    border: 1px solid ${MAIN_COLORS.grassy};
`;

interface Props {
    board: IBoard;
    createTask: (title: string) => void;
}
export class Board extends Component<Props> {
    state = {
        tempTask: null
    };
    toggleTaskStatus = (id) => {
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
    }
    updateTask = (e) => {
        this.setState({tempTask: e.target.value});
    }
    // handleKey = ({charCode}) => {
    //     if (charCode === 13) {
    //         this.props.createTask(this.state.tempTask);
    //         this.setState({tempTask: null});
    //     }
    // }
    submit = (text) => {
        this.props.createTask(text);
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
                {<TextToInput text={''} submit={this.submit} >
                    <TaskAdder onClick={() => this.setState({ tempTask: '' })}>
                        <h3>Create Task</h3>
                        <FaPlus />
                    </TaskAdder>
                </TextToInput>
                }
            </BoardContainer>
        );
    }
}
