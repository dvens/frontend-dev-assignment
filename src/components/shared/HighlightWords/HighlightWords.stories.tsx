import { HighlightWords as HighlightWordsComponent } from './HighlightWords';

export default { title: 'Components/Shared' };

export const Highlighter = () => (
    <HighlightWordsComponent text="Heren truien (1000)" searchValue="Trui" />
);
