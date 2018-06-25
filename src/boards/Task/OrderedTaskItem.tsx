import React, { PureComponent } from 'react';
import { ITask } from '../common/interfaces';
import { TaskItem } from './TaskItem';
import { ItemTypes } from '../dragDrop';
import {
    DragElementWrapper,
    DropTarget,
    DragSource,
    DropTargetConnector,
    DropTargetMonitor,
    ConnectDropTarget,
    DragSourceMonitor,
    DragSourceConnector
} from 'react-dnd';

const taskSource = {
    beginDrag(props: Props) {
        return { taskId: props.task.ID, boardId: props.boardId, type: ItemTypes.TASK, index: props.index };
    },
    isDragging(props: Props, monitor: DragSourceMonitor) {
        return props.task.ID === monitor.getItem().taskId;
    }
};

function collectDrag(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

const taskTarget = {
    drop(props: Props, monitor: DropTargetMonitor, component) {
        let dragItem = monitor.getItem();
        if (props.boardId === dragItem.boardId) {
            let newOrder = props.reorderTasks(dragItem.index, props.index).map(item => item.ID);
            props.dispatchTaskOrder(newOrder);
        }
    },
    canDrop(props: Props, monitor: DropTargetMonitor) {
        let dragItem = monitor.getItem();
        return props.boardId === dragItem.boardId;
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface Props {
    index: number;
    boardId: number;
    task: ITask;
    click: (id: number) => void;
    reorderTasks: (oldPos: number, newPost: number) => Array<any>;
    dispatchTaskOrder: (order: Array<number>) => void;
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: DragElementWrapper<any>;
    draggingOver?: boolean;
}

@DropTarget(ItemTypes.TASK, taskTarget, collect)
@DragSource(ItemTypes.TASK, taskSource, collectDrag)
export class OrderedTaskItem extends React.Component<Props> {
    render() {
        const { index, task, click, connectDropTarget, connectDragSource } = this.props;
        return connectDragSource(connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}>
                <TaskItem
                    click={click}
                    {...task} />
            </div>
        ));
    }
}
