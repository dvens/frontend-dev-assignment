import { FunctionComponent } from 'react';
import { classNames } from '../../../utils/classNames';

import styles from './Combobox.module.css';

interface ComboboxListProps {
    ariaLabelledby: string;
    isActive?: boolean;
    id: string;
}

interface ComboboxListItemProps {
    selected?: boolean;
    id: string;
}

export const ComboboxList: FunctionComponent<ComboboxListProps> = ({
    ariaLabelledby,
    id,
    children,
    isActive = false,
}) => (
    <ul
        className={classNames(styles.ComboboxList, { [styles.ComboboxListisActive]: isActive })}
        role="listbox"
        aria-labelledby={ariaLabelledby}
        id={id}>
        {children}
    </ul>
);
export const ComboboxListItem: FunctionComponent<ComboboxListItemProps> = ({
    selected = false,
    id,
    children,
}) => (
    <li className={styles.ComboboxListItem} role="option" aria-selected={selected} id={id}>
        {children}
    </li>
);
