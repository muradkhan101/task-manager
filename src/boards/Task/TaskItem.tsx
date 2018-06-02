import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import BlankCheckbox from 'react-icons/lib/md/check-box-outline-blank';
import Checkbox from 'react-icons/lib/md/check-box';


import { ALT_FONTS, MAIN_COLORS, ALT_COLORS } from '../../common/css';
import { truncate } from '../../common';
import { ITask, TaskStatus } from '../common/interfaces';

const Task = styled('div')`
    display: flex;
    justify-content: space-between;
    padding: 12px 8px;
    border-bottom: 2px solid ${ALT_COLORS.border};
`;

interface Props extends ITask {
    click: (id: number) => any;
}
export class TaskItem extends PureComponent<Props> {
    render() {
        const { title, description, dueDate, status, id, click } = this.props;
        return (
            <Task>
                <div>
                    <h3>{title}</h3>
                    <p> {truncate(description, 20)} </p>
                    <span>{dueDate}</span>
                </div>
                <div onClick={() => click(id)}>
                    {status === TaskStatus.DONE ? <Checkbox/> : <BlankCheckbox/> }
                </div>
            </Task>
        );
    }
}
