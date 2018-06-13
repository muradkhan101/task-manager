import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { http } from '@app/common';

import { GetAllUserInfo$ } from './store/actions';
import { BoardContainer } from '@app/board/BoardContainer';
import { ITask, IBoard } from './common/interfaces';

interface Props {
    dispatch: Dispatch<any>; // think about better spot to put state interface
    tasks: Array<ITask>;
    boards: Array<IBoard>;
}
export class DashboardContainerComponent extends React.Component<Props> {
    state = {
        user: { ID: 1 }
    }
    componentWillMount() {
        // Need to split into two API calls
        this.props.dispatch(new GetAllUserInfo$(this.state.user.ID));
        // Dispatch action to get everything
        // Need to make user object (login / registering) to save date for get all
    }
    createTask = (title: string) => {

    }
    render() {
        let { boards, tasks } = this.props;
        console.log(this.props);
        return (
            <div>
                {boards.map(board => {
                    let issues = tasks.filter(task => task.Board === board.ID);
                    return <BoardContainer board={board} issues={issues} key={board.ID} />;
                })
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        boards: state.boards,
        dispatch: undefined,
    };
};

export const DashboardContainer = connect(
    mapStateToProps
)(DashboardContainerComponent);