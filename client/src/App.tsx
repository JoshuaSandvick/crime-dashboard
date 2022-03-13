import React, { ReactElement } from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import CrimeWidget from './Components/CrimeWidget/CrimeWidget';
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Typography } from '@mui/material';

const App: React.FC = () => {
    function dashboardTutorialContent(): ReactElement {
        const headerPadding = 1;
        const headerTopPadding = 1;
        const subheaderPadding = 3;
        const bodyPadding = 5;
        const bodyRightPadding = 2;
        const bottomPadding = 1;

        return (
            <>
                <Typography
                    sx={{
                        paddingLeft: headerPadding,
                        paddingBottom: bottomPadding,
                        paddingTop: headerTopPadding,
                    }}
                    variant="h5"
                >
                    {'Intro'}
                </Typography>
                <Typography
                    sx={{
                        paddingLeft: bodyPadding,
                        paddingBottom: bottomPadding,
                        paddingRight: bodyRightPadding,
                    }}
                    variant="body2"
                >
                    {
                        'Use this dashboard to visualize data from the FBI Crime Data Explorer (CDE). The intended usecase is to compare data between the state and national level. The FBI specifically states that the CDE data is not intended to be used to compare between states.'
                    }
                </Typography>
                <Typography
                    sx={{
                        paddingLeft: bodyPadding,
                        paddingBottom: bottomPadding,
                        paddingRight: bodyRightPadding,
                    }}
                    variant="body2"
                >
                    {
                        'When adding a widget, a dataset must first be selected. Then, other required parameter selections will appear. Once all of those are filled out, a graph will automatically appear. If one of the parameters is changed, a new graph will automatically be created.'
                    }
                </Typography>
                <Typography
                    sx={{
                        paddingLeft: headerPadding,
                        paddingBottom: bottomPadding,
                        paddingTop: headerTopPadding,
                    }}
                    variant="h5"
                >
                    {'Features'}
                </Typography>
                <Typography
                    sx={{ paddingLeft: subheaderPadding, paddingBottom: bottomPadding }}
                    variant="subtitle1"
                >
                    {'Saving and Loading Dashboards'}
                </Typography>
                <Typography
                    sx={{
                        paddingLeft: bodyPadding,
                        paddingBottom: bottomPadding,
                        paddingRight: bodyRightPadding,
                    }}
                    variant="body2"
                >
                    {
                        'To save and load dashboards, you must be logged in. Then, the options to save and load dashboards will be found under this button found at the top of the screen:'
                    }
                </Typography>
                <MenuIcon sx={{ paddingLeft: bodyPadding, paddingBottom: bottomPadding }} />
                <Typography
                    sx={{ paddingLeft: subheaderPadding, paddingBottom: bottomPadding }}
                    variant="subtitle1"
                >
                    {'Cloning Widgets'}
                </Typography>
                <Typography
                    sx={{
                        paddingLeft: bodyPadding,
                        paddingBottom: bottomPadding,
                        paddingRight: bodyRightPadding,
                    }}
                    variant="body2"
                >
                    {
                        'An identical copy of a widget can be created if you only want to tweak a few parameters to make comparisons. Do this with the following button found in the widget:'
                    }
                </Typography>
                <ContentCopyIcon sx={{ paddingLeft: bodyPadding, paddingBottom: bottomPadding }} />

                <Typography
                    sx={{ paddingLeft: bodyPadding, paddingBottom: bottomPadding }}
                    variant="body2"
                >
                    {}
                </Typography>
            </>
        );
    }

    return (
        <Dashboard title="Crime Dashboard" tutorialContent={dashboardTutorialContent()}>
            <CrimeWidget />
        </Dashboard>
    );
};

export default App;
