import React from 'react';
import { Typography, Popover, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export interface TutorialPopoverProps {
    anchorElement: Element;
    text: string;
    open: boolean;
}

const TutorialPopover: React.FC<TutorialPopoverProps> = (props) => {
    const { anchorElement, text, open } = props;

    return (
        <Popover
            open={open}
            anchorEl={anchorElement}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
            elevation={0}
            PaperProps={{ sx: { backgroundColor: 'transparent' } }}
        >
            <Stack direction="row" alignItems="center">
                <ArrowBackIcon sx={{ color: 'white', marginRight: '10px' }} />
                <Typography
                    variant="h5"
                    sx={{ color: 'white', fontStyle: 'italic', marginRight: '10px' }}
                    align="center"
                >
                    {text}
                </Typography>
            </Stack>
        </Popover>
    );
};

export default TutorialPopover;
