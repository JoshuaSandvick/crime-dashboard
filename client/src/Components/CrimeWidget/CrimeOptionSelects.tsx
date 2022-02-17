import React from 'react';
import GenericSelect from './GenericSelect';
import CrimeOptionSet from './CrimeOptionSet';
import { CrimeWidgetState, CrimeWidgetAction } from './CrimeWidget';
import { Stack } from '@mui/material';

interface CrimeOptionSelectsProps {
    parentState: CrimeWidgetState;
    dispatch: React.Dispatch<CrimeWidgetAction>;
}

const CrimeOptionSelects: React.FC<CrimeOptionSelectsProps> = ({ parentState, dispatch }) => {
    const { location, offense, dataType, chartType, year, demographic } = parentState;

    return (
        <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
            <GenericSelect
                title="Offense"
                value={offense}
                handleSelect={(event) =>
                    dispatch({
                        type: 'setOffense',
                        value: event.target.value as string,
                    })
                }
                options={CrimeOptionSet.offenseTypes}
                sx={{ flexGrow: 1 }}
            />
            <GenericSelect
                title="State"
                value={location}
                handleSelect={(event) =>
                    dispatch({
                        type: 'setLocation',
                        value: event.target.value as string,
                    })
                }
                options={CrimeOptionSet.states}
                sx={{ flexGrow: 1 }}
            />
            {dataType === 'OffenderDemographics' || dataType === 'VictimDemographics' ? (
                <>
                    <GenericSelect
                        title="Demographic"
                        value={demographic}
                        handleSelect={(event) =>
                            dispatch({
                                type: 'setDemographic',
                                value: event.target.value as string,
                            })
                        }
                        options={CrimeOptionSet.demographicTypes}
                        sx={{ flexGrow: 1 }}
                    />
                    <GenericSelect
                        title="Year"
                        value={year}
                        handleSelect={(event) =>
                            dispatch({
                                type: 'setYear',
                                value: event.target.value as string,
                            })
                        }
                        options={CrimeOptionSet.allowedYears}
                        sx={{ flexGrow: 1 }}
                    />
                    <GenericSelect
                        title="Chart"
                        value={chartType}
                        handleSelect={(event) =>
                            dispatch({
                                type: 'setChartType',
                                value: event.target.value as string,
                            })
                        }
                        options={CrimeOptionSet.demographicChartTypes}
                        sx={{ flexGrow: 1 }}
                    />
                </>
            ) : (
                <></>
            )}
        </Stack>
    );
};

export default CrimeOptionSelects;
