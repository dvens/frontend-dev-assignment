import { useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

const events = [MOUSEDOWN, TOUCHSTART];

export const useClickOutside = (ref: React.MutableRefObject<any>, callback: () => void) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        events.forEach((event) => {
            document.addEventListener(event, handleClick);
        });

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, handleClick);
            });
        };
    });
};
