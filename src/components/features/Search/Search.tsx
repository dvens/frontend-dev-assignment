import { FormEvent } from 'react';
import { Input } from '../../shared/Input';
import styles from './Search.module.css';

const SEARCH_LABEL = 'search-label';
const SEARCH_LISTBOX = 'search-listbox';

export const Search = () => {
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log('Form submitted');
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
                        onChange={(e) => console.log('Change: ', e)}
                        onBlur={(e) => console.log('Blur: ', e)}
                        ariaAutocomplete="list"
                        ariaControls={SEARCH_LISTBOX}
                        ariaLabelledby={SEARCH_LABEL}
                        srOnly={true}
                        autoComplete="off"
                    />
                </div>
                <ul role="listbox" aria-labelledby={SEARCH_LABEL} id={SEARCH_LISTBOX}></ul>
            </form>
        </div>
    );
};
