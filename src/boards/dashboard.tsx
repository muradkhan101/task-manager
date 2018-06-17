import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'react-emotion';

import { GetAllUserInfo$ } from './store/actions';
import { StoreState } from './store/storeConfig';
// import { CreateBoard$, UpdateBoard$ } from '../boards/Board/store';
// import { AddTask$, UpdateTask$ } from '../boards/Task/store';

import { BoardContainer } from '@app/board/BoardContainer';
import { ITask, IBoard } from './common/interfaces';

// interface Dispatches {
//     loadInfo: (id: number) => Dispatch<GetAllUserInfo$>; // think about better spot to put state interface
//     taskDispatch: {
//         newTask: (task: ITask) => Dispatch<AddTask$>;
//         updateTask: (task: ITask, updates: any) => Dispatch<UpdateTask$>;
//     };
//     boardDispatch: {
//         newBoard: (board: IBoard) => Dispatch<CreateBoard$>;
//         updateTask: (board: ITask, updates: any) => Dispatch<UpdateBoard$>;
//     };
// }

const Boards = styled('div')`
    display: flex;
`

interface Props {
    tasks: Array<ITask>;
    boards: Array<IBoard>;
    dispatch: Dispatch<any>;
}
@DragDropContext(HTML5Backend)
export class DashboardContainerComponent extends React.Component<Props> {
    state = {
        user: { ID: 1 }
    };
    componentWillMount() {
        // Need to split into two API calls
        this.props.dispatch(new GetAllUserInfo$(this.state.user.ID));
        // Dispatch action to get everything
        // Need to make user object (login / registering) to save date for get all
    }
    createTask = (title: string) => {

    }
    reorderBoards = (oldPos: number, newPos: number) => {
        // let tasks = this.props.issues.filter(task => task.Board === this.props.board.ID);
        const boards = this.props.boards.slice();
        console.log(oldPos, newPos);
        let itemToMove = boards.splice(oldPos, 1)[0];
        console.log(itemToMove);
        let newArr = [
            ...boards.slice(0, newPos),
            itemToMove,
            ...boards.slice(newPos)
        ];
        console.log(newArr);
        return newArr;
    }
    render() {
        let { boards, tasks, dispatch } = this.props;
        console.log(this.props);
        return (
            <Boards>
                {boards.map((board, i) => {
                    let issues = tasks.filter(task => task.Board === board.ID);
                    return <BoardContainer
                        dispatch={dispatch}
                        board={board}
                        issues={issues}
                        index={i}
                        reorderBoards={this.reorderBoards}
                        key={board.ID} />;
                })
            }
            </Boards>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    tasks: state.tasks,
    boards: state.boards,
});

// const mapDispatchToProps = (dispatch) => ({
//     loadInfo: (id: number) => dispatch(new GetAllUserInfo$(id)),
//     taskDispatch: {
//         newTask: (task: ITask) => dispatch(new AddTask$(task)),
//         updateTask: (task: ITask, updates: any) => dispatch(new UpdateTask$(task, updates)),
//     },
//     boardDispatch: {
//         newBoard: (board: IBoard) => dispatch(new CreateBoard$(board)),
//         updateBoard: (board: IBoard, updates: any) => dispatch(new UpdateBoard$(board, updates))
//     },
// })

export const DashboardContainer = connect(
    mapStateToProps,
    // mapDispatchToProps,
)(DashboardContainerComponent as any); // Figure how to work w/o as any