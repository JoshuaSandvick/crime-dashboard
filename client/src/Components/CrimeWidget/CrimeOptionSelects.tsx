import React from 'react';
import GenericSelect from './GenericSelect';
import CrimeOptionSet from './CrimeOptionSet';
import { CrimeWidgetState, CrimeWidgetAction } from './CrimeWidget';
import { Grid } from '@mui/material';

interface CrimeOptionSelectsProps {
    parentState: CrimeWidgetState;
    dispatch: React.Dispatch<CrimeWidgetAction>;
}

const CrimeOptionSelects: React.FC<CrimeOptionSelectsProps> = ({ parentState, dispatch }) => {
    const { location, offense, dataType, chartType, year, demographic } = parentState;

    return (
        <Grid container spacing={{ xs: 0.5 }} columns={{ xs: 3 }} justifyContent="center">
            <Grid item xs={1}>
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
                    sx={{ width: '100%' }}
                />
            </Grid>
            <Grid item xs={1} sx={{ flexGrow: 1 }}>
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
                    sx={{ width: '100%' }}
                />
            </Grid>
            {dataType === 'OffenderDemographics' || dataType === 'VictimDemographics' ? (
                <>
                    <Grid item xs={1}>
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
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    <Grid item xs={1}>
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
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={1}>
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
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                </>
            ) : (
                <></>
            )}
        </Grid>
    );
};

export default CrimeOptionSelects;
