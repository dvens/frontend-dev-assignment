import HTTPGetClient from './HTTPClient';

// Create new Api get client with localhost as baseurl.
export const API = new HTTPGetClient({ baseUrl: 'http://localhost:5000' });
