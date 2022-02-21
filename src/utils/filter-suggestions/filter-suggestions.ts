import { Suggestions } from '../../services/suggestions';

export const filterSuggestions = (suggetions: Suggestions, searchQuery: string) => {
    if (!searchQuery) return [];

    const lowercaseQuery = searchQuery.toLowerCase();
    // Using indexOf since it is the best performant one out of: regex test,match and indexOf (https://jsben.ch/r9hBp).
    return suggetions.filter(({ searchterm }) => searchterm.indexOf(lowercaseQuery) > -1);
};
