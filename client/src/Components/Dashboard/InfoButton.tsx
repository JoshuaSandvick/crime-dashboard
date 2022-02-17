import React from 'react';
import { IconButton, Typography, Popover } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export interface InfoButtonProps {
    id?: string;
    infoText: string;
}

export const InfoButton: React.FC<InfoButtonProps> = (props: InfoButtonProps) => {
    const { infoText } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'info-popover' : undefined;

    return (
        <div>
            <IconButton
                size="large"
                color="inherit"
                aria-label="clear"
                sx={{ mr: 2, margin: 0 }}
                aria-describedby={id}
                onClick={handleClick}
            >
                <InfoIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }} variant="body2">
                    {infoText}
                </Typography>
            </Popover>
        </div>
    );
};
