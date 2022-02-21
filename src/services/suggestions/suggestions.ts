import { filterSuggestions } from '../../utils/filter-suggestions';
import { API } from './../HTTPClient/index';

export type Suggestions = Array<{ searchterm: string; nrResults: number }>;

export interface SuggestionsResponse {
    suggestions: Suggestions;
}

export const getSuggestions = (searchQuery: string) => {
    return API.request<SuggestionsResponse>(`/search?q=${searchQuery}`).then((response) =>
        filterSuggestions(response.suggestions, searchQuery),
    );
};
