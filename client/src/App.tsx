import React from 'react';
//import './App.css';
import ComponentWidget from './Components/ComponentWidget';
import { Grid, Box, AppBar, Typography, Toolbar } from '@mui/material';

const App: React.FC = () => {
    const [graphComponents, setGraphComponents] = React.useState<number[]>([0]);

    function widgetWasActivated(idToAdd: number): void {
        setGraphComponents(graphComponents.concat(idToAdd + 1));
    }

    function widgetWasRemoved(idToRemove: number): void {
        setGraphComponents(graphComponents.filter((id) => id !== idToRemove));
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Crime Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {graphComponents.map((id) => (
                    <Grid item xs={2} sm={4} md={4} key={id} sx={{ height: '300px' }}>
                        <ComponentWidget
                            id={id}
                            isActivatedCallback={widgetWasActivated}
                            isRemovedCallback={widgetWasRemoved}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default App;
