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
        return { taskId: props.task.ID, boardId: props.boardId, type: ItemTypes.TASK };
    },
    endDrag(props: Props, monitor: DragSourceMonitor, component: OrderedTaskItem) {
        let dropResult = monitor.getDropResult();
        if (dropResult) {
            // console.log('THIS ITEM', { ID: props.task.ID, board: props.boardId, index: props.index });
            // console.log('DROP RESULT', dropResult);
            // Do dispatch
            if (props.boardId === dropResult.boardId) {
                let newOrder = props.reorderTasks(props.index, dropResult.index).map(item => item.ID);
                props.dispatchTaskOrder(newOrder);
            }
        }
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
        // The args for the item being dropped one
        // The return will be passed to the dropEnd
        return { taskId: props.task.ID, boardId: props.boardId, index: props.index };
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
