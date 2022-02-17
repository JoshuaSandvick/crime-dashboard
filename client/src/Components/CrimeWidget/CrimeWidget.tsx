import React from 'react';
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
            throw new Error();
    }

    let { location, offense, demographic, year, chartType, dataType } = nextState;
    if (
        location &&
        offense &&
        demographic &&
        chartType &&
        (year || dataType === 'CountsOfOffense')
    ) {
        nextState.showChart = true;
    }

    return nextState;
}

const CrimeWidget: React.FC<WidgetChildProps> = (props) => {
    let { id, setInfo, setTitle } = props;
    if (!id) {
        id = 0;
    }

    const [state, dispatch] = React.useReducer(crimeStateReducer, {});
    const { location, offense, dataType, chartType, demographic, year, showChart } = state;

    if (setInfo) {
        setInfo('Hi!');
    }
    if (setTitle) {
        setTitle('Crime Widget');
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
                    <ChartComponent
                        key={'chart' + id}
                        id={'chart' + id}
                        datasetConfig={{
                            state: location as string,
                            year: year ? (year as number) : undefined,
                            party: 'offender',
                            offense: offense as string,
                            demographic: demographic as string,
                        }}
                        url={GetURLForDataType(dataType as string)}
                        chartType={chartType as string}
                    />
                )}
            </Stack>
        </Box>
    );
};

export default CrimeWidget;
