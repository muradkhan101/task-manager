import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { MAIN_FONTS } from '@app/common';

const darkHover = props => css({
    backgroundColor: props.theme.backgroundColor || '#d0d0d0',
})

const hover = props => css({
    ':hover': darkHover(props)
});

const textArea = props => css`
    border-radius: 4px;
    width: 100%;
    padding: 8px 12px;
    font-size: ${(props.theme && props.theme.fontSize) || '14px'};
    font-family: ${(props.theme && props.theme.fontFamily) || MAIN_FONTS};
    color: ${(props.theme && props.theme.color) || '#313131'};
`;

const Wrapper = styled('div')`
    ${textArea};
    ${hover};
`;
const Input = styled('input')`
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    font-weight: inherit;
    padding: 8px 12px;
    width: 100%;
    border: none;
    &:focus {
        outline: 2px solid #4286f4;
        box-shadow: 0px 2px 1px rgba(50,50,50,0.2);
    }
`

interface Props {
    text: string;
    theme?: {
        fontSize: string;
        fontFamily: string;
        color: string;
    };
    submit: (text: string) => void
}
export class TextToInput extends React.Component<Props> {
    state = {
        editing: false,
        // Maybe move state for text out of this component (make it controlled)
        text: this.props.text
    };
    inputRef;
    componentDidMount() {
        // Add key listener
        // this.inputRef = React.createRef();
        document.addEventListener('keydown', this.pageListener);
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
            this.props.submit(this.state.text);
        }
    }
    updateText = (e) => {
        this.setState({ text: e.target.value });
    }
    showInput = (event) => {
        this.setState({editing: true});
    }
    render() {
        let { editing, text } = this.state;
        return (
            !editing
                ? <Wrapper onClick={this.showInput}> {this.props.children} </Wrapper>
                : <h1><Input innerRef={this.setRef} value={text} onChange={this.updateText} onKeyPress={this.handleKey} /></h1>
        )
    }
}
