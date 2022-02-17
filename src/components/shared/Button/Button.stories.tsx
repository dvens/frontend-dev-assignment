import { Button as ButtonComponent } from '.';
import { CloseIcon, SearchIcon } from '../Icons';

export default { title: 'Components/Shared' };

export const Button = () => <ButtonComponent>Default button</ButtonComponent>;
export const IconButton = () => (
    <>
        <ButtonComponent>
            <SearchIcon />
        </ButtonComponent>
        <ButtonComponent>
            <CloseIcon width={13} height={13} />
        </ButtonComponent>
    </>
);
