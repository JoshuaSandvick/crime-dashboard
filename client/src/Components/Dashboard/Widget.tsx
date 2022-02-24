import React, { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box, Paper, IconButton, Zoom } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { InfoButton } from './InfoButton';
import { CopyButton } from './CopyButton';

export interface WidgetChildProps {
    id?: number;
    setInfo?(infoText: string): React.Dispatch<React.SetStateAction<string>>;
    setClone?(clone: {}): void;
    initialState?: {};
}

export interface WidgetProps {
    id: number;
    isActivatedCallback(state?: {}): void;
    isRemovedCallback(id: number): void;
    isClonedCallback(state: {}): void;
    children: ReactElement;
    initialState: {} | undefined;
}

const Widget = React.forwardRef((props: WidgetProps, ref) => {
    const { id, isActivatedCallback, isRemovedCallback, isClonedCallback, initialState, children } =
        props;

    const [isActivated, setIsActivated] = React.useState<boolean>(initialState ? true : false);
    const [isClosed, setIsClosed] = React.useState<boolean>(false);
    const [infoText, setInfoText] = React.useState<string>('');
    const [clone, setClone] = React.useState<{}>({});

    React.useEffect(() => {
        if (initialState) {
            setIsActivated(true);
        }
    }, [initialState]);

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
                <Box display="flex">
                    <InfoButton infoText={infoText} />
                    <CopyButton clone={isClonedCallback.bind(undefined, clone)} />
                </Box>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="clear"
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
            timeout={{ enter: 500, exit: 300 }}
            onExited={() => isRemovedCallback(id)}
        >
            <Paper sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <WidgetHeader setIsClosed={setIsClosed} />
                    {React.cloneElement(children, {
                        id: id,
                        setInfo: setInfoText,
                        setClone: setClone,
                        initialState: initialState,
                        ref: ref,
                    })}
                </Box>
            </Paper>
        </Zoom>
    ) : (
        <AddWidgetButton
            setIsActivated={() => {
                setIsActivated(true);
                isActivatedCallback();
            }}
        />
    );
});

export default Widget;
