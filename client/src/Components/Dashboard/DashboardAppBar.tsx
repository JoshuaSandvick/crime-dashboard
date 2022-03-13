import React, { ReactElement } from 'react';
import { Box, AppBar, Typography, Toolbar, Button, Stack } from '@mui/material';
import MenuButton from './MenuButton';
import { InfoButton } from './InfoButton';
import LoginDialog from './LoginDialog';
import ErrorDialog from './ErrorDialog';
import { loadDashboardsListFromDB, addUserToDB } from './DashboardStoring';

export interface DashboardAppBarProps {
    title: string;
    loadDashboard(widgets: any): void;
    getWidgetStates(): any[];
    addTutorialElement(el: Element, text: string): void;
    tutorialContent: ReactElement;
}

const DashboardAppBar: React.FC<DashboardAppBarProps> = (props) => {
    const { title, loadDashboard, getWidgetStates, addTutorialElement, tutorialContent } = props;

    const [userID, setUser] = React.useState<string>();
    const [userSavedDashboards, setUserSavedDashboards] = React.useState<string[]>([]);
    const [loginDialogOpen, setLoginDialogOpen] = React.useState<boolean>(false);
    const [errorDialogOpen, setErrorDialogOpen] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const infoButtonRef = React.useRef<Element>(null);

    const handleLoginDialogClose = async (userID?: string) => {
        if (userID) {
            try {
                await addUserToDB(userID);
                setUser(userID);
            } catch (error) {
                showErrorDialog('Login failed');
            }
        }
        setLoginDialogOpen(false);
    };

    const handleErrorDialogClose = () => {
        setErrorMessage('');
        setErrorDialogOpen(false);
    };

    const showErrorDialog = (errorMessage: string) => {
        if (errorMessage.length > 0) {
            setErrorMessage(errorMessage);
            setErrorDialogOpen(true);
        }
    };

    const getUserSavedDashboards = React.useCallback(async () => {
        if (userID) {
            try {
                const dashboardsList = await loadDashboardsListFromDB(userID);
                setUserSavedDashboards(dashboardsList.map((dashboard: any) => dashboard.id));
            } catch (error) {
                setUserSavedDashboards([]);
            }
        } else {
            setUserSavedDashboards([]);
        }
    }, [userID]);

    React.useEffect(() => {
        getUserSavedDashboards();
    }, [getUserSavedDashboards]);

    React.useEffect(() => {
        if (infoButtonRef.current) {
            addTutorialElement(
                infoButtonRef.current,
                'Click this button to learn how to use this app',
            );
        }
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
                <AppBar position="static">
                    <Toolbar>
                        <MenuButton
                            userID={userID}
                            savedDashboards={userSavedDashboards}
                            reloadDashboards={getUserSavedDashboards}
                            loadDashboard={loadDashboard}
                            getWidgetStates={getWidgetStates}
                            showErrorDialog={showErrorDialog}
                        />
                        <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="div">
                                {title}
                            </Typography>
                            <Box ref={infoButtonRef}>
                                <InfoButton content={tutorialContent} />
                            </Box>
                        </Stack>
                        <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
            <ErrorDialog
                open={errorDialogOpen}
                onClose={handleErrorDialogClose}
                errorMessage={errorMessage}
            />
        </>
    );
};

export default DashboardAppBar;
