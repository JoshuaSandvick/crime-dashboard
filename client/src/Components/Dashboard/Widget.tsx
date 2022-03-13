import React, { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box, Paper, IconButton, Zoom } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
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
    addTutorialElement(el: Element, text: string): void;
}

const Widget = React.forwardRef((props: WidgetProps, ref) => {
    const {
        id,
        isActivatedCallback,
        isRemovedCallback,
        isClonedCallback,
        initialState,
        addTutorialElement,
        children,
    } = props;

    const [isActivated, setIsActivated] = React.useState<boolean>(initialState ? true : false);
    const [isClosed, setIsClosed] = React.useState<boolean>(false);
    const [clone, setClone] = React.useState<{}>({});

    const addWidgetButtonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (initialState) {
            setIsActivated(true);
        }
    }, [initialState]);

    React.useEffect(() => {
        if (id === 0 && addWidgetButtonRef.current) {
            addTutorialElement(
                addWidgetButtonRef.current,
                '... or use this one to just get going!',
            );
        }
    }, [id]);

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
            buttonRef={addWidgetButtonRef}
            zoomIn={id !== 0}
        />
    );
});

const AddWidgetButton: React.FC<{
    setIsActivated(): void;
    buttonRef: React.RefObject<HTMLButtonElement>;
    zoomIn: boolean;
}> = ({ setIsActivated, buttonRef, zoomIn }) => {
    return (
        <Zoom in={true} appear={zoomIn} timeout={400} exit={false}>
            <Box display="flex" justifyContent="center" flexDirection="column" height="100%">
                <Box display="flex" justifyContent="center">
                    <Fab
                        color="primary"
                        variant="extended"
                        onClick={() => {
                            setIsActivated();
                        }}
                        ref={buttonRef}
                    >
                        <AddIcon />
                        Add Widget
                    </Fab>
                </Box>
            </Box>
        </Zoom>
    );
};

export default Widget;
