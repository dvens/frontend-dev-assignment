import { Button } from '.';
import { CloseIcon, SearchIcon } from '../Icons';

export default { title: 'Components/Shared' };

export const ButtonDefault = () => <Button>Default button</Button>;
export const ButtonIcon = () => (
    <>
        <Button>
            <SearchIcon />
        </Button>
        <Button>
            <CloseIcon width={13} height={13} />
        </Button>
    </>
);
