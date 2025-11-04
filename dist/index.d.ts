import * as react_jsx_runtime from 'react/jsx-runtime';

interface CounterInterface {
    min?: number;
    max?: number;
    onIncrease?: (newValue: number) => void;
    onDecrease?: (newValue: number) => void;
    size?: 'small' | 'medium' | 'large';
    iconColor?: string;
    buttonColor?: string;
    textColor?: string;
}
declare const Counter: (props: CounterInterface) => react_jsx_runtime.JSX.Element;

export { Counter as default };
