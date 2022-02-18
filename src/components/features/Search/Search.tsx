import { FormEvent, useState } from 'react';
import { debounce } from '../../../utils/debounce';
import { Button } from '../../shared/Button';
import { CloseIcon, SearchIcon } from '../../shared/Icons';
import { Input } from '../../shared/Input';
import { VisuallyHidden } from '../../shared/VisuallyHidden';
import styles from './Search.module.css';

const SEARCH_LABEL = 'search-label';
const SEARCH_LISTBOX = 'search-listbox';

export const Search = () => {
    const [showReset, setShowReset] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log('Form submitted');
    }

    const inputOnchangeHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const hasValue = !!value.trim().length;

        setShowReset(hasValue);
    }, 250);

    function resetOnClickHandler() {
        setShowReset(false);
    }

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
