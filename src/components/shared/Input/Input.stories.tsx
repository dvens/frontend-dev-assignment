import { Input as InputComponent } from './Input';

export default { title: 'Components/Shared' };

export const Input = () => (
    <InputComponent
        label="Search for products and pick an option"
        placeholder="Zoeken"
        id="search-input"
        labelId="search-input-label"
        onFocus={(e) => console.log('Focus: ', e)}
        onChange={(e) => console.log('Change: ', e)}
        onBlur={(e) => console.log('Blur: ', e)}
        ariaAutocomplete="list"
        ariaControls="search-list-box"
        ariaLabelledby="search-input-label"
        srOnly={true}
        autoComplete="off"
    />
);
