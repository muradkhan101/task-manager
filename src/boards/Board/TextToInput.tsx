import React from 'react';
import styled, { css } from 'react-emotion';
import { MAIN_FONTS, fontTheme, IFontTheme } from '@app/common';

const hover = props => css({
    ':hover': { backgroundColor: props.theme.backgroundColor || '#f6f6f6',},
});

const Wrapper = styled('div')`
    margin-top: 8px;
`;

// const textStyles = css`
//     font-size: inherit;
//     font-family: inherit;
//     font-weight: inherit;
//     color: inherit;
// `;
const TextDisplay = styled('div')`
    ${fontTheme};
    ${props => hover(props)};
    border-radius: 4px;
    border-top: 1px solid transparent;
`;

const Input = styled('input')`
    ${fontTheme};
    padding: 8px 12px;
    width: 100%;
    border-radius: 4px;
    border: none;
    &:focus {
        outline: 2px solid rgba(45, 120, 240, 0.5);
        box-shadow: 0px 1px 1px rgba(50,50,50,0.2);
    }
`;

interface Props {
    text: string;
    theme: IFontTheme;
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
        this.setState({ editText: e.target.value });
    }
    showInput = (event) => {
        this.setState({editing: true});
    }
    render() {
        let { editing, editText } = this.state;
        return (
            <Wrapper>
            {
                !editing
                    ? <TextDisplay theme={this.props.theme} onClick={this.showInput}>{this.props.children}</TextDisplay>
                    : <Input theme={this.props.theme} innerRef={this.setRef} value={editText} onChange={this.updateText} onKeyPress={this.handleKey} />
            }
            </Wrapper>
        );
    }
}
