/**
 * Simple HTTPGet client wrapped around window.fetch
 * @export
 * @class HTTPGetClient
 */
export default class HTTPGetClient {
    config = {
        method: 'GET',
    };

    baseUrl = '/';

    constructor({ baseUrl }: { baseUrl: string }) {
        this.baseUrl = baseUrl;
    }

    public request<T = any>(endpoint: string) {
        return fetch(`${this.baseUrl}/${endpoint}`, this.config).then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                return data as T;
            } else {
                return Promise.reject(data);
            }
        });
    }
}
