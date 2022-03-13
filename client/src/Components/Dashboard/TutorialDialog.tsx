import * as React from 'react';
import { IconButton, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface InfoDialogProps {
    open: boolean;
    onClose(): void;
    content: React.ReactElement;
}

const InfoDialog: React.FC<InfoDialogProps> = (props) => {
    const { open, onClose, content } = props;

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5">{'Documentation'}</Typography>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="close"
                            onClick={onClose}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>{content}</DialogContent>
            </Dialog>
        </div>
    );
};

export default InfoDialog;
