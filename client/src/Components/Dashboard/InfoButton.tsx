import React, { ReactElement } from 'react';
import { IconButton, Popover } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export interface InfoButtonProps {
    content: ReactElement;
}

export const InfoButton: React.FC<InfoButtonProps> = (props: InfoButtonProps) => {
    const { content } = props;

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
        <>
            <IconButton
                size="large"
                color="inherit"
                aria-label="clear"
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
                PaperProps={{ sx: { maxWidth: '50em' } }}
            >
                {content}
            </Popover>
        </>
    );
};
