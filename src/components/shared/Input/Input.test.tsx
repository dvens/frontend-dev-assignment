import { render, screen } from '@testing-library/react';
import { Input, InputProps } from '.';

import userEvent from '@testing-library/user-event';

import styles from '../VisuallyHidden/VisuallyHidden.module.css';

const DEFAULT_INPUT_PROPS: InputProps = {
    label: 'Search for products and pick an option',
    placeholder: 'Zoeken',
    id: 'search-input',
    labelId: 'search-input-label',
};

describe('<Input />', () => {
    test('It should capture the onBlur event', () => {
        const handleOnBlurEvent = jest.fn();

        render(<Input {...DEFAULT_INPUT_PROPS} onBlur={handleOnBlurEvent} />);

        const input = screen.getByPlaceholderText(DEFAULT_INPUT_PROPS.placeholder);

        userEvent.type(input, 'Truien');
        userEvent.click(document.body);

        expect(handleOnBlurEvent).toBeCalled();
    });

    test('It should capture the onChange event', () => {
        const handleOnchangeEvent = jest.fn();

        render(<Input {...DEFAULT_INPUT_PROPS} onChange={handleOnchangeEvent} />);

        const input = screen.getByPlaceholderText(DEFAULT_INPUT_PROPS.placeholder);

        userEvent.type(input, 'Test value');

        expect(handleOnchangeEvent).toBeCalled();
    });

    test('It should capture the onFocus event', () => {
        const handleOnFocus = jest.fn();

        render(<Input {...DEFAULT_INPUT_PROPS} onFocus={handleOnFocus} />);

        const input = screen.getByPlaceholderText(DEFAULT_INPUT_PROPS.placeholder);

        userEvent.click(input);

        expect(handleOnFocus).toBeCalled();
    });

    test('Label should be visually hidden', () => {
        const { container } = render(<Input {...DEFAULT_INPUT_PROPS} srOnly={true} />);
        expect(container.querySelector(`.${styles.VisuallyHidden}`)).toBeInTheDocument();
    });
});
