"use client"
import { RefObject, useState, useMemo, useEffect } from "react"

export default function useIsOnScreen(ref: RefObject<HTMLElement | HTMLDivElement | null>, name?: string) {

    const [isIntersecting, setIntersecting] = useState(false)
    
    const observer = useMemo(() => {
      
      if (typeof window != "undefined") {
        return new IntersectionObserver(([entry]) => {
          const name1 = name
          setIntersecting((intersecting) => intersecting || entry.isIntersecting)
        });
      }
}, [ref])
  

    useEffect(() => {
      if (ref.current && observer && !isIntersecting)
        observer.observe(ref.current)
      return () => observer?.disconnect()
    }, [ref])
    
    
    return isIntersecting
  }