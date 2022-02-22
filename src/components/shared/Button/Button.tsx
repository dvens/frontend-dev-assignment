import { FunctionComponent } from 'react';
import { classNames } from '../../../utils/classNames';

import style from './Button.module.css';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    testId?: string;
    extraClasses?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type = 'button',
    testId,
    extraClasses,
}) => (
    <button type={type} className={classNames(style.Button, extraClasses)} data-testid={testId}>
        {children}
    </button>
);
