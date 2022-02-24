import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export interface LoginDialogProps {
    open: boolean;
    onClose(username?: string): void;
}

const LoginDialog: React.FC<LoginDialogProps> = (props) => {
    const { open, onClose } = props;

    const [username, setUsername] = React.useState<string>();

    const handleClose = () => {
        onClose(username);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login as:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="login"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} disabled={!Boolean(username)}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginDialog;
