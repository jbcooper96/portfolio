import Workspace from "../datatypes/Workplace"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export default function ResumeWorkplace({
    workplace
}: Readonly<{
    workplace: Workspace
}>) {
    return (
        <Box 
            component="span"
        >
            <Card sx={{outline: '1px solid white', outlineOffset: '0px', marginBottom: "25px"}}style={{backgroundColor: "black", color: "white"}} variant="outlined">
                <CardContent>
                    <h2 className="text-2xl">{workplace.name} {workplace.timePeriod}</h2>
                    <ul>
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