import { render, fireEvent, screen } from '@testing-library/react';

import { Search } from './Search';
import buttonStyles from '../../shared/Button/Button.module.css';

describe('<Search />', () => {
    test('It should show reset button when the input has a value', () => {
        const { container } = render(<Search />);

        const input = screen.getByPlaceholderText('Zoeken');

        fireEvent.change(input, { target: { value: 'Test value' } });

        expect(container.querySelector(`[type="reset"]`)).not.toHaveClass(
            buttonStyles.ButtonIsHidden,
        );
    });

    test('It should not shown reset button when input has no value', () => {
        const { container } = render(<Search />);

        expect(container.querySelector(`[type="reset"]`)).toHaveClass(buttonStyles.ButtonIsHidden);
    });

    test('It should empty input value when reset button is clicked', () => {
        render(<Search />);

        const input = screen.getByPlaceholderText('Zoeken');
        const button = screen.getByTestId('reset');

        fireEvent.change(input, { target: { value: 'Test value' } });
        fireEvent.click(button);

        expect(input).toHaveValue('');
        expect(button).toHaveClass(buttonStyles.ButtonIsHidden);
    });
});
