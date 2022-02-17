import { FunctionComponent } from 'react';
import { classNames } from '../../../utils/classNames';

import style from './Button.module.css';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    isHidden?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    testId?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type = 'button',
    isHidden = false,
    onClick,
    testId,
}) => (
    <button
        type={type}
        className={classNames(style.Button, { [style.ButtonIsHidden]: isHidden })}
        onClick={onClick}
        data-testid={testId}>
        {children}
    </button>
);
