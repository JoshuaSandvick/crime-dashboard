import React, { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box, Paper, Typography, IconButton, Zoom } from '@mui/material';
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
    const [isClosed, setIsClosed] = React.useState<boolean>(false);
    const [infoText, setInfoText] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');

    const AddWidgetButton: React.FC<{
        setIsActivated(): void;
    }> = ({ setIsActivated }) => {
        return (
            <Zoom in={true} timeout={400} exit={false}>
                <Box display="flex" justifyContent="center" flexDirection="column" height="100%">
                    <Box display="flex" justifyContent="center">
                        <Fab
                            color="primary"
                            variant="extended"
                            onClick={() => {
                                setIsActivated();
                            }}
                        >
                            <AddIcon />
                            Add Widget
                        </Fab>
                    </Box>
                </Box>
            </Zoom>
        );
    };

    const WidgetHeader: React.FC<{
        setIsClosed: (value: React.SetStateAction<boolean>) => void;
    }> = ({ setIsClosed }) => {
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
                        setIsClosed(true);
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </Box>
        );
    };

    return isActivated ? (
        <Zoom
            in={!isClosed}
            timeout={{ enter: 500, exit: 400 }}
            onExited={() => isRemovedCallback(id)}
        >
            <Paper sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <WidgetHeader setIsClosed={setIsClosed} />
                    {React.cloneElement(children, {
                        id: id,
                        setInfo: setInfoText,
                        setTitle: setTitle,
                    })}
                </Box>
            </Paper>
        </Zoom>
    ) : (
        <AddWidgetButton
            setIsActivated={() => {
                setIsActivated(true);
                isActivatedCallback(id);
            }}
        />
    );
};

export default Widget;
