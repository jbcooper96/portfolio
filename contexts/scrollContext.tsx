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
    }
  return (
    <ScrollContext.Provider value={{ scrollDepth, setScrollDepth}}>
      {children}
    </ScrollContext.Provider>
  );
}
