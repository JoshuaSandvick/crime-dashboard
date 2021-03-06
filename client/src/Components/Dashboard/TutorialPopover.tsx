import React from 'react';
import { Typography, Popover, Stack } from '@mui/material';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';

export interface TutorialPopoverProps {
    anchorElement: Element;
    text: string;
    open: boolean;
}

const TutorialPopover: React.FC<TutorialPopoverProps> = (props) => {
    const { anchorElement, text, open } = props;
    const [arrowPopoverRef, setArrowPopoverRef] = React.useState<Element>();

    return (
        <>
            <Popover
                open={open}
                anchorEl={anchorElement}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                elevation={0}
                PaperProps={{ sx: { backgroundColor: 'transparent' } }}
            >
                <Stack direction="column" alignItems="center">
                    <ArrowUpIcon
                        sx={{ color: 'white' }}
                        ref={(newRef) => {
                            if (newRef) {
                                setArrowPopoverRef(newRef);
                            }
                        }}
                    />
                </Stack>
            </Popover>
            <Popover
                open={open}
                anchorEl={arrowPopoverRef}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                elevation={0}
                PaperProps={{ sx: { backgroundColor: 'transparent' } }}
            >
                <Stack direction="column" alignItems="center">
                    <Typography
                        variant="h5"
                        sx={{ color: 'white', fontStyle: 'italic', padding: '5px' }}
                        align="center"
                    >
                        {text}
                    </Typography>
                </Stack>
            </Popover>
        </>
    );
};

export default TutorialPopover;
