import React, { ReactElement } from 'react';
import { Grid, Box, AppBar, Typography, Toolbar } from '@mui/material';
import Widget from './Widget';

export interface DashboardProps {
    title: string;
    children: ReactElement;
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
    const { title, children } = props;

    const [widgets, setWidgets] = React.useState<Map<number, {} | undefined>>(
        new Map([[0, undefined]]),
    );

    function createWidget(initialState?: {}): void {
        let newID = Math.max(...Array.from(widgets.keys())) + 1;
        widgets.set(newID, initialState);
        setWidgets(new Map(widgets));
    }

    function removeWidget(id: number): void {
        widgets.delete(id);
        setWidgets(new Map(widgets));
    }

    function cloneWidget(state: {}): void {
        const lastKey = Array.from(widgets.keys()).pop() as number;
        widgets.set(lastKey, state);
        createWidget();
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
                    {Array.from(widgets.entries()).map(([id, initialState]) => (
                        <Grid item xs={4} key={id} sx={{ height: '400px' }}>
                            <Widget
                                id={id}
                                isActivatedCallback={createWidget}
                                isRemovedCallback={removeWidget}
                                isClonedCallback={cloneWidget}
                                initialState={initialState}
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
