import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line no-undef
const DefaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function useObserver(
  onIntersection: Function,
  // eslint-disable-next-line no-undef
  options?: IntersectionObserverInit,
  runOnce = false
) {
  const [trigger, setTrigger] = useState<any>();

  const observer = useRef<IntersectionObserver>();

  options = options ? { ...DefaultOptions, ...options } : DefaultOptions;

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const handleObserver: IntersectionObserverCallback = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        onIntersection();
        if (runOnce && observer.current) observer.current.unobserve(trigger);
      }
    };
    if (!observer.current)
      observer.current = new IntersectionObserver(handleObserver, options);

    const currentObserver = observer.current;

    if (trigger) currentObserver.observe(trigger);

    return () => {
      if (trigger) currentObserver.unobserve(trigger);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return setTrigger;
}
