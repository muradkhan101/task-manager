import React from 'react';
import { ItemTypes } from '../dragDrop';

import {
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor,
    ConnectDropTarget,
} from 'react-dnd';

const taskTarget = {
    drop(props: Props, monitor: DropTargetMonitor, component: TaskDeleter) {
        let dragItem = monitor.getItem();
        if (dragItem && dragItem.taskId) {
            props.handleDrop(dragItem.taskId, 'DROP');
        }
    },
    canDrop(props: Props, monitor: DropTargetMonitor) {
        let dragItem = monitor.getItem();
        return props.boardId === dragItem.boardId;
    }
}

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface Props {
    connectDropTarget?: ConnectDropTarget;
    boardId: number;
    handleDrop: (taskId: number, type: string) => void;
}
@DropTarget(ItemTypes.TASK, taskTarget, collect)
export class TaskDeleter extends React.Component<Props> {
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div style={{backgroundColor: 'purple'}}>
            </div>
        );
    }
}