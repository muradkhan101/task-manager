import React, { Component } from 'react';
import styled from 'react-emotion';
import FaPlus from 'react-icons/lib/fa/plus';
import { TextToInput } from './TextToInput';
import { MAIN_COLORS } from '../../common/css';
import { ITask, IBoard } from '../common/interfaces';

import { ItemTypes } from '../dragDrop';
import { DragSourceMonitor, DragSourceConnector, DragSource, DragElementWrapper } from 'react-dnd';

const BoardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 16px;
    width: 350px;
`;

const TasksContainer = styled('div')`
    padding: 12px 8px;
`;

const BottomText = styled('div')`
    display: flex;
    border-top: 1px solid ${MAIN_COLORS.grassy};
    justify-content: space-between;
    padding: 8px 8px;
    background: white;
    color: ${MAIN_COLORS.grassy};
`;

const taskSource = {
    beginDrag(props: Props) {
        return { boardId: props.board.ID, type: ItemTypes.BOARD };
    },
    endDrag(props: Props, monitor: DragSourceMonitor, component: Board) {
        let dropResult = monitor.getDropResult();
        if (dropResult) {
            console.log('THIS ITEM', { boardId: props.board.ID });
            console.log('DROP RESULT', dropResult);
            // Do dispatch
        }
    },
    isDragging(props: Props, monitor: DragSourceMonitor) {
        return props.board.ID === monitor.getItem().boardId;
    }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

interface Props {
    board: IBoard;
    createTask: (title: string) => void;
    connectDragSource?: DragElementWrapper<any>;
}
// This component  displays Issues AND adds a Task
// Could split "text adding" ability into own component
// Styling applys here too. (BAsically themes in React)
@DragSource(ItemTypes.BOARD, taskSource, collect)
export class Board extends Component<Props> {
    state = {
        tempTask: null
    };
    // toggleTaskStatus = (id) => {
        // Should the board know how to update a to-do status?
        // Or should it be the main page itself that handles that shizz?
        // Probably whatever is doing the AJAX call for the boards
        // console.log(id);
        // let issues = this.state.board.issues.map( issue => {
        //     if (issue.id === id) {
        //         issue.status = Number(!issue.status);
        //     }
        //     return issue;
        // });
        // this.setState({board: Object.assign({issues}, this.state.board, )});
    // }
    // After refactor, thils would still just manage internal state
    // I think that is good sign of code structure
    // We just take one functionality out and replace it with similar and it still works
    updateInternalTask = (e) => {
        this.setState({tempTask: e.target.value});
    }
    // handleKey = ({charCode}) => {
    //     if (charCode === 13) {
    //         this.props.createTask(this.state.tempTask);
    //         this.setState({tempTask: null});
    //     }
    // }
    submit = (text) => {
        this.props.createTask(text);
    }
    render() {
        const { tempTask } = this.state;
        const { children, connectDragSource } = this.props;
        const newChildren = React.Children.map(children, (child: React.ReactElement<any>) => {
            return React.cloneElement(child, {boardId: this.props.board.ID});
        });
        return connectDragSource(
            <div>
                <BoardContainer>
                    <TasksContainer>
                        {newChildren}
                    </TasksContainer>
                    {<TextToInput text={''} submit={this.submit} >
                        {/* <BottomText onClick={() => this.setState({ tempTask: '' })}>
                            <h3>Create Task</h3>
                            <FaPlus />
                        </BottomText> */}
                    </TextToInput>
                    }
                </BoardContainer>
            </div>
        );
    }
}
