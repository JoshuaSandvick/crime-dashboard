import React, { ReactElement } from 'react';
import { ChartComponent } from './Chart';
import {
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    Fab,
    IconButton,
    Stack,
    Box,
    Paper,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { InfoButton } from './InfoButton';

type ChartType = 'DonutChart' | 'BarChart' | 'MultiBarChart' | 'LinePlusBarChart';
type DataType = 'CountsOfOffense' | 'OffenderDemographics' | 'VictimDemographics';

const DataTypes = {
    CountsOfOffense: 'CountsOfOffense',
    OffenderDemographics: 'OffenderDemographics',
    VictimDemographics: 'VictimDemographics',
};

function GetURLForDataType(dataType: DataType): string {
    switch (dataType) {
        case DataTypes.CountsOfOffense:
            return '/api/v1/get-counts';
        case DataTypes.OffenderDemographics:
            return '/api/v1/get-demographics';
        case DataTypes.VictimDemographics:
            return '/api/v1/get-demographics';
        default:
            return '';
    }
}

const OffenseTypes = {
    AggravatedAssault: 'aggravated-assault',
    Kidnapping: 'kidnapping-abduction',
    Vandalism: 'destruction-damage-vandalism-of-property',
    Rape: 'statutory-rape',
    Robbery: 'robbery',
    Shoplifting: 'shoplifting',
};

type OffenseType =
    | 'aggravated-assault'
    | 'kidnapping-abduction'
    | 'destruction-damage-vandalism-of-property'
    | 'statutory-rape'
    | 'robbery'
    | 'shoplifting';

const DemographicTypes = {
    Age: 'age',
    Race: 'race',
    Sex: 'sex',
    Count: 'count',
};

type DemographicType = 'age' | 'race' | 'sex' | 'count'; // | "relationship"

type Year = 2015 | 2016 | 2017 | 2018 | 2019 | 2020;
const allowedYears: number[] = [2015, 2016, 2017, 2018, 2019, 2020];

const States: any = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
    FM: 'Federated States Of Micronesia',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PW: 'Palau',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VI: 'Virgin Islands',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
};

export interface ComponentWidgetProps {
    id: number;
    isActivatedCallback(id: number): void;
    isRemovedCallback(id: number): void;
}

