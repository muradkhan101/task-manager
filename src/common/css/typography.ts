import { css } from 'react-emotion';

export type IFontWeights = 'thin' | 'regular' | 'bold' | 'black';
export type IFontSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface IFontTheme {
    fontSize?: IFontSizes;
    fontFamily?: string;
    fontWeight?: IFontWeights;
    color?: string;
}

export const fontTheme = props => css`
    font-family: ${(props.theme && props.theme.fontFamily) || MAIN_FONTS};
    font-size: ${FONT_SIZE[props.theme.fontSize] || '14px'};
    font-weight: ${FONT_WEIGHT[props.theme.fontWeight] || '400'};
`;

export const MAIN_FONTS = `-apple-system,BlinkMacSystemFont,Helvetica,"Segoe UI",Arial,sans-serif`;
export const ALT_FONTS = `Cabin,"Century Gothic","Roboto",Helvetica,sans-serif`;
export const FONT_SIZE = {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '36px'
};
export const FONT_WEIGHT = {
    thin: 300,
    regular: 400,
    bold: 600,
    black: 700
};
