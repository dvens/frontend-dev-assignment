import { suggestionsMockData } from './suggestions-mock-data';

(global as any).fetch = () =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(suggestionsMockData),
    });
