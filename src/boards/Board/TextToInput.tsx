import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { MAIN_FONTS } from '@app/common';

const darkHover = props => css({
    backgroundColor: props.theme.backgroundColor || '#d0d0d0',
});

const hover = props => css({
    ':hover': darkHover(props)
});

const Wrapper = styled('div')`
    border-radius: 4px;
    width: 100%;
    font-family: ${props => (props.theme && props.theme.fontFamily) || MAIN_FONTS};
    font-size: ${props => (props.theme && props.theme.fontSize) || '14px'};
    font-weight: ${props => (props.theme && props.theme.fontWeight) || '400'};
    color: ${props => (props.theme && props.theme.color) || '#313131'};
`;

const textStyles = css`
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
`;
const TextDisplay = styled('div')`
    ${textStyles};
    ${props => hover(props)};
    padding: 8px 12px;
    border-top: 1px solid transparent;
`;

const Input = styled('input')`
    ${textStyles};
    padding: 8px 12px;
    width: 100%;
    border: none;
    &:focus {
        outline: 2px solid #4286f4;
        box-shadow: 0px 1px 1px rgba(50,50,50,0.2);
    }
`


interface Props {
    text: string;
    theme?: {
        fontSize: string;
        fontFamily: string;
        color: string;
    };
    submit: (text: string) => void;
}
export class TextToInput extends React.Component<Props> {
    state = {
        editing: false,
        // Maybe move state for text out of this component (make it controlled)
        editText: this.props.text,
    };
    inputRef;
    componentDidMount() {
        // Add key listener
        // this.inputRef = React.createRef();
        document.addEventListener('keydown', this.pageListener);
        // document.addEventListener('click', this.pageListener);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.pageListener);
    }
    setRef = (element) => {
        element && element.focus();
    }
    pageListener = ({key}) => {
        if (key === 'Escape') this.setState({editing: false});
    }
    handleKey = ({charCode}) => {
        if (charCode === 13) {
            this.setState({ editing: false });
            this.props.submit(this.state.editText);
        }
    }
    updateText = (e) => {
        this.setState({ text: e.target.value });
    }
    showInput = (event) => {
        this.setState({editing: true});
    }
    render() {
        let { editing, editText } = this.state;
        let { text } = this.props;
        return (
            <Wrapper>
                {
                    !editing
                        ? <TextDisplay onClick={this.showInput}>{text}</TextDisplay>
                        : <Input innerRef={this.setRef} value={editText} onChange={this.updateText} onKeyPress={this.handleKey} />
                }
            </Wrapper>
        );
    }
}
