import React, { PureComponent } from 'react';
import { ITask } from '../common/interfaces';
import { TaskItem } from './TaskItem';
import { ItemTypes } from '../dragDrop';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';

const taskTarget = {
    drop(props: Props, monitor: DropTargetMonitor, component) {
        // The args for the item being dropped one
        // The return will be passed to the dropEnd
        console.log(monitor.getItem());
        return { taskId: props.task.ID, boardId: props.boardId, index: props.index };
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
    connectDropTarget?: ConnectDropTarget;
    draggingOver?: boolean;
}

@DropTarget(ItemTypes.TASK, taskTarget, collect)
export class OrderedTaskItem extends React.Component<Props> {
    render() {
        const { index, task, click, connectDropTarget } = this.props;
        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}>
                <TaskItem click={click} {...task} />
            </div>
    );
    }
}
