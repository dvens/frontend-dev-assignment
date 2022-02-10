import { Input } from './Input';

export default { title: 'Components/Shared' };

export const InputDefault = () => (
    <Input
        label="Search for products and pick an option"
        placeholder={'Zoeken'}
        id="search-input"
        labelId="search-input-label"
        onFocus={(e) => console.log('Focus: ', e)}
        onChange={(e) => console.log('Change: ', e)}
        onBlur={(e) => console.log('Blur: ', e)}
        ariaAutocomplete={'list'}
        ariaControls={'search-list-box'}
        ariaLabelledby={'search-input-label'}
    />
);
