"use client"
import { ScrollContext, ScrollProvider } from '../contexts/scrollContext';
import React, { useCallback } from 'react'
import { useRef, useContext, useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

const checkIsMobile = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

function ScrollWrapperInner({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setScrollDepth } = useContext(ScrollContext);
    const main = useRef<HTMLElement | null>(null);
    const pathname = usePathname();
    const [ mainClassname, setMainClassname ] = useState("flex flex-row overflow-x-hidden snap-x w-full overflow-y-hidden");

    const isHomepage = useCallback(() => pathname === "/", [pathname]);

    useEffect(() => {
        if (typeof window !== "undefined" && main.current) {
            let currentSlide = 0;
            const totalSlides = 5; // Hero, Skills, Experience, Footer
            let scrolledLast: number = 0;
            let scrolledLastTry: number = 0;
            const isMobile = checkIsMobile();
            let scrollingMobile = false;
            const mobileScrollPos = {x: 0, y: 0, id: 0};
            let wheelStopped = true;
            let stillScrolling = false;

            
            const scrollToSlide = (slideIndex: number) => {
                if (main.current) {
                    wheelStopped = false;
                    const slideWidth = window.innerWidth;
                    const targetPosition = slideIndex * slideWidth;
                    const leftBefore = main.current.scrollLeft
                    main.current.scrollBy({left: (targetPosition - leftBefore)/5, behavior: "smooth"})
                    stillScrolling = true;
                    setTimeout(() => {
                        stillScrolling = false;
                        if (scrolledLastTry - Date.now() < 40 || isMobile) {
                            main.current?.scrollTo({
                                left: targetPosition,
                                behavior: 'smooth',
                            });
                        }
                        else {
                            wheelStopped = true;
                            main.current?.scrollTo({
                                left: leftBefore,
                                behavior: 'smooth'
                            });
                        }
                        
                    }, 40)
                    
                }
            };
            let wheelStopTimer: NodeJS.Timeout;
            const wheelStopDelay = 40
            
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                if (wheelStopTimer)
                    clearTimeout(wheelStopTimer);

                wheelStopTimer = setTimeout(() => {
                    wheelStopped = true;
                }, wheelStopDelay);
                scrolledLastTry = Date.now();
                
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
                                // Scrolling down - move to next slide
                                currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
                                scrollToSlide(currentSlide);
                                scrollingMobile = false;
                            } else if (delta > scrollCutoff) {
                                // Scrolling up - move to previous slide
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
            ? `flex flex-row overflow-x-hidden snap-x w-full ${checkIsMobile()? "" : "snap-mandatory "}overflow-y-hidden`
            : "flex-grow flex-1 overflow-y-scroll";
        setMainClassname(mainClassnameNew);
    }, [pathname, isHomepage]);

    const handleScroll = (e: React.UIEvent) => {
        if (main.current) {
            if (!isHomepage()) {
                e.stopPropagation();
                setScrollDepth(main.current.scrollTop);
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
            <main ref={main} className={mainClassname} onScroll={handleScroll} onWheel={handleWheelMain}>
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