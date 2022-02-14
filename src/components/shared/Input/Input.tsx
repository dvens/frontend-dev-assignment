import { FunctionComponent } from 'react';
import { VisuallyHidden } from '../VisuallyHidden';

import styles from './Input.module.css';

export interface InputProps {
    label: string;
    type?: string;
    id: string;
    labelId: string;
    placeholder: string;
    srOnly?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    ariaAutocomplete?: 'none' | 'inline' | 'list' | 'both';
    ariaControls?: string;
    ariaLabelledby?: string;
}

export const Input: FunctionComponent<InputProps> = ({
    label,
    type = 'input',
    srOnly = false,
    id,
    labelId,
    placeholder,
    onBlur,
    onChange,
    onFocus,
    ariaAutocomplete,
    ariaControls,
    ariaLabelledby,
    autoComplete,
}) => (
    <>
        {srOnly ? (
            <VisuallyHidden>
                <label htmlFor={id} id={labelId}>
                    {label}
                </label>
            </VisuallyHidden>
        ) : (
            <label htmlFor={id} id={labelId}>
                {label}
            </label>
        )}
        <input
            className={styles.Input}
            id={id}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            aria-autocomplete={ariaAutocomplete}
            aria-controls={ariaControls}
            aria-labelledby={ariaLabelledby}
            autoComplete={autoComplete}
        />
    </>
);
