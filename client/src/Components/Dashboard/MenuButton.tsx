import React from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import LoadDialog from './LoadDialog';
import SaveDialog from './SaveDialog';
import { loadDashboardFromDB, saveDashboardToDB } from './DashboardStoring';

export interface MenuButtonProps {
    userID?: string;
    getWidgetStates(): any[];
    loadDashboard(widgets: any): void;
    savedDashboards: string[];
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
    const { userID, getWidgetStates, loadDashboard, savedDashboards } = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [loadDialogOpen, setLoadDialogOpen] = React.useState<boolean>(false);
    const [saveDialogOpen, setSaveDialogOpen] = React.useState<boolean>(false);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLoadDialogClose = async (dashboardID?: string) => {
        setLoadDialogOpen(false);
        if (dashboardID) {
            loadDashboard(await loadDashboardFromDB(dashboardID));
        }
        handleClose();
    };

    const handleSaveDialogClose = async (dashboardID?: string) => {
        setSaveDialogOpen(false);
        if (dashboardID && userID) {
            saveDashboardToDB(userID, dashboardID, getWidgetStates());
        }
        handleClose();
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                id="menu-button"
                sx={{ mr: 2 }}
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}
            >
                <MenuItem
                    onClick={() => {
                        setLoadDialogOpen(true);
                        handleClose();
                    }}
                    disabled={!Boolean(userID)}
                >
                    <ListItemIcon>
                        <FileOpenIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Load Dashboard</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setSaveDialogOpen(true);
                        handleClose();
                    }}
                    disabled={!Boolean(userID)}
                >
                    <ListItemIcon>
                        <SaveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Save Dashboard</ListItemText>
                </MenuItem>
            </Menu>
            <LoadDialog
                open={loadDialogOpen}
                onClose={handleLoadDialogClose}
                options={savedDashboards}
            />
            <SaveDialog open={saveDialogOpen} onClose={handleSaveDialogClose} />
        </div>
    );
};

export default MenuButton;
