import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'react-emotion';

import { GetAllUserInfo$, UpdateBoardOrder$, StartDragBoard, EndDrag,  } from './store/actions';
import { StoreState } from './store/storeConfig';
import { CreateBoard$, RemoveBoard$ } from './Board/store/actions';
import { TextToInput } from './Board/TextToInput';

import { BoardContainer } from '@app/board/BoardContainer';
import { ITask, IBoard } from './common/interfaces';
import { User } from '../common/helpers';
import { StorageHelper, Theme } from '@app/common';
import { BoardDeleter } from './Board/BoardDeleter';

const Boards = styled('div')`
    display: flex;
`;

interface Props {
    boards: Array<IBoard>;
    theme: Theme;
    user: User;
    dispatch: Dispatch<any>;
    drag: any;
}
@DragDropContext(HTML5Backend)
export class DashboardContainerComponent extends React.Component<Props> {
    state = {
        user: StorageHelper.get('user'),
        orderedBoards: [],
    };
    componentWillMount() {
        this.props.dispatch(new GetAllUserInfo$(this.state.user.ID));
    }
    componentWillReceiveProps(nextProps: Readonly<Props>) {
        function findItem<T>(boardList: Array<T>, param: string) {
            return (ID: number) => boardList.filter(board => board[param] === ID)[0];
        }

        let { boards, user } = nextProps;

        let orderedBoards = Array.isArray(user.BoardOrder)
            ? user.BoardOrder.map(findItem<IBoard>(boards, 'ID')).filter(i => i)
            : [];
        orderedBoards = orderedBoards.concat(
            boards.filter(board => !orderedBoards.map(brd => brd.ID).includes(board.ID))
        ).filter((item, i, arr) => arr.map(b => b.ID).indexOf(item.ID) === i);
        this.setState({orderedBoards});
    }
    createBoard = (title: string) => {
        let board: IBoard = {
            ID: -1,
            CreateDate: new Date().toISOString(),
            CreatedBy: this.state.user.ID,
            Issues: [],
            Name: title,
            Owner: this.state.user.ID,
            TaskOrder: [],
        };
        this.props.dispatch(new CreateBoard$(board));
    }
    handleBoardDrag = (payload: IBoard | number, type: string) => {
        switch (type) {
            case ('START'): {
                this.props.dispatch(
                    new StartDragBoard(payload as IBoard)
                );
                break;
            }
            case ('DELETE'): {
                this.props.dispatch(
                    new RemoveBoard$(payload as number)
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
    reorderBoards = (oldPos: number, newPos: number) => {
        // let tasks = this.props.issues.filter(task => task.Board === this.props.board.ID);
        const boards = this.state.orderedBoards.slice();
        let itemToMove = boards.splice(oldPos, 1)[0];
        let newArr = [
            ...boards.slice(0, newPos),
            itemToMove,
            ...boards.slice(newPos)
        ];
        this.setState({boardOrder: newArr});
        this.props.dispatch(
            new UpdateBoardOrder$(this.props.user.ID, newArr.map(item => item.ID))
        );
    }
    render() {
        let { drag } = this.props;
        let { orderedBoards } = this.state;
        return (
            <Boards>
                {drag.type === 'board' ? <BoardDeleter handleDrop={this.handleBoardDrag}/> : null}
                {orderedBoards.map((board, i) => {
                return <BoardContainer
                    board={board}
                    index={i}
                    handleBoardDrag={this.handleBoardDrag}
                    reorderBoards={this.reorderBoards}
                    key={board.ID} />;
                })
            }
            <TextToInput theme={{
                fontSize: 'lg',
                fontWeight: 'bold'
            }} submit={this.createBoard} text={''}>
                Create a board
            </TextToInput>
            {drag.type === 'board' ? <BoardDeleter handleDrop={this.handleBoardDrag} /> : null}
            </Boards>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    boards: state.boards,
    user: state.user,
    theme: state.user.theme,
    drag: state.drag,
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
