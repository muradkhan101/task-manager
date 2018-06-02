import React, { Component } from 'react';
import styled from 'react-emotion';
import { MdCheckBoxOutlineBlank as BlankCheckbox } from 'react-icons/md/check-box-outline-blank';
import { MdCheckBox as Checkbox } from 'react-icons/md/check-box';


import { ALT_FONTS, MAIN_COLORS, ALT_COLORS } from '../common/css';
import { truncate } from '../common';
import { ITask, TaskStatus } from './common/interfaces';

const Task = styled.div`
    display: flex;
    justify-content: space-apart;
    padding: 12px 8px;
    border-bottom: 2px solid ${ALT_COLORS.border};
`;

interface Props {
    task: ITask;
    click: (id: number) => any;
}
export class TaskItem extends Component<Props> {
    render() {
        const { task, click } = this.props;
        const { title, description, dueDate, status, id } = task;
        return (
            <Task>
                <div>
                    <h1>{title}</h1>
                    <p> {truncate(description, 8)} </p>
                    <span>{dueDate}</span>
                </div>
                <div onClick={() => click(id)}>
                    {status === TaskStatus.DONE ? <Checkbox/> : <BlankCheckbox/> }
                </div>
            </Task>
        );
    }
}
