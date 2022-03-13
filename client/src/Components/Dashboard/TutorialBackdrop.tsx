import React from 'react';
import { Backdrop } from '@mui/material';
import TutorialPopover from './TutorialPopover';

export interface TutorialElement {
    el: Element;
    text: string;
}

export interface TutorialBackdropProps {
    elements: TutorialElement[];
}

const TutorialBackdrop: React.FC<TutorialBackdropProps> = (props) => {
    const { elements } = props;

    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <Backdrop open={open} onClick={() => setOpen(false)}>
            {elements.map((tutEl: TutorialElement, id: number) => (
                <TutorialPopover key={id} anchorElement={tutEl.el} text={tutEl.text} open={open} />
            ))}
        </Backdrop>
    );
};

export default TutorialBackdrop;
