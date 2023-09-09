import { useEffect } from "react";

// when called this hook will lock body scroll

// Optional argument 'active:boolean' can be passed to make locking condtional

export default function useLockBodyScroll(active = true) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (active) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [active]);
}
