import React from 'react';
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';
import MenuButton from './MenuButton';
import LoginDialog from './LoginDialog';
import ErrorDialog from './ErrorDialog';
import { loadDashboardsListFromDB, addUserToDB } from './DashboardStoring';

export interface DashboardAppBarProps {
    title: string;
    loadDashboard(widgets: any): void;
    getWidgetStates(): any[];
}

const DashboardAppBar: React.FC<DashboardAppBarProps> = (props) => {
    const { title, loadDashboard, getWidgetStates } = props;

    const [userID, setUser] = React.useState<string>();
    const [userSavedDashboards, setUserSavedDashboards] = React.useState<string[]>([]);
    const [loginDialogOpen, setLoginDialogOpen] = React.useState<boolean>(false);
    const [errorDialogOpen, setErrorDialogOpen] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
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
