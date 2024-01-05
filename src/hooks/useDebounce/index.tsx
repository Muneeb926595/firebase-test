import { useEffect } from 'react';

export const useDebounce = (actionToPerform, whenPerform, delay) => {
    useEffect(() => {
        const handler = setTimeout(() => actionToPerform(), delay);

        return () => clearTimeout(handler);
    }, [...(whenPerform || []), delay]);
};