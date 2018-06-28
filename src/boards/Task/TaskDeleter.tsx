import React from 'react';
import { ItemTypes } from '../dragDrop';
import TrashCan from 'react-icons/lib/io/trash-a';
import styled from 'react-emotion';

import {
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor,
    ConnectDropTarget,
} from 'react-dnd';
import { ALT_COLORS } from '@app/common';

const Deleter = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: calc(100% - 32px);
    margin: 0 auto;
    height: 60px;
    background-color: ${ALT_COLORS.danger};
    color: white;
    font-size: 32px;
`;

const taskTarget = {
    drop(props: Props, monitor: DropTargetMonitor, component: TaskDeleter) {
        let dragItem = monitor.getItem();
        props.handleDrop(dragItem.taskId, 'DELETE');
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface Props {
    connectDropTarget?: ConnectDropTarget;
    handleDrop: (taskId: number, type: string) => void;
}
@DropTarget(ItemTypes.TASK, taskTarget, collect)
export class TaskDeleter extends React.Component<Props> {
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div>
                <Deleter>
                    <TrashCan />
                </Deleter>
            </div>
        );
    }
}
