import React, { ReactElement } from 'react';
import { Grid, Box } from '@mui/material';
import Widget from './Widget';
import DashboardAppBar from './DashboardAppBar';
import TutorialBackdrop, { TutorialElement } from './TutorialBackdrop';

export interface DashboardProps {
    title: string;
    tutorialContent: ReactElement;
    children: ReactElement;
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
    const { title, tutorialContent, children } = props;

    const [widgets, setWidgets] = React.useState<Map<number, {} | undefined>>(
        new Map([[0, undefined]]),
    );

    const widgetRefs = React.useRef(new Map());
    const [tutorialEls, setTutorialEls] = React.useState<TutorialElement[]>([]);

    function createWidget(initialState?: {}): void {
        let newID = Math.max(...Array.from(widgets.keys())) + 1;
        widgets.set(newID, initialState);
        setWidgets(new Map(widgets));
    }

    function removeWidget(id: number): void {
        widgets.delete(id);
        setWidgets(new Map(widgets));
    }

    function cloneWidget(state: {}): void {
        const lastKey = Array.from(widgets.keys()).pop() as number;
        widgets.set(lastKey, state);
        createWidget();
    }

    function loadDashboard(loadedWidgets: any) {
        let newBaseID = Math.max(...Array.from(widgets.keys())) + 1;
        const newWidgets = new Map<number, {} | undefined>(
            loadedWidgets.map((widgetState: any, idx: number) => {
                return [idx + newBaseID, widgetState];
            }),
        );
        newWidgets.set(newBaseID + newWidgets.size, undefined);

        setWidgets(newWidgets);
    }

    function getWidgetStates(): any[] {
        const widgetStates: any[] = [];
        widgetRefs.current.forEach(({ getState }) => {
            widgetStates.push(getState());
        });

        return widgetStates;
    }

    function addTutorialElement(el: Element, tutorialText: string) {
        setTutorialEls((prevState) => [...prevState, { el: el, text: tutorialText }]);
    }

    return (
        <>
            <DashboardAppBar
                title={title}
                loadDashboard={loadDashboard}
                getWidgetStates={getWidgetStates}
                addTutorialElement={addTutorialElement}
                tutorialContent={tutorialContent}
            />
            <Box margin="5px">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 8, lg: 12 }}>
                    {Array.from(widgets.entries()).map(([id, initialState]) => (
                        <Grid item xs={4} key={id} sx={{ height: '400px' }}>
                            <Widget
                                id={id}
                                isActivatedCallback={createWidget}
                                isRemovedCallback={removeWidget}
                                isClonedCallback={cloneWidget}
                                initialState={initialState}
                                addTutorialElement={addTutorialElement}
                                ref={(el) => widgetRefs.current.set(id, el)}
                            >
                                {children}
                            </Widget>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <TutorialBackdrop elements={tutorialEls} />
        </>
    );
};

export default Dashboard;
