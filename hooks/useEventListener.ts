import { useEffect, useRef } from 'react';

export default function useEventListener(eventName: string, handler: any, element = window) {
    const handlerInstance: any = useRef();

    useEffect(() => {
        if (handler instanceof Function) handlerInstance.current = handler;
        else handlerInstance.current = () => {};
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return () => {};

        const eventListener = (event: any) => handlerInstance.current(event);
        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}
