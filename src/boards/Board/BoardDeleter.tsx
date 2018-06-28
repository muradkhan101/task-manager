import React from 'react';
import { ItemTypes } from '../dragDrop';
import TrashCan from 'react-icons/lib/io/trash-b';
import styled from 'react-emotion';

import {
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor,
    ConnectDropTarget,
} from 'react-dnd';
import { ALT_COLORS } from '@app/common';
import { IBoard } from '../common/interfaces';

const Deleter = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 16px;
    width: 64px;
    height: 100%;
    background-color: ${ALT_COLORS.danger};
    color: white;
    font-size: 64px;
`;

const taskTarget = {
    drop(props: Props, monitor: DropTargetMonitor, component: BoardDeleter) {
        let dragItem = monitor.getItem();
        props.handleDrop(dragItem.boardId, 'DELETE');
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface Props {
    connectDropTarget?: ConnectDropTarget;
    handleDrop: (payload: IBoard, type: string) => void;
}
@DropTarget(ItemTypes.BOARD, taskTarget, collect)
export class BoardDeleter extends React.Component<Props> {
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div>
                <Deleter>
                    <TrashCan />
                </Deleter>
            </div>
        );
    }
}
