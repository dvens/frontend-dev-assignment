export const HighlightWords = ({
    text,
    searchValue = '',
}: {
    text: string;
    searchValue: string | '';
}) => {
    if (!searchValue) return <span>{text}</span>;

    // Create regex based upon search value and split it.
    // Other option would be to use replace but thats mean setting dangeriouslyHTML of React 😉
    const regex = new RegExp(`(${searchValue})`, 'gi');
    const highlightedParts = text.split(regex);
    const finalText = highlightedParts.map((text, index) =>
        regex.test(text) ? (
            <mark data-testid="highlighted" key={index}>
                {text}
            </mark>
        ) : (
            text
        ),
    );

    return <span>{finalText}</span>;
};
