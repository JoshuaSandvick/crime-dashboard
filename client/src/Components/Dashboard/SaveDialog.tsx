import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export interface SaveDialogProps {
    open: boolean;
    onClose(dashboardID?: string): void;
}

const SaveDialog: React.FC<SaveDialogProps> = (props) => {
    const { open, onClose } = props;

    const [dashboardID, setDashboardID] = React.useState<string>('');

    const handleClose = () => {
        onClose(dashboardID);
        setDashboardID('');
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save as:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="save"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={dashboardID}
                        onChange={(event) => setDashboardID(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} disabled={dashboardID.length === 0}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SaveDialog;
