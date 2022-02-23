import { suggestionsMockData } from './suggestions-mock-data';

(global as any).fetch = () => {
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(suggestionsMockData),
    });
};
