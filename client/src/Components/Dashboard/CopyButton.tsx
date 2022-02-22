import React from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export interface CopyButtonProps {
    clone(): void;
}

export const CopyButton: React.FC<CopyButtonProps> = (props: CopyButtonProps) => {
    const { clone } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        clone();
    };

    return (
        <div>
            <IconButton
                size="large"
                color="inherit"
                aria-label="copy"
                aria-describedby="copy-button"
                onClick={handleClick}
            >
                <ContentCopyIcon />
            </IconButton>
        </div>
    );
};