const ComponentWidget: React.FC<ComponentWidgetProps> = (props) => {
    const { id, isActivatedCallback, isRemovedCallback } = props;
    const [isActivated, setIsActivated] = React.useState<boolean>(false);
    const [chartType, setChartType] = React.useState<ChartType>();
    const [offense, setOffense] = React.useState<OffenseType>();
    const [state, setState] = React.useState<string>();
    const [demographic, setDemographic] = React.useState<DemographicType>();
    const [dataType, setDataType] = React.useState<DataType>();
    const [year, setYear] = React.useState<Year>();

    function resetState(): void {
        setChartType(undefined);
        setOffense(undefined);
        setState(undefined);
        setDemographic(undefined);
        setDataType(undefined);
        setYear(undefined);
    }

    function getCreateGraphJSX(): ReactElement {
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
                        Create Graph
                    </Fab>
                </Box>
            </Box>
        );
    }

    function getDatasetSelectJSX(): ReactElement {
        return (
            <Box display="flex" justifyContent="center" flexDirection="column" height="100%">
                <Box display="flex" justifyContent="center">
                    <FormControl fullWidth={false} sx={{ width: '50%' }}>
                        <InputLabel id={'datasetSelectLabel' + id}>Dataset</InputLabel>
                        <Select
                            labelId={'datasetSelectLabel' + id}
                            id={'datasetSelect' + id}
                            value={dataType}
                            label="Dataset"
                            onChange={handleDatasetSelect}
                        >
                            <MenuItem value="CountsOfOffense">Counts of Offense</MenuItem>
                            <MenuItem value="OffenderDemographics">
                                Demographics of Offenders
                            </MenuItem>
                            <MenuItem value="VictimDemographics">Demographics of Victims</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    function handleDatasetSelect(event: SelectChangeEvent<string>): void {
        const selectedDataType: DataType = event.target.value as DataType;
        setDataType(selectedDataType);
        if (selectedDataType === DataTypes.CountsOfOffense) {
            setChartType('LinePlusBarChart' as ChartType);
            setDemographic(DemographicTypes.Count as DemographicType);
        }
    }

    function getChartSelectJSX(dataType: DataType): ReactElement {
        switch (dataType) {
            case DataTypes.OffenderDemographics:
            case DataTypes.VictimDemographics:
                return (
                    <FormControl fullWidth={false} size="small" sx={{ flexGrow: 1 }}>
                        <InputLabel id={'chartSelectLabel' + id}>Chart</InputLabel>
                        <Select
                            labelId={'chartSelectLabel' + id}
                            id={'chartSelect' + id}
                            value={chartType}
                            label="Chart"
                            onChange={(event) => setChartType(event.target.value as ChartType)}
                        >
                            <MenuItem value="BarChart">Bar Chart</MenuItem>
                            <MenuItem value="DonutChart">Donut Chart</MenuItem>
                        </Select>
                    </FormControl>
                );
            default:
                return <></>;
        }
    }

    function getStateSelectJSX(): ReactElement {
        return (
            <FormControl fullWidth={false} size="small" sx={{ flexGrow: 1 }}>
                <InputLabel id={'stateSelectLabel' + id}>State</InputLabel>
                <Select
                    labelId={'stateSelectLabel' + id}
                    id={'stateSelect' + id}
                    value={state}
                    label="State"
                    onChange={(event) => setState(event.target.value)}
                >
                    {Object.keys(States).map((state: string) => (
                        <MenuItem value={state}>{States[state]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    function getDemographicSelectJSX(): ReactElement {
        return (
            <FormControl fullWidth={false} size="small" sx={{ flexGrow: 1 }}>
                <InputLabel id={'demographicSelectLabel' + id}>Demographic</InputLabel>
                <Select
                    labelId={'demographicSelectLabel' + id}
                    id={'demographicSelect' + id}
                    value={demographic}
                    label="Demographic"
                    onChange={(event) => setDemographic(event.target.value as DemographicType)}
                >
                    <MenuItem value={DemographicTypes.Age}>Age</MenuItem>
                    <MenuItem value={DemographicTypes.Race}>Race</MenuItem>
                    <MenuItem value={DemographicTypes.Sex}>Sex</MenuItem>
                </Select>
            </FormControl>
        );
    }

    function getOffenseSelectJSX(): ReactElement {
        return (
            <FormControl fullWidth={false} size="small" sx={{ flexGrow: 1 }}>
                <InputLabel id={'offenseSelectLabel' + id}>Offense</InputLabel>
                <Select
                    labelId={'offenseSelectLabel' + id}
                    id={'offenseSelect' + id}
                    value={offense}
                    label="Offense"
                    onChange={(event) => setOffense(event.target.value as OffenseType)}
                >
                    <MenuItem value={OffenseTypes.AggravatedAssault}>Aggravated Assault</MenuItem>
                    <MenuItem value={OffenseTypes.Kidnapping}>Kidnapping</MenuItem>
                    <MenuItem value={OffenseTypes.Rape}>Rape</MenuItem>
                    <MenuItem value={OffenseTypes.Robbery}>Robbery</MenuItem>
                    <MenuItem value={OffenseTypes.Shoplifting}>Shoplifting</MenuItem>
                    <MenuItem value={OffenseTypes.Vandalism}>Vandalism</MenuItem>
                </Select>
            </FormControl>
        );
    }

    function getYearSelectJSX(): ReactElement {
        return (
            <FormControl fullWidth={false} size="small" sx={{ flexGrow: 1 }}>
                <InputLabel id={'yearSelectLabel' + id}>Year</InputLabel>
                <Select
                    labelId={'yearSelectLabel' + id}
                    id={'yearSelect' + id}
                    value={year}
                    label="Year"
                    onChange={(event) => setYear(event.target.value as Year)}
                >
                    {allowedYears.map((year: number, i: number) => (
                        <MenuItem key={'yearSelectionOption' + id + '_' + i} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    function getHeaderJSX(): ReactElement {
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
                <InfoButton />
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    sx={{ flexGrow: 1 }}
                >
                    <Typography component="div" variant="h5" align="center">
                        Offender Demographics
                    </Typography>
                </Box>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="clear"
                    sx={{ mr: 2, margin: 0 }}
                    key={'resetState' + id}
                    onClick={() => {
                        resetState();
                        isRemovedCallback(id);
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </Box>
        );
    }

    function getDataOptionsSelectJSX(dataType: DataType): ReactElement[] {
        const jsxElements: ReactElement[] = [];

        switch (dataType) {
            case DataTypes.CountsOfOffense:
                jsxElements.push(
                    <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
                        {getOffenseSelectJSX()}
                        {getStateSelectJSX()}
                    </Stack>,
                );
                break;
            case DataTypes.OffenderDemographics:
            case DataTypes.VictimDemographics:
                jsxElements.push(
                    <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
                        {getOffenseSelectJSX()}
                        {getStateSelectJSX()}
                        {getDemographicSelectJSX()}
                        {getYearSelectJSX()}
                        {getChartSelectJSX(dataType)}
                    </Stack>,
                );
                break;
            default:
                break;
        }

        return jsxElements;
    }

    function getChartJSX(chartType: ChartType): ReactElement {
        return (
            <ChartComponent
                key={'chart' + id}
                id={'chart' + id}
                datasetConfig={{
                    state: state as string,
                    year: year ? (year as number) : undefined,
                    party: 'offender',
                    offense: offense as string,
                    demographic: demographic as string,
                }}
                url={GetURLForDataType(dataType as DataType)}
                chartType={chartType}
            />
        );
    }

    function renderContent(): ReactElement {
        if (!isActivated) {
            return getCreateGraphJSX();
        }

        if (!dataType) {
            return getDatasetSelectJSX();
        }

        return (
            <Paper sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {getHeaderJSX()}
                    <Box sx={{ flexGrow: 1, padding: '0 5px 0 5px' }}>
                        <Stack spacing={0} sx={{ height: '100%' }}>
                            {getDataOptionsSelectJSX(dataType)}
                            {state &&
                            demographic &&
                            offense &&
                            chartType &&
                            (year || dataType === DataTypes.CountsOfOffense) ? (
                                getChartJSX(chartType)
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        );
    }

    return renderContent();
};

export default ComponentWidget;
