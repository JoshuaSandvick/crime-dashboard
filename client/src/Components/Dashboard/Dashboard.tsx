import React, { ReactElement } from 'react';
import { Grid, Box, AppBar, Typography, Toolbar } from '@mui/material';
import Widget from './Widget';

export interface DashboardProps {
    title: string;
    children: ReactElement;
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
    const { title, children } = props;

    const [widgetIDs, setWidgetIDs] = React.useState<number[]>([0]);

    function widgetWasActivated(idToAdd: number): void {
        setWidgetIDs(widgetIDs.concat(idToAdd + 1));
    }

    function widgetWasRemoved(idToRemove: number): void {
        setWidgetIDs(widgetIDs.filter((id) => id !== idToRemove));
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box margin="5px">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 8, lg: 12 }}>
                    {widgetIDs.map((id) => (
                        <Grid item xs={4} key={id} sx={{ height: '400px' }}>
                            <Widget
                                id={id}
                                isActivatedCallback={widgetWasActivated}
                                isRemovedCallback={widgetWasRemoved}
                            >
                                {children}
                            </Widget>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Dashboard;
