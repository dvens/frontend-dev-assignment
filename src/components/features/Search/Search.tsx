import React, { FormEvent, useRef } from 'react';
import { getSuggestions } from '../../../services/suggestions';
import { debounce } from '../../../utils/debounce';
import { KEY_CODES, useClickOutside, useKeycodes } from '../../../utils/hooks';
import { Button } from '../../shared/Button';
import { ComboboxList, ComboboxListItem } from '../../shared/Combobox';
import { HighlightWords } from '../../shared/HighlightWords';
import { CloseIcon, SearchIcon } from '../../shared/Icons';
import { Input } from '../../shared/Input';
import { VisuallyHidden } from '../../shared/VisuallyHidden';
import { useSearch } from './hooks/useSearch';
import styles from './Search.module.css';

const SEARCH_LABEL = 'search-label';
const SEARCH_LISTBOX = 'search-listbox';

export const Search = () => {
    const {
        state,
        setSearchItems,
        resetSearch,
        setSearchValue,
        setSearchExpanded,
        setActiveSearchItem,
        setActiveSearchIndex,
    } = useSearch();
    const hasItems = state.items.length > 0;
    const inputRef = useRef(null);
    const searchRef = useRef(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Do something here with the submit');
    };

    const inputOnChangeDebounce = debounce(async (value: string) => {
        const data = await getSuggestions(value);
        setSearchItems(data);
    }, 300);

    const inputOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const hasMinCharacters = value.trim().length > 2;

        if (hasMinCharacters) {
            setSearchValue(value);
            inputOnChangeDebounce(value);
        } else {
            resetSearch(value);
        }
    };

    useKeycodes(inputRef, {
        [KEY_CODES.Escape]: () => resetSearch(),
        [KEY_CODES.ArrowDown]: () => setActiveSearchIndex('DOWN'),
        [KEY_CODES.ArrowUp]: () => setActiveSearchIndex('UP'),
        [KEY_CODES.Enter]: () => {
            const activeItem = state.items[state.selectedIndex];

            if (activeItem) {
                setActiveSearchItem(activeItem.searchterm);
            }
        },
    });

    useClickOutside(searchRef, () => setSearchExpanded(false));

    return (
        <div className={styles.Search} ref={searchRef}>
            <form role="search" onSubmit={handleSubmit} onReset={() => resetSearch()}>
                <div
                    role="combobox"
                    aria-expanded={state.isExpanded}
                    aria-haspopup="listbox"
                    aria-owns={SEARCH_LISTBOX}>
                    <Input
                        label="Search for products and pick an option"
                        placeholder="Zoeken"
                        id="search-input"
                        extraClasses={styles.SearchInput}
                        labelId={SEARCH_LABEL}
                        onFocus={() => setSearchExpanded(hasItems)}
                        onChange={inputOnchangeHandler}
                        onBlur={() => setSearchExpanded(false)}
                        ariaAutocomplete="list"
                        ariaControls={SEARCH_LISTBOX}
                        ariaLabelledby={SEARCH_LABEL}
                        srOnly={true}
                        autoComplete="off"
                        ref={inputRef}
                        value={state.searchValue}
                    />
                    <div className={styles.SearchButtonHolder}>
                        <Button type="reset" testId="reset" extraClasses={styles.SearchReset}>
                            <VisuallyHidden>Reset search results</VisuallyHidden>
                            <CloseIcon width={12} height={12} />
                        </Button>
                        <Button type="submit" testId="submit">
                            <VisuallyHidden>Submit search results</VisuallyHidden>
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
                <div className={styles.SearchComboboxWrapper}>
                    <ComboboxList
                        ariaLabelledby={SEARCH_LABEL}
                        id={SEARCH_LISTBOX}
                        isActive={state.isExpanded}>
                        {state.items.map((item, key) => (
                            <ComboboxListItem
                                testId={item.searchterm}
                                key={item.searchterm}
                                selected={state.selectedIndex === key}
                                onClickHandler={() => setActiveSearchItem(item.searchterm)}>
                                <HighlightWords
                                    text={`${item.searchterm} (${item.nrResults})`}
                                    searchValue={state.searchValue}
                                />
                            </ComboboxListItem>
                        ))}
                    </ComboboxList>
                </div>
            </form>
        </div>
    );
};
