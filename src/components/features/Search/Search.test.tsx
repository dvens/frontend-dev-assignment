import { render, screen, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { Search } from './Search';

import listboxStyles from '../../shared/Combobox/Combobox.module.css';

describe('<Search />', () => {
    test('It should empty input value when reset button is clicked', () => {
        render(<Search />);

        const input = screen.getByPlaceholderText('Zoeken');
        const button = screen.getByTestId('reset');

        userEvent.type(input, 'Test value');
        userEvent.click(button);

        expect(input).toHaveValue('');
    });

    test('It should hide the results when input onBlur is triggered', async () => {
        jest.useFakeTimers();
        render(<Search />);

        const input = screen.getByPlaceholderText('Zoeken');
        const listbox = screen.getByRole('listbox');
        const combobox = screen.getByRole('combobox');

        userEvent.type(input, 'Truien');

        await act(async () => {
            jest.runOnlyPendingTimers();
        });

        // Trigger onBlur to close listbox and combobox
        userEvent.click(document.body);

        expect(listbox.classList.contains(listboxStyles.ComboboxListisActive)).toBe(false);
        expect(combobox).toHaveAttribute('aria-expanded', 'false');
    });

    test('It should highlight search query in the results', async () => {
        jest.useFakeTimers();
        render(<Search />);

        const input = screen.getByPlaceholderText('Zoeken');

        userEvent.type(input, 'Truien');

        await act(async () => {
            jest.runOnlyPendingTimers();
        });
        const highlightedItems = screen.getAllByTestId('highlighted');

        highlightedItems.forEach((item) => expect(item.textContent).toBe('truien'));
    });

    test.each([
        ['should not', 'less than', 'tr', false],
        ['should', 'more than', 'truien', true],
    ])(
        'It %s show search suggestions when input has %s 2 characters',
        async (key1, key2, searchValue, isExpanded) => {
            jest.useFakeTimers();
            render(<Search />);

            const input = screen.getByPlaceholderText('Zoeken');
            const listbox = screen.getByRole('listbox');
            const combobox = screen.getByRole('combobox');

            userEvent.type(input, searchValue);

            await act(async () => {
                jest.runOnlyPendingTimers();
            });

            expect(listbox.classList.contains(listboxStyles.ComboboxListisActive)).toBe(isExpanded);
            expect(combobox).toHaveAttribute('aria-expanded', `${isExpanded}`);

            expect(listbox.children.length > 0).toBe(isExpanded);
        },
    );
});
