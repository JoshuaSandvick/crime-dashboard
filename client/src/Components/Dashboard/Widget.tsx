import React, { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box, Paper, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { InfoButton } from './InfoButton';

export interface WidgetChildProps {
    id?: number;
    setInfo?(infoText: string): React.Dispatch<React.SetStateAction<string>>;
    setTitle?(title: string): React.Dispatch<React.SetStateAction<string>>;
}

export interface WidgetProps {
    id: number;
    isActivatedCallback(id: number): void;
    isRemovedCallback(id: number): void;
    children: ReactElement;
}

const Widget: React.FC<WidgetProps> = (props: WidgetProps) => {
    const { id, isActivatedCallback, isRemovedCallback, children } = props;

    const [isActivated, setIsActivated] = React.useState<boolean>(false);
    const [infoText, setInfoText] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');

    const AddWidgetButton: React.FC = () => {
        return (
            <Box display="flex" justifyContent="center" flexDirection="column" height="100%">
                <Box display="flex" justifyContent="center">
                    <Fab
                        color="primary"
                        variant="extended"
                        onClick={() => {
                            setIsActivated(true);
                            isActivatedCallback(id);
                        }}
                    >
                        <AddIcon />
                        Add Widget
                    </Fab>
                </Box>
            </Box>
        );
    };

    const WidgetHeader: React.FC = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'secondary.main',
                    marginBottom: '.5em',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    flexGrow: 0,
                }}
            >
                <InfoButton infoText={infoText} />
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    sx={{ flexGrow: 1 }}
                >
                    <Typography component="div" variant="h5" align="center">
                        {title}
                    </Typography>
                </Box>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="clear"
                    sx={{ mr: 2, margin: 0 }}
                    key={'resetState' + id}
                    onClick={() => {
                        isRemovedCallback(id);
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </Box>
        );
    };

    return isActivated ? (
        <Paper sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <WidgetHeader />
                {React.cloneElement(children, { id: id, setInfo: setInfoText, setTitle: setTitle })}
            </Box>
        </Paper>
    ) : (
        <AddWidgetButton />
    );
};

export default Widget;
