import React, { useImperativeHandle } from 'react';
import { ChartComponent } from './Chart';
import { WidgetChildProps } from '../Dashboard/Widget';
import GenericSelect from './GenericSelect';
import CrimeOptionSet from './CrimeOptionSet';
import { Stack, Box } from '@mui/material';
import CrimeOptionSelects from './CrimeOptionSelects';

function GetURLForDataType(dataType: string): string {
    switch (dataType) {
        case 'CountsOfOffense':
            return '/api/v1/get-counts';
        case 'OffenderDemographics':
            return '/api/v1/get-demographics';
        case 'VictimDemographics':
            return '/api/v1/get-demographics';
        default:
            return '';
    }
}

export interface CrimeWidgetState {
    location?: string;
    offense?: string;
    demographic?: string;
    dataType?: string;
    year?: number;
    chartType?: string;
    showChart?: boolean;
}

export interface CrimeWidgetAction {
    type: string;
    value: string;
}

function crimeStateReducer(state: CrimeWidgetState, action: CrimeWidgetAction): CrimeWidgetState {
    let nextState: CrimeWidgetState = {};
    switch (action.type) {
        case 'setLocation':
            nextState = { ...state, location: action.value };
            break;
        case 'setOffense':
            nextState = { ...state, offense: action.value };
            break;
        case 'setDemographic':
            nextState = { ...state, demographic: action.value };
            break;
        case 'setDataType':
            nextState = { ...state, dataType: action.value };
            if (action.value === 'CountsOfOffense') {
                nextState = {
                    ...nextState,
                    chartType: 'LinePlusBarChart',
                    demographic: 'count',
                };
            }
            break;
        case 'setYear':
            nextState = { ...state, year: parseInt(action.value) };
            break;
        case 'setChartType':
            nextState = { ...state, chartType: action.value };
            break;
        default:
            throw new Error('Unexpected reducer action type');
    }

    setShowChart(nextState);

    return nextState;
}

function setShowChart(state: CrimeWidgetState): void {
    const { location, offense, demographic, year, chartType, dataType } = state;
    state.showChart =
        location && offense && demographic && chartType && (year || dataType === 'CountsOfOffense')
            ? true
            : false;

    return;
}

const CrimeWidget = React.forwardRef((props: WidgetChildProps, ref) => {
    let { id, setInfo, setClone, initialState } = props;
    if (!id) {
        id = 0;
    }

    const [state, dispatch] = React.useReducer(crimeStateReducer, initialState ? initialState : {});
    const { location, offense, dataType, chartType, demographic, year, showChart } = state;

    useImperativeHandle(
        ref,
        () => ({
            getState: () => {
                return state;
            },
        }),
        [state],
    );

    if (setClone) {
        setClone(state);
    }
    if (setInfo) {
        setInfo(
            'Use this widget to visualize crime statistics in a graph. A graph will appear once all required variables have an option selected. If one of the variables is changed, a new graph will automatically be created.',
        );
    }

    return !dataType ? (
        <Box display="flex" justifyContent="center" flexDirection="column" height="100%">
            <Box display="flex" justifyContent="center">
                <GenericSelect
                    title="Dataset"
                    value={dataType}
                    handleSelect={(event) =>
                        dispatch({
                            type: 'setDataType',
                            value: event.target.value as string,
                        })
                    }
                    options={CrimeOptionSet.datasetTypes}
                    sx={{ width: '50%', flexGrow: 0 }}
                />
            </Box>
        </Box>
    ) : (
        <Box sx={{ flexGrow: 1, padding: '0 5px 0 5px' }}>
            <Stack spacing={0} sx={{ height: '100%' }}>
                <CrimeOptionSelects parentState={state} dispatch={dispatch} />
                {showChart && (
                    <Box height="100%">
                        <ChartComponent
                            key={'chart' + id}
                            id={'chart' + id}
                            datasetConfig={{
                                location: location as string,
                                year: year ? (year as number) : undefined,
                                party: 'offender',
                                offense: offense as string,
                                demographic: demographic as string,
                            }}
                            url={GetURLForDataType(dataType as string)}
                            chartType={chartType as string}
                        />
                    </Box>
                )}
            </Stack>
        </Box>
    );
});

export default CrimeWidget;
