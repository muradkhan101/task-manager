import React from 'react';
import { Dispatch } from 'redux';
import { connect as Connect } from 'react-redux';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';
import { UpdateTaskOrder$ } from '../store/actions';
import { OrderedTaskItem } from '../Task/OrderedTaskItem';
import { AddTask$, UpdateTask$ } from '../Task/store';
import { Theme } from '@app/common';

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
import { StoreState } from '../store/storeConfig';

const taskSource = {
    beginDrag(props: Props) {
        return { boardId: props.board.ID, type: ItemTypes.BOARD, index: props.index };
    },
    endDrag(props: Props, monitor: DragSourceMonitor, component: BoardContainerComponent) {
        let dropResult = monitor.getDropResult();
        if (dropResult) {
            let orderedArray = props.reorderBoards(props.index, dropResult.index);
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

interface ReduxProps {
    issues: Array<ITask>;
    userId: number;
    dispatch: Dispatch<any>;
    theme: Theme;
}

interface Props {
    board: IBoard;
    index: number;
    reorderBoards: (oldPos: number, newPost: number) => void;
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: DragElementWrapper<any>;
}
// This will handle create, update, delete, etc
// Could split echo of those functionalities out into a decorator or something
// Composeable CRUD
@DragSource(ItemTypes.BOARD, taskSource, collectDrag)
@DropTarget([ItemTypes.BOARD, ItemTypes.TASK], taskTarget, collect)
class BoardContainerComponent extends React.Component<Props & ReduxProps> {
    createTask = (Title) => {
        let task: ITask = {
            ID: -1,
            Description: '',
            CreateDate: (new Date()).toISOString(),
            Status: 0,
            Board: this.props.board.ID,
            Name: Title,
            CreatedBy: this.props.userId,
            Owner: this.props.userId
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
        function findItem<T>(boardList: Array<T>, param: string) {
            return (ID: number) => boardList.filter(board => board[param] === ID)[0];
        }
        const { board, issues, connectDropTarget, connectDragSource, theme } = this.props;

        let orderedTaskArray = board.TaskOrder.map(findItem<ITask>(issues, 'ID')).filter(j => j);
        orderedTaskArray = orderedTaskArray.concat(
            issues.filter(issue => !issues.map(iss => iss.ID).includes(issue.ID))
        );

        // TEMP HACK TO GET AROUND PROPS BOARD ARRAY BEING DIFFERENT FROM RENDERED (causes issues with reordering)
        issues.splice(0);
        orderedTaskArray.forEach(item => issues.push(item));

        return connectDragSource(connectDropTarget(
            <div style={{
                height: '100%',
                position: 'relative'
            }}>
                <Board board={board} createTask={this.createTask} theme={theme}>
                    {/* Can the filter be removed without passing unnecessary-to-render data (boardID)
                    and doing something like passing a function that renders the data whenn it needs it */}
                    {orderedTaskArray.map((issue, i) =>
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

const mapStateToProps = (state: StoreState, ownProps: Props) => ({
   issues: state.tasks.filter(task => task.Board === ownProps.board.ID),
   userId: state.user.ID,
   theme: state.user.theme,
   ...ownProps
});

export const BoardContainer = Connect(
    mapStateToProps
)(BoardContainerComponent as any);
