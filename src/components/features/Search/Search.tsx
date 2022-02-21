import { FormEvent, useRef, useState } from 'react';
import { getSuggestions } from '../../../services/suggestions';
import { debounce } from '../../../utils/debounce';
import { KEY_CODES, useKeycodes } from '../../../utils/hooks';
import { Button } from '../../shared/Button';
import { CloseIcon, SearchIcon } from '../../shared/Icons';
import { Input } from '../../shared/Input';
import { VisuallyHidden } from '../../shared/VisuallyHidden';
import styles from './Search.module.css';

const SEARCH_LABEL = 'search-label';
const SEARCH_LISTBOX = 'search-listbox';

export const Search = () => {
    const [showReset, setShowReset] = useState(false);

    const inputRef = useRef(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log('Form submitted');
    }

    const inputOnchangeHandler = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const hasValue = !!value.trim().length;

        const data = await getSuggestions(value);

        console.log(data);
        setShowReset(hasValue);
    }, 250);

    // TODO: This will go through the useSearch hook
    function resetOnClickHandler() {
        setShowReset(false);
    }

    useKeycodes(inputRef, {
        [KEY_CODES.Escape]: () => console.log('Escape'),
        [KEY_CODES.ArrowDown]: () => console.log('ArrowDown'),
        [KEY_CODES.ArrowUp]: () => console.log('ArrowUp'),
    });

    return (
        <div className={styles.Search}>
            <form role="search" onSubmit={handleSubmit}>
                <div
                    role="combobox"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    aria-owns={SEARCH_LISTBOX}>
                    <Input
                        label="Search for products and pick an option"
                        placeholder="Zoeken"
                        id="search-input"
                        labelId={SEARCH_LABEL}
                        onFocus={(e) => console.log('Focus: ', e)}
                        onChange={inputOnchangeHandler}
                        onBlur={(e) => console.log('Blur: ', e)}
                        ariaAutocomplete="list"
                        ariaControls={SEARCH_LISTBOX}
                        ariaLabelledby={SEARCH_LABEL}
                        srOnly={true}
                        autoComplete="off"
                        ref={inputRef}
                    />
                    <div className={styles.SearchButtonHolder}>
                        <Button
                            type="reset"
                            testId="reset"
                            isHidden={!showReset}
                            onClick={resetOnClickHandler}>
                            <VisuallyHidden>Reset search results</VisuallyHidden>
                            <CloseIcon width={12} height={12} />
                        </Button>
                        <Button type="submit" testId="submit">
                            <VisuallyHidden>Submit search results</VisuallyHidden>
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
                <ul role="listbox" aria-labelledby={SEARCH_LABEL} id={SEARCH_LISTBOX}></ul>
            </form>
        </div>
    );
};
