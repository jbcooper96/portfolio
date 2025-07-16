import Workspace from "../datatypes/Workplace"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Theme from "../theme/Theme";
import { CardHeader } from "@mui/material";

export default function ResumeWorkplace({
    workplace
}: Readonly<{
    workplace: Workspace
}>) {
    return (
        <Box 
            component="span"
        >
            <Card className={workplace.animation} sx={{outline: `1px solid ${Theme.primary}`, outlineOffset: '0px', marginBottom: "25px", backgroundColor: Theme.primary, color: "white"}}variant="outlined">
                <CardHeader 
                    title={workplace.title + " at " + workplace.name} 
                    subheader={workplace.timePeriod}
                    slotProps={{subheader: {color: "white", fontFamily: "sara"}, header: {fontFamily: "sara"}}}
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
        </Box>
    )
}