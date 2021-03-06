import { forwardRef } from 'react';
import { classNames } from '../../../utils/classNames';
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
    ariaAutocomplete?: React.AriaAttributes['aria-autocomplete'];
    ariaControls?: string;
    ariaLabelledby?: string;
    ref?: React.MutableRefObject<any>;
    value?: string;
    extraClasses?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
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
            value,
            extraClasses,
        },
        ref,
    ) => (
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
                className={classNames(styles.Input, extraClasses)}
                id={id}
                type={type}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                aria-autocomplete={ariaAutocomplete}
                value={value}
                aria-controls={ariaControls}
                aria-labelledby={ariaLabelledby}
                autoComplete={autoComplete}
                ref={ref}
            />
        </>
    ),
);
