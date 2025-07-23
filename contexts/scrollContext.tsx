import { createContext, useState, useRef, ReactNode } from 'react';

export const ScrollContext = createContext<{
  scrollDepth: number;
  setScrollDepth: (depth: number) => void;
}>({ scrollDepth: 0, setScrollDepth: () => {}});

export function ScrollProvider({ children }: { children: ReactNode }) {
    const [ scrollDepth, set] = useState(0);
    const timeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const timerCount = useRef(0);
    const timerMax = 8;

    const setScrollDepth = (depth: number) => {
        set(depth);
        /** 
        if (timeout.current != undefined) {
            clearTimeout(timeout.current);
            timerCount.current += 1;
            if (timerCount.current == timerMax) {
                console.log(depth)
                set(depth);
                timerCount.current = 0;
                timeout.current = undefined;
            }
        }
        timeout.current = setTimeout(() => {
            console.log(depth)
            set(depth)
        }, 500)*/
    }
  return (
    <ScrollContext.Provider value={{ scrollDepth, setScrollDepth}}>
      {children}
    </ScrollContext.Provider>
  );
}
