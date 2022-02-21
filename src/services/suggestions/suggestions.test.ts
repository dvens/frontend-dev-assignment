import { getSuggestions } from './suggestions';

const SEARCH_QUERY = 'truien';

describe('Services: <Suggestions>:', () => {
    test('It should fetch no results when search value is empty', async () => {
        const data = await getSuggestions('');
        expect(data).toStrictEqual([]);
    });

    test('It should fetch no results when search value is not available in the API', async () => {
        const data = await getSuggestions('jassen');
        expect(data).toStrictEqual([]);
    });

    test('It should fetch results when the value is available in the API', async () => {
        const data = await getSuggestions(SEARCH_QUERY);

        expect(data).not.toStrictEqual([]);

        // Expect the search query to be found in the results searchterm.
        expect(data.filter(({ searchterm }) => searchterm.includes(SEARCH_QUERY)).length).toBe(
            data.length,
        );
    });
});
