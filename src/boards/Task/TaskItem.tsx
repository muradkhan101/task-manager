import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import BlankCheckbox from 'react-icons/lib/md/check-box-outline-blank';
import Checkbox from 'react-icons/lib/md/check-box';


import { ALT_FONTS, MAIN_COLORS, ALT_COLORS } from '../../common/css';
import { truncate } from 'common';
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
        const { Name, Description, DueDate, Status, ID, click } = this.props;
        return (
            <Task>
                <div>
                    <h3>{Name}</h3>
                    <p> {truncate(Description, 20)} </p>
                    <span>{DueDate}</span>
                </div>
                <div onClick={() => click(ID)}>
                    {Status === TaskStatus.DONE ? <Checkbox/> : <BlankCheckbox/> }
                </div>
            </Task>
        );
    }
}
