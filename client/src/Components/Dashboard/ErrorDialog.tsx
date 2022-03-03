import * as React from 'react';
import { DialogTitle, Dialog } from '@mui/material/';

export interface ErrorDialogProps {
    open: boolean;
    errorMessage: string;
    onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = (props) => {
    const { open, errorMessage, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{errorMessage}</DialogTitle>
        </Dialog>
    );
};

export default ErrorDialog;
