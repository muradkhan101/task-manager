import React, { Component } from 'react';
import styled from 'react-emotion';
import {
    ic_check_box_outline_blank as BlankCheckbox,
    ic_check_box as Checkbox
} from 'react-icons-kit/md';

import { ALT_FONTS, MAIN_COLORS, ALT_COLORS } from '../common/css';

const Task = styled.div`
    display: flex;
    justify-content: space-apart;
    padding: 12px 8px;
    border-bottom: 2px solid ${ALT_COLORS.border};
`;

export enum TaskStatus { DONE, IN_PROGRESS }

interface Props {
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}
export class TaskItem extends Component<Props> {
    render() {
        const { title, description, dueDate, status } = this.props;
        return (
            <Task>
                <div>
                    <h1>{title}</h1>
                    <p> {description.slice(0, 8) + '...'} </p>
                    <span>{dueDate}</span>
                </div>
                <div>
                    {status === TaskStatus.DONE ? <Checkbox/> : <BlankCheckbox/> }
                </div>
            </Task>
        );
    }
}
