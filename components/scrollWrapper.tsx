"use client"
import { ScrollContext, ScrollProvider } from '../contexts/scrollContext';
import React, { useCallback } from 'react'
import { useRef, useContext, useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion';

const checkIsMobile = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

const HOME_MAIN_CLASS = "flex flex-row w-[500%] overflow-y-hidden";
const SCROLL_TIME = 250

function ScrollWrapperInner({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setScrollDepth } = useContext(ScrollContext);
    const main = useRef<HTMLElement | null>(null);
    const pathname = usePathname();
    const [ mainClassname, setMainClassname ] = useState(HOME_MAIN_CLASS);
    const [ scrollX, setScrollX ] = useState(0);

    const isHomepage = useCallback(() => pathname === "/", [pathname]);

    useEffect(() => {
        if (typeof window !== "undefined" && main.current) {
            let currentSlide = 0;
            const totalSlides = 5; // Hero, Skills, Experience, Footer
            let scrolledLast: number = 0;
            let scrollingMobile = false;
            const mobileScrollPos = {x: 0, y: 0, id: 0};
            let wheelStopped = true;
            let stillScrolling = false;

            
            const scrollToSlide = (slideIndex: number) => {
                if (main.current) {
                    wheelStopped = false;
                    const slideWidth = main.current.clientWidth/totalSlides;
                    const targetPosition = slideIndex * slideWidth;
                    setScrollX(-targetPosition);
                    stillScrolling = true;
                    setTimeout(() => {
                        stillScrolling = false;
                    }, SCROLL_TIME);
                }
            };

            let wheelStopTimer: NodeJS.Timeout;
            const wheelStopDelay = 80
            
            const handleWheel = (e: WheelEvent) => {
                if (wheelStopTimer)
                    clearTimeout(wheelStopTimer);

                wheelStopTimer = setTimeout(() => {
                    console.log("STOP")
                    wheelStopped = true;
                }, wheelStopDelay);
                
                if (!wheelStopped) scrolledLast = Date.now();
                if ((Date.now() - scrolledLast > 100 && wheelStopped && !stillScrolling) || !isHomepage()) {
                    scrolledLast = Date.now();
                    if (e.deltaY > 0) {
                        currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
                    } else {
                        currentSlide = Math.max(currentSlide - 1, 0);
                    }
                    if (isHomepage())
                        scrollToSlide(currentSlide);
                    else
                        main.current?.scrollBy({top: e.deltaY, behavior: "auto"})
                    
                }
            };

            const handleTouchDown = (e: TouchEvent) => {
                if (isHomepage() && e.touches?.length > 0) {
                    scrollingMobile = true;
                    mobileScrollPos.id = e.touches[0].identifier;
                    mobileScrollPos.x = e.touches[0].clientX;
                    mobileScrollPos.y = e.touches[0].clientY;
                }
            };
            const scrollCutoff = 10;
            const handleTouchMove = (e: TouchEvent) => {
                if (isHomepage() && e.touches?.length > 0 && scrollingMobile) {
                    for (const touch of e.touches) {
                        if (touch.identifier == mobileScrollPos.id){
                            const deltaY = touch.clientY - mobileScrollPos.y;
                            const deltaX = touch.clientX - mobileScrollPos.x;
                            const delta = Math.abs(deltaY) < Math.abs(deltaX) ? deltaX : deltaY;
                            if (delta < -scrollCutoff) {
                                currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
                                scrollToSlide(currentSlide);
                                scrollingMobile = false;
                            } else if (delta > scrollCutoff) {
                                currentSlide = Math.max(currentSlide - 1, 0);
                                scrollToSlide(currentSlide);
                                scrollingMobile = false;
                            }
                            
                        }
                    }
                }
            };

            const handletouchEnd = () => {
                scrollingMobile = false;
            }


            const handleKeyDown = (e: KeyboardEvent) => {
                if (isHomepage()) {
                    let newSlide = currentSlide;
                    
                    switch (e.key) {
                        case 'ArrowDown':
                        case 'PageDown':
                        case ' ': // Spacebar
                        case 'ArrowRight':
                            e.preventDefault();
                            newSlide = Math.min(currentSlide + 1, totalSlides - 1);
                            break;
                        case 'ArrowUp':
                        case 'PageUp':
                        case 'ArrowLeft':
                            e.preventDefault();
                            newSlide = Math.max(currentSlide - 1, 0);
                            break;
                        default:
                            return;
                    }
                    
                    if (newSlide !== currentSlide) {
                        currentSlide = newSlide;
                        scrollToSlide(currentSlide);
                    }
                }
            };

            // Add event listeners
            window.addEventListener("wheel", handleWheel, { passive: false });
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("touchstart", handleTouchDown, {passive: false});
            window.addEventListener("touchmove", handleTouchMove, {passive: false});
            window.addEventListener("touchend", handletouchEnd);
            return () => {
                window.removeEventListener("wheel", handleWheel);
                window.removeEventListener("keydown", handleKeyDown);
                window.removeEventListener("touchstart", handleTouchDown);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handletouchEnd);
            };
        }
    }, [pathname, main, isHomepage]);

    useEffect(() => {
        const mainClassnameNew = isHomepage() 
            ? HOME_MAIN_CLASS
            : "flex-grow flex-1 overflow-y-scroll";
        setMainClassname(mainClassnameNew);
    }, [pathname, isHomepage]);

    const handleScroll = (e: React.UIEvent) => {
        if (main.current) {
            if (!isHomepage()) {
                e.stopPropagation();
                setScrollDepth(main.current.scrollTop);
            }
            else if (checkIsMobile()) {
                main.current.scrollLeft = 0;
            }
        }
    };

    const handleWheelMain = (e: React.UIEvent) => {
        if (!isHomepage()) {
            e.stopPropagation();
        }
    }

    return (
        <React.Fragment>
            <div id="wrapper" className="relative"></div>
            {isHomepage() ?
            <motion.main animate={{ x: scrollX }} onScroll={handleScroll} transition={{ type: "spring",  stiffness: 50, duration: SCROLL_TIME }} ref={main} className={mainClassname}>
                {children}
            </motion.main>
            : <main ref={main} className={mainClassname} onScroll={handleScroll} onWheel={handleWheelMain}>
                {children}
            </main>}

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