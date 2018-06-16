import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import BlankCheckbox from 'react-icons/lib/md/check-box-outline-blank';
import Checkbox from 'react-icons/lib/md/check-box';


import { ALT_COLORS } from '../../common/css';
import { truncate } from '@app/common';
import { ITask, TaskStatus } from '../common/interfaces';

import { ItemTypes } from '../dragDrop';
import { DragSourceMonitor, DragSourceConnector, DragSource, DragElementWrapper } from 'react-dnd';
const taskSource = {
    beginDrag(props) {
        return { ID: props.ID };
    }
};

function collect(connect: DragSourceConnector , monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const Task = styled('div')`
    display: flex;
    justify-content: space-between;
    padding: 12px 8px;
    border-bottom: 2px solid ${ALT_COLORS.border};
`;

interface Props extends ITask {
    click: (id: number) => any;
    connectDragSource?: DragElementWrapper<any>;
    isDragging?: boolean;
}
// Why are there store files in this directory?
// Move them out if this will just ba pure a component
// Leave them if you want to make more compomnents around this
@DragSource(ItemTypes.TASK, taskSource, collect)
export class TaskItem extends PureComponent<Props> {
    render() {
        const { Name, Description, DueDate, Status, ID, click, connectDragSource } = this.props;
        return connectDragSource(
            // This could be a themed component
            // Pass classes and stuff to it
            // Renders them with tree recursion
            // Explained: Assigns classes by expectation of placements
            <div>
                <Task>
                    <div>
                        <h3>{Name}</h3>
                        <p>{truncate(Description, 20)}</p>
                        <span>{DueDate}</span>
                    </div>
                    <div onClick={() => click(ID)}>
                        {Status === TaskStatus.DONE ? <Checkbox/> : <BlankCheckbox/> }
                    </div>
                </Task>
            </div>
        );
    }
}
