import React, { Component } from 'react';
import styled from 'react-emotion';
import FaPlus from 'react-icons/lib/fa/plus';
import { TextToInput } from './TextToInput';
import { MAIN_COLORS } from '../../common/css';
import { ITask, IBoard } from '../common/interfaces';

const colors = {
    light: [
        '#d9e6fc',
        '#dbffe1',
        '#fff0ce',
        '#fcdeec',
        '#f8ddff',
        '#dfdbff',
    ],
    dark: [
        '#1c68ea',
        '#23c43e',
        '#e8ab1e',
        '#dd2c7f',
        '#ae2dce',
        '#4230d1',
    ]
};

const BoardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 2px;
    margin: 12px 16px;
    width: 350px;
    padding: 12px 8px;
`;

const TasksContainer = styled('div')`
`;

const BottomText = styled('div')`
    display: flex;
    border-top: 1px solid ${MAIN_COLORS.grassy};
    justify-content: space-between;
    color: ${MAIN_COLORS.grassy};
    padding: 8px 0;
`;



interface Props {
    board: IBoard;
    theme: 'light' | 'dark';
    createTask: (title: string) => void;
}
export class Board extends Component<Props> {
    render() {
        const { children, createTask, board, theme } = this.props;
        const newChildren = React.Children.map(children, (child: React.ReactElement<any>, i) => {
            return React.cloneElement(child, {
                boardId: this.props.board.ID,
                style: {}
            });
        });
        return (
                <BoardContainer style={{
                    backgroundColor: colors[theme][ board.ID % (colors[theme].length - 1) ]
                    }}>
                    <h2 style={{marginBottom: '8px'}}>{board.Name}</h2>
                    <TasksContainer>
                        {newChildren}
                    </TasksContainer>
                    <TextToInput theme={{fontSize: 'md', fontWeight: 'regular'}} text={''} submit={createTask} >
                        <BottomText onClick={() => this.setState({ tempTask: '' })}>
                            <span>Create Task</span>
                            <FaPlus />
                        </BottomText>
                    </TextToInput>
                </BoardContainer>
        );
    }
}
