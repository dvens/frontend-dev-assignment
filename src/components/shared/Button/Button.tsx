import { FunctionComponent } from 'react';
import { classNames } from '../../../utils/classNames';

import style from './Button.module.css';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    isHidden?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type = 'button',
    isHidden = false,
}) => (
    <button type={type} className={classNames(style.Button, { [style.ButtonIsHidden]: isHidden })}>
        {children}
    </button>
);
