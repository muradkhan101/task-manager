import React from 'react';
import styled from 'react-emotion';
import { http } from '@app/common';

import { GetAllUserInfo$ } from '@app/board/store';
import { Dispatch } from 'redux';
import { BoardContainer } from '@app/board/BoardContainer';
import { ITask, IBoard } from './common/interfaces';

interface Props {
    dispatch: Dispatch<any>; // think about better spot to put state interface
    tasks: Array<ITask>;
    boards: Array<IBoard>;
}
export class DashboardContainer extends React.Component<Props> {
    state = {
        user: { ID: 1 }
    }
    componentWillMount() {
        // Need to split into two API calls
        this.props.dispatch(new GetAllUserInfo$(this.state.user.ID));
        // Dispatch action to get everything
        // Need to make user object (login / registering) to save date for get all
    }
    render() {
        // render boards;
        return null;
    }
}
