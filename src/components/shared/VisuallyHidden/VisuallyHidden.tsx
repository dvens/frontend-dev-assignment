import { FunctionComponent } from 'react';

import styles from './VisuallyHidden.module.css';

export const VisuallyHidden: FunctionComponent = ({ children }) => (
    <span className={styles.VisuallyHidden}>{children}</span>
);
