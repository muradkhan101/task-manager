import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { http } from '@app/common';

import { GetAllUserInfo$ } from './store/actions';
import { Board } from '@app/board/Board';
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
        return (
            <div>
                {boards.map(board => <Board board={board} createTask={this.createTask} />) }
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