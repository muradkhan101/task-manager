import React from 'react';
import { Dispatch } from 'redux';
import { connect as Connect } from 'react-redux';

import { Board } from './Board';
import { IBoard, ITask } from '../common/interfaces';
import { UpdateTaskOrder$, StartDragTask, EndDrag, StartDragBoard } from '../store/actions';
import { OrderedTaskItem } from '../Task/OrderedTaskItem';
import { AddTask$, UpdateTask$, RemoveTask$ } from '../Task/store';
import { Theme } from '@app/common';
import { TaskDeleter } from '@app/task/TaskDeleter';
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
        props.handleBoardDrag(props.board, 'START');
        return { boardId: props.board.ID, type: ItemTypes.BOARD, index: props.index };
    },
    endDrag(props: Props, monitor: DragSourceMonitor, component: BoardContainerComponent) {
        props.handleBoardDrag(null, 'DROP');
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
        let dragItem = monitor.getItem();
        props.reorderBoards(dragItem.index, props.index);
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
    drag: any;
}

interface Props {
    board: IBoard;
    index: number;
    handleBoardDrag: (payload: IBoard, type: string) => void;
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
    state = {
        orderedTasks: []
    };
    componentWillReceiveProps(nextProps: Readonly<Props & ReduxProps>) {
        function findItem<T>(boardList: Array<T>, param: string) {
            return (ID: number) => boardList.filter(board => board[param] === ID)[0];
        }
        const { board, issues } = nextProps;
        let orderedTasks = board.TaskOrder.map(findItem<ITask>(issues, 'ID')).filter(j => j);
        orderedTasks = orderedTasks.concat(
            issues.filter(issue => !orderedTasks.map(iss => iss.ID).includes(issue.ID))
        );
        this.setState({ orderedTasks });
    }
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
        let tasks = this.state.orderedTasks;
        let itemToMove = tasks.splice(oldPos, 1)[0];
        let orderedTasks = [
            ...tasks.slice(0, newPos),
            itemToMove,
            ...tasks.slice(newPos)
        ];
        this.setState({orderedTasks});
        return orderedTasks;
    }
    handleTaskDrag = (payload: number | Array<number> | ITask, type: string) => {
        switch (type) {
            case ('START'): {
                let task: ITask = this.state.orderedTasks.filter(t => t.ID === payload)[0];
                if (task) {
                    this.props.dispatch(new StartDragTask(task, task.Board));
                }
                break;
            }
            case ('REORDER'): {
                this.props.dispatch(
                    new UpdateTaskOrder$(this.props.board.ID, payload)
                );
                this.props.dispatch(
                    new EndDrag()
                );
                break;
            }
            case ('DELETE'): {
                this.props.dispatch(
                    new RemoveTask$(payload as number)
                );
            }
            case ('DROP'): {
                this.props.dispatch(
                    new EndDrag()
                );
                break;
            }
        }
    }
    render() {
        const { board, connectDropTarget, connectDragSource, theme, drag } = this.props;
        const { orderedTasks } = this.state;
        return connectDragSource(connectDropTarget(
            <div style={{
                height: '100%',
                position: 'relative'
            }}>
                <Board board={board} createTask={this.createTask} theme={theme}>
                    {orderedTasks.map((issue, i) =>
                            <OrderedTaskItem
                                key={issue.ID}
                                boardId={board.ID}
                                click={this.toggleTaskStatus}
                                reorderTasks={this.reorderTasks}
                                handleDrag={this.handleTaskDrag}
                                index={i}
                                task={issue} />)
                    }
                </Board>
                {(drag.type === 'task' && drag.boardId === board.ID)
                    ? <TaskDeleter handleDrop={this.handleTaskDrag} />
                    : null}
            </div>
        ));
    }
}

const mapStateToProps = (state: StoreState, ownProps: Props) => ({
    issues: state.tasks.filter(task => task.Board === ownProps.board.ID),
   userId: state.user.ID,
   theme: state.user.theme,
   drag: state.drag
});

export const BoardContainer = Connect(
    mapStateToProps
)(BoardContainerComponent as any);
