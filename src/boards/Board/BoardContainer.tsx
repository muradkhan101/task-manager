import React from 'react';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';
import { UpdateTaskOrder$ } from '../store/actions';
import { OrderedTaskItem } from '../Task/OrderedTaskItem';
import { Dispatch } from 'redux';
import { AddTask$, UpdateTask$ } from '../Task/store';

import { ItemTypes } from '../dragDrop';
import {
    DragSource,
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor,
    ConnectDropTarget,
    DragSourceConnector,
    DragSourceMonitor,
    DragElementWrapper,
} from 'react-dnd';

const taskSource = {
    beginDrag(props: Props) {
        return { boardId: props.board.ID, type: ItemTypes.BOARD, index: props.index };
    },
    endDrag(props: Props, monitor: DragSourceMonitor, component: BoardContainer) {
        let dropResult = monitor.getDropResult();
        if (dropResult) {
            let orderedArray = props.reorderBoards(props.index, dropResult.index).map(item => item.ID);
            props.updateBoardOrder(orderedArray);
        }
    },
    isDragging(props: Props, monitor: DragSourceMonitor) {
        return props.board.ID === monitor.getItem().boardId;
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
        return { boardId: props.board.ID, index: props.index };
    },
    canDrop(props: Props, monitor: DropTargetMonitor) {
        let dragItem = monitor.getItem();
        // Lets you differentiate between dragging tasks on the same board
        // and dragging tasks between boards
        return (dragItem.boardId !== props.board.ID);
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface Props {
    board: IBoard;
    issues: Array<ITask>;
    dispatch: Dispatch<any>;
    index: number;
    reorderBoards: (oldPos: number, newPost: number) => Array<any>;
    updateBoardOrder: (order: Array<number>) => void;
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: DragElementWrapper<any>;
}
// This will handle create, update, delete, etc
// Could split echo of those functionalities out into a decorator or something
// Composeable CRUD
@DragSource(ItemTypes.BOARD, taskSource, collectDrag)
@DropTarget([ItemTypes.BOARD, ItemTypes.TASK], taskTarget, collect)
export class BoardContainer extends React.PureComponent<Props> {
    createTask = (Title) => {
        let task: ITask = {
            ID: -1,
            Description: '',
            CreateDate: (new Date()).toISOString(),
            Status: 0,
            Board: this.props.board.ID,
            Name: Title,
            CreatedBy: 1,
            Owner: 1
        };
        this.props.dispatch(new AddTask$(task));
    }
    // Whwn task item is passed through this component, this function is allowed to
    // go to the task instance directly without passing through Board
    toggleTaskStatus = (id: number) => {
        let item = this.props.issues.filter(issue => issue.ID === id)[0];
        if (item)
            this.props.dispatch(new UpdateTask$(item, {Status: Number(!item.Status)}));
    }
    reorderTasks = (oldPos: number, newPos: number) => {
        let tasks = this.props.issues.filter(task => task.Board === this.props.board.ID);
        let itemToMove = tasks.splice(oldPos, 1)[0];
        let newArr = [
            ...tasks.slice(0, newPos),
            itemToMove,
            ...tasks.slice(newPos)
        ];
        return newArr;
    }
    dispatchTaskOrder = (order: Array<number>) => {
        this.props.dispatch(
            new UpdateTaskOrder$(this.props.board.ID, order)
        );
    }
    render() {
        const { board, issues, connectDropTarget, connectDragSource } = this.props;
        return connectDragSource(connectDropTarget(
            <div style={{
                height: '100%',
                position: 'relative'
            }}>
                <Board board={board} createTask={this.createTask} >
                    {/* Can the filter be removed without passing unnecessary-to-render data (boardID)
                    and doing something like passing a function that renders the data whenn it needs it */}
                    {issues.filter(issue => issue.Board === board.ID)
                        .map((issue, i) =>
                            <OrderedTaskItem
                                key={issue.ID}
                                boardId={board.ID}
                                click={this.toggleTaskStatus}
                                reorderTasks={this.reorderTasks}
                                dispatchTaskOrder={this.dispatchTaskOrder}
                                index={i}
                                task={issue} />)
                    }
                </Board>
            </div>
        ));
    }
}
