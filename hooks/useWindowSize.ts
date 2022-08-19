import { useLayoutEffect, useState } from 'react';

// custom React Hook to that returns window width and height on window size change;

export default function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useLayoutEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
