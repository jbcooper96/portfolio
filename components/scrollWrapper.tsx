"use client"
import { ScrollContext, ScrollProvider } from '../contexts/scrollContext';
import React from 'react'
import { useRef, useContext, useEffect} from "react"

const scrollThreshold = 50
const scrollCountThreshold = 15;

function ScrollWrapperInner({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setScrollDepth } = useContext(ScrollContext);

    useEffect(() => {
        if (typeof window != "undefined") {
            let deltaY = 0;
            let scrollCounts = 0;
            const handleScroll = (e: WheelEvent) => {
                e.stopPropagation();
                deltaY += e.deltaY;
                ++scrollCounts;
                if (Math.abs(deltaY) >= scrollThreshold || scrollCounts >= scrollCountThreshold) {
                    scrollMain(deltaY)
                    deltaY = 0;
                    scrollCounts = 0
                }
            }
            window.addEventListener("wheel", handleScroll, { passive: false });
            return () => window.removeEventListener("wheel", handleScroll);
        }
    }, [])

    const main = useRef<HTMLElement | null>(null);
    const handleScroll  = (e: React.UIEvent) => {
        e.stopPropagation();
        if (main.current) {
            setScrollDepth(main.current.scrollTop);
        }
    }

    const scrollMain = (amount: number) => {
        const options: ScrollToOptions = {
            top: amount,
            behavior: "instant"
        }
        main.current?.scrollBy(options);
    }


    return (
        <React.Fragment>
            <div id="wrapper" className="relative"></div>
            <main ref={main} className="flex-grow flex-1 overflow-y-scroll" onScroll={handleScroll}>
                {children}
            </main>
        </React.Fragment>
    )
}

export default function ScrollWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ScrollProvider>
            <ScrollWrapperInner>
                {children}
            </ScrollWrapperInner>
        </ScrollProvider>
    )
}