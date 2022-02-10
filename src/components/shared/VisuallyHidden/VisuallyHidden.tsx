import { FunctionComponent } from 'react';

import styles from './VisuallyHidden.module.css';

export const VisuallyHidden: FunctionComponent = ({ children }) => (
    <div className={styles.VisuallyHidden}>{children}</div>
);
