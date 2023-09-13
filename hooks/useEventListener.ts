import { useEffect, useRef } from 'react';

export default function useEventListener(
  eventName: string,
  handler: any,
  element = null
) {
  const handlerInstance: any = useRef();

  useEffect(() => {
    if (handler instanceof Function) handlerInstance.current = handler;
    else handlerInstance.current = () => { };
  }, [handler]);

  useEffect(() => {
    const isSupported =
      (element || window) && (element || window).addEventListener;
    if (!isSupported) return () => { };

    const eventListener = (event: any) => handlerInstance.current(event);

    (element || window).addEventListener(eventName, eventListener, {
      passive: true,
    });

    return () => {
      (element || window).removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
