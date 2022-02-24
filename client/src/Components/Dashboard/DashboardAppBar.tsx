import React from 'react';
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';
import MenuButton from './MenuButton';
import LoginDialog from './LoginDialog';
import { loadDashboardsListFromDB } from './DashboardStoring';

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
    const handleLoginDialogClose = (userID?: string) => {
        if (userID) {
            setUser(userID);
        }
        setLoginDialogOpen(false);
    };

    React.useEffect(() => {
        async function getUserSavedDashboards() {
            if (userID) {
                const dashboardsList = await loadDashboardsListFromDB(userID);
                setUserSavedDashboards(dashboardsList.map((dashboard: any) => dashboard.ID));
            } else {
                setUserSavedDashboards([]);
            }
        }

        getUserSavedDashboards();
    }, [userID]);

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
                <AppBar position="static">
                    <Toolbar>
                        <MenuButton
                            userID={userID}
                            savedDashboards={userSavedDashboards}
                            loadDashboard={loadDashboard}
                            getWidgetStates={getWidgetStates}
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
        </>
    );
};

export default DashboardAppBar;
