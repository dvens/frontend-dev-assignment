import { ComboboxList, ComboboxListItem } from '.';

export default { title: 'Components/Shared' };

const LIST_ITEMS = new Array(10)
    .fill(null)
    .map((_, key) => ({ title: 'test item', selected: key === 0 }));
export const Combobox = () => (
    <ComboboxList ariaLabelledby="list" id="list" isActive={true}>
        {LIST_ITEMS.map((item, key) => (
            <ComboboxListItem id="item-1" key={key} selected={item.selected}>
                {item.title}
            </ComboboxListItem>
        ))}
    </ComboboxList>
);
