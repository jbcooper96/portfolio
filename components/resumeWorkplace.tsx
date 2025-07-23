import Workspace from "../datatypes/Workplace"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Theme from "../theme/Theme";
import { CardHeader } from "@mui/material";
import useIsOnScreen from "../hooks/useIsOnScreen";
import { useRef, useEffect, RefObject, useState, useContext } from "react";
import { createPortal } from 'react-dom';
import { ScrollContext } from '../contexts/scrollContext';


interface resumeWorkplaceProps {
    workplace: Workspace;
}

interface resumeCardProps {
    workplace: Workspace;
    shouldPortalAdjust: () => boolean;
    getPortalTop: () => number;
    ref?: RefObject<HTMLDivElement | null>;
    cardVisible: boolean;
    animationRan: boolean;
    hidden?: boolean;
    width?: number;
    leavePortal?: () => void;
    top?: number;
}

function WorkplaceCardPortal({
    workplace,
    shouldPortalAdjust,
    getPortalTop,
    ref,
    cardVisible,
    animationRan,
    width,
    leavePortal
}: resumeCardProps) {
    const { scrollDepth } = useContext(ScrollContext);
    const top = getPortalTop() - scrollDepth;
    return (
    <WorkplaceCard 
        workplace={workplace}
        shouldPortalAdjust={shouldPortalAdjust}
        getPortalTop={getPortalTop}
        ref={ref}
        cardVisible={cardVisible}
        animationRan={animationRan}
        width={width}
        leavePortal={leavePortal}
        top={top}
    />)
}

function WorkplaceCard({
    workplace,
    shouldPortalAdjust,
    ref,
    cardVisible,
    animationRan,
    hidden,
    width,
    leavePortal,
    top
}: resumeCardProps) { 
    useEffect(() => {
        if (top != undefined && top <= 0 && leavePortal)
            leavePortal();
    }, [top, leavePortal])
        
    let portalStyles: {top: string, position: string, width?: string} = {top: `${top}px`, position: "absolute"};
    if (width) portalStyles = {...portalStyles, width: width.toString() + "px"}
    return (
        <Box 
            sx={shouldPortalAdjust() ? portalStyles : (hidden ? {visibility: "hidden"}: {})}
            component="span"
        >
            <div ref={ref} >
                <Card className={cardVisible ? (!animationRan ? workplace.animation : "") : "invisible"} sx={{outline: `1px solid ${Theme.primary}`, outlineOffset: '0px', marginBottom: "25px", backgroundColor: Theme.primary, color: Theme.foreground}}variant="outlined">
                    <CardHeader 
                        title={workplace.title + " at " + workplace.name} 
                        subheader={workplace.timePeriod}
                        slotProps={{subheader: {color: Theme.foreground, fontFamily: "sara"}, header: {fontFamily: "sara"}}}
                    >
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc ml-10">
                            {workplace.bulletPoints && workplace.bulletPoints.map(bullet => {
                                return (
                                    <li key={bullet}>
                                        {bullet}
                                    </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </Box>
    )
}

export default function ResumeWorkplace({
    workplace
}: resumeWorkplaceProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const cardVisible = useIsOnScreen(cardRef, workplace.name);
    const animationRan = useRef(false);
    const topDist = useRef(0);
    const [inPortal, setInPortal] = useState(false);
    const container = useRef<Element | undefined>(undefined);
   
    

    useEffect(() => {
        if (!inPortal && cardRef.current) {
            topDist.current = cardRef.current.getBoundingClientRect().top
        }
        if (workplace.animation == "animate-slide-right-tag" && !animationRan.current && cardVisible){
            setInPortal(true);
        }
        if (cardVisible && !animationRan.current) {
            setTimeout(() => {
                animationRan.current = true;
                setInPortal(false);
            }, workplace.animationTime || 500);
        }
    }, [cardVisible, inPortal, workplace])


    const shouldPortalAdjust = () => {
        return !!(topDist.current != 0 && inPortal && container.current)
    }

    const getPortalTop = () => {
        return topDist.current - (container.current?.getBoundingClientRect().top || 0);
    }

    if (!inPortal || typeof window == "undefined" || !(document?.getElementById("wrapper"))) {
        return (
            <WorkplaceCard 
                workplace={workplace}
                shouldPortalAdjust={shouldPortalAdjust}
                getPortalTop={getPortalTop}
                ref={cardRef}
                cardVisible={cardVisible}
                animationRan={!!animationRan.current}
            />
        )
    }
    else {
        if (!container.current)
            container.current = document?.getElementById("wrapper") || document.body;
        let width = undefined;
        const mains = document?.getElementsByTagName("main");
        if (mains?.length > 0) {
            width = mains[0].getBoundingClientRect().width;
        }
        return (
            <div>
                {createPortal(
                    <WorkplaceCardPortal 
                        workplace={workplace}
                        shouldPortalAdjust={shouldPortalAdjust}
                        getPortalTop={getPortalTop}
                        ref={cardRef}
                        cardVisible={cardVisible || inPortal}
                        animationRan={!!animationRan.current}
                        width={width}
                        leavePortal={() => {
                            setInPortal(false)
                            animationRan.current = true
                        }}
                    />,
                    container.current
                )}
                <WorkplaceCard 
                        workplace={workplace}
                        shouldPortalAdjust={() => false}
                        getPortalTop={getPortalTop}
                        cardVisible={false}
                        animationRan={!!animationRan.current}
                        hidden={true}
                    />
            </div>
        )
    }
    
}