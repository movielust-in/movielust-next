import { useEffect, useState } from "react";

export default function useScroll(max = 0) {
  const [scroll, setScroll] = useState<number>();
  useEffect(() => {
    function updateScroll() {
      const currentScroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (max && currentScroll >= max) return;

      setScroll(currentScroll);
    }
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, [max]);
  return scroll;
}
