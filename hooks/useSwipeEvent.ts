import { useCallback, useRef, TouchEvent, useEffect } from "react";

export default function useSwipeEvent(tasks: any, element: any = null) {
  const xDown = useRef<any>();
  const yDown = useRef<any>();

  function getTouches(evt: TouchEvent) {
    return evt.touches;
  }

  const handleTouchStart: any = useCallback(
    (evt: TouchEvent) => {
      if (
        element === null ||
        (element.current && element.current.contains(evt.target))
      ) {
        const firstTouch = getTouches(evt)[0];
        xDown.current = firstTouch.clientX;
        yDown.current = firstTouch.clientY;
      }
    },
    [element]
  );

  const handleTouchMove: any = useCallback(
    (evt: TouchEvent) => {
      if (!xDown.current || !yDown.current) {
        return;
      }

      if (
        element === null ||
        (element.current && element.current.contains(evt.target))
      ) {
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown.current - xUp;
        const yDiff = yDown.current - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            if ("right" in tasks && tasks.right instanceof Function) {
              tasks.right();
            }
          } else if (xDiff < 0) {
            if ("left" in tasks && tasks.left instanceof Function) {
              tasks.left();
            }
          }
        }
        // else if (yDiff > 0) {
        // } else {
        // }

        xDown.current = null;
        yDown.current = null;
      }
    },
    [tasks, element]
  );

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [handleTouchStart, handleTouchMove]);
}
