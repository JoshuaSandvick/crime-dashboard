import React, { ReactElement } from 'react';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import InfoDialog from './TutorialDialog';

export interface InfoButtonProps {
    content: ReactElement;
}

export const InfoButton: React.FC<InfoButtonProps> = (props: InfoButtonProps) => {
    const { content } = props;

    const [open, setOpen] = React.useState<boolean>(false);

    const id = open ? 'info-popover' : undefined;

    return (
        <>
            <IconButton
                size="large"
                color="inherit"
                aria-label="clear"
                aria-describedby={id}
                onClick={() => setOpen(true)}
            >
                <InfoIcon />
            </IconButton>
            <InfoDialog open={open} onClose={() => setOpen(false)} content={content} />
        </>
    );
};
