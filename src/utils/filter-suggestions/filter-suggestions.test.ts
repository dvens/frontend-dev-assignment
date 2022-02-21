import { filterSuggestions } from '.';

const DEFAULT_DATA = [
    {
        searchterm: 'kenzo trui dames',
        nrResults: 21,
    },
    {
        searchterm: 'kenzo trui heren',
        nrResults: 12,
    },
];

describe('Utility: <Filter suggestions>', () => {
    test('It should return no values when empty value', () => {
        expect(filterSuggestions(DEFAULT_DATA, '')).toEqual([]);
    });

    test('It should return all results', () => {
        expect(filterSuggestions(DEFAULT_DATA, 'Kenzo')).toEqual(DEFAULT_DATA);
    });

    test('It should return no results', () => {
        expect(filterSuggestions(DEFAULT_DATA, 'Truien')).toEqual([]);
    });

    test('It should return a result', () => {
        expect(filterSuggestions(DEFAULT_DATA, 'Dames')).toEqual([DEFAULT_DATA[0]]);
    });
});
