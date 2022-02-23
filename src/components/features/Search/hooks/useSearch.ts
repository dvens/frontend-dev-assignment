import { useReducer } from 'react';
import { Suggestions } from '../../../../services/suggestions';

// Create re-usable constants for types and switch values instead of using an const.
enum Actions {
    SET_SEARCH_ITEMS = 'SET_SEARCH_ITEMS',
    RESET_SEARCH = 'RESET_SEARCH',
    SET_ACTIVE_SEARCH_INDEX = 'SET_ACTIVE_SEARCH_INDEX',
    SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
    SET_SEARCH_EXPANDED = 'SET_SEARCH_EXPANDED',
    SET_ACTIVE_SEARCH_ITEM = 'SET_ACTIVE_SEARCH_ITEM',
}
interface SearchState {
    isExpanded: boolean;
    selectedIndex: number;
    items: Suggestions;
    searchValue: string;
}

type ARROW_KEYS = 'UP' | 'DOWN';

type SearchAction =
    | { type: Actions.SET_SEARCH_ITEMS; items: Suggestions }
    | { type: Actions.SET_ACTIVE_SEARCH_ITEM; value: string }
    | { type: Actions.RESET_SEARCH; value?: string }
    | { type: Actions.SET_ACTIVE_SEARCH_INDEX; value: number }
    | { type: Actions.SET_SEARCH_VALUE; value: string }
    | { type: Actions.SET_SEARCH_EXPANDED; active: boolean };

const useSearchReducer = (state: SearchState, action: SearchAction): SearchState => {
    switch (action.type) {
        case Actions.SET_ACTIVE_SEARCH_INDEX: {
            return {
                ...state,
                selectedIndex: action.value,
            };
        }
        case Actions.SET_ACTIVE_SEARCH_ITEM: {
            return {
                ...state,
                searchValue: action.value,
                items: state.items.filter((item) => item.searchterm === action.value),
                selectedIndex: 0,
                isExpanded: false,
            };
        }
        case Actions.SET_SEARCH_EXPANDED: {
            return {
                ...state,
                isExpanded: action.active,
            };
        }
        case Actions.SET_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: action.value,
            };
        }
        case Actions.SET_SEARCH_ITEMS: {
            return {
                ...state,
                items: action.items,
                isExpanded: action.items.length > 0,
                selectedIndex: -1,
            };
        }
        case Actions.RESET_SEARCH: {
            return {
                searchValue: action.value || '',
                isExpanded: false,
                items: [],
                selectedIndex: -1,
            };
        }
    }
};

export const useSearch = () => {
    const [state, dispatch] = useReducer(useSearchReducer, {
        isExpanded: false,
        selectedIndex: 0,
        items: [],
        searchValue: '',
    });

    const setSearchItems = (items: Suggestions) =>
        dispatch({ type: Actions.SET_SEARCH_ITEMS, items });

    const resetSearch = (value?: string) => dispatch({ type: Actions.RESET_SEARCH, value });

    const setSearchValue = (value: string) => dispatch({ type: Actions.SET_SEARCH_VALUE, value });

    const setSearchExpanded = (active: boolean) =>
        dispatch({ type: Actions.SET_SEARCH_EXPANDED, active });

    const setActiveSearchItem = (value: string) =>
        dispatch({ type: Actions.SET_ACTIVE_SEARCH_ITEM, value });

    const setActiveSearchIndex = (value: ARROW_KEYS) => {
        const currentAmountOfItems = state.items.length;
        let selectedIndex = state.selectedIndex;

        switch (value) {
            case 'DOWN': {
                if (selectedIndex === -1 || selectedIndex >= currentAmountOfItems - 1) {
                    selectedIndex = 0;
                } else {
                    selectedIndex++;
                }
                break;
            }
            case 'UP': {
                if (selectedIndex <= 0) {
                    selectedIndex = currentAmountOfItems - 1;
                } else {
                    selectedIndex--;
                }
                break;
            }
        }

        dispatch({ type: Actions.SET_ACTIVE_SEARCH_INDEX, value: selectedIndex });
    };

    return {
        state,
        setSearchItems,
        resetSearch,
        setSearchValue,
        setSearchExpanded,
        setActiveSearchItem,
        setActiveSearchIndex,
    };
};
