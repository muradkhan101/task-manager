import React from 'react';
import styled from 'react-emotion';

import { TaskItem } from './TaskItem';
import { ITask } from '../common/interfaces';
interface Props {
    task: ITask;
}
export class TaskItemContainer extends React.Component<Props> {
    toggleTaskStatus = (id) => {
        // Dispatch to store that then makes AJAX
        // Or make AJAX and then update store
        console.log(id);
    }

    render() {
        const { task } = this.props;
        return (
            <TaskItem {...task} click={this.toggleTaskStatus} />
        );
    }
}
