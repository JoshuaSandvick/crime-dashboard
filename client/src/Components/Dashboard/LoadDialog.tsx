import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface LoadDialogProps {
    open: boolean;
    options: string[];
    onClose: (value?: string) => void;
}

const LoadDialog: React.FC<LoadDialogProps> = (props) => {
    const { onClose, options, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            {options.length > 0 ? (
                <>
                    <DialogTitle>Select dashboard to load</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        {options.map((option) => (
                            <ListItem
                                button
                                onClick={() => handleListItemClick(option)}
                                key={option}
                            >
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <DialogTitle>No dashboards are saved</DialogTitle>
            )}
        </Dialog>
    );
};

export default LoadDialog;
