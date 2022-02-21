import { useEffect } from 'react';

export const KEY_CODES = {
    Escape: 'Escape',
    ArrowDown: 'ArrowDown',
    ArrowUp: 'ArrowUp',
    Enter: 'Enter',
};

/**
 * Adds the keydown event to an element to check which key codes are pressed.
 * @param {React.MutableRefObject<any>} target
 * @param {Record<string, (event: KeyboardEvent) => any>} listeners
 */
export const useKeycodes = (
    target: React.MutableRefObject<any>,
    listeners: Record<string, (event: KeyboardEvent) => any>,
) => {
    useEffect(() => {
        const targetEl = target && 'current' in target ? target.current : target;

        if (!targetEl) return;

        function onKeyDown(e: KeyboardEvent) {
            const listener = listeners[e.code];
            listener && listener(e);
        }

        targetEl.addEventListener('keydown', onKeyDown);
        return () => targetEl.removeEventListener('keydown', onKeyDown);
    }, []);
};
