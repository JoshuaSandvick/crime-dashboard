import React, { ReactElement } from 'react';
import { ChartComponent } from './ChartTypes/Chart';

type ChartType = 'DonutChart' | 'BarChart' | 'MultiBarChart' | 'LinePlusBarChart' | 'none';
type DataType = 'CountsOfOffense' | 'OffenderDemographics' | 'VictimDemographics' | 'none';

const DataTypes = {
    CountsOfOffense: 'CountsOfOffense',
    OffenderDemographics: 'OffenderDemographics',
    VictimDemographics: 'VictimDemographics',
    None: 'none',
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
    None: 'none',
};

type OffenseType =
    | 'aggravated-assault'
    | 'kidnapping-abduction'
    | 'destruction-damage-vandalism-of-property'
    | 'statutory-rape'
    | 'robbery'
    | 'shoplifting'
    | 'none';

const DemographicTypes = {
    Age: 'age',
    Race: 'race',
    Sex: 'sex',
    Count: 'count',
    None: 'none',
};

type DemographicType = 'age' | 'race' | 'sex' | 'count' | 'none'; // | "relationship"

type Year = 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 'all' | 'none';
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
    id: string;
}

const ComponentWidget: React.FC<ComponentWidgetProps> = (props) => {
    const { id } = props;
    const [chartType, setChartType] = React.useState<ChartType>('none');
    const [offense, setOffense] = React.useState<OffenseType>('none');
    const [state, setState] = React.useState<string>('none');
    const [demographic, setDemographic] = React.useState<DemographicType>('none');
    const [dataType, setDataType] = React.useState<DataType>('none');
    const [year, setYear] = React.useState<Year>('none');

    function resetState(): void {
        setChartType('none');
        setOffense(OffenseTypes.None as OffenseType);
        setState('none');
        setDemographic(DemographicTypes.None as DemographicType);
        setDataType(DataTypes.None as DataType);
        setYear('none');
    }

    function getDatasetSelectJSX(): ReactElement {
        return (
            <select
                key={'datasetSelect' + id}
                id={'datasetSelect' + id}
                onChange={handleDatasetSelect}
            >
                <option value="none">Select...</option>
                <option value="CountsOfOffense">Counts of Offense</option>
                <option value="OffenderDemographics">Demographics of Offenders</option>
                <option value="VictimDemographics">Demographics of Victims</option>
            </select>
        );
    }

    function handleDatasetSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
        const selectedDataType: DataType = event.target.value as DataType;
        setDataType(selectedDataType);
        if (selectedDataType === DataTypes.CountsOfOffense) {
            setChartType('LinePlusBarChart' as ChartType);
            setDemographic(DemographicTypes.Count as DemographicType);
            setYear('all');
        }
    }

    function getChartSelectJSX(dataType: DataType): ReactElement {
        switch (dataType) {
            case DataTypes.OffenderDemographics:
            case DataTypes.VictimDemographics:
                return (
                    <select
                        key={'chartSelect' + id}
                        id={'chartSelect' + id}
                        onChange={(event) => setChartType(event.target.value as ChartType)}
                    >
                        <option value="none">Select...</option>
                        <option value="BarChart">Bar Chart</option>
                        <option value="DonutChart">Donut Chart</option>
                    </select>
                );
            default:
                return <></>;
        }
    }

    function getStateSelectJSX(): ReactElement {
        return (
            <select
                key={'stateSelect' + id}
                id={'stateSelect' + id}
                onChange={(event) => setState(event.target.value)}
            >
                <option value="none">Select...</option>
                {Object.keys(States).map((state: string) => (
                    <option value={state}>{States[state]}</option>
                ))}
            </select>
        );
    }

    function getDemographicSelectJSX(): ReactElement {
        return (
            <select
                key={'demographicSelect' + id}
                id={'demographicSelect' + id}
                onChange={(event) => setDemographic(event.target.value as DemographicType)}
            >
                <option value={DemographicTypes.None}>Select...</option>
                <option value={DemographicTypes.Age}>Age</option>
                <option value={DemographicTypes.Race}>Race</option>
                <option value={DemographicTypes.Sex}>Sex</option>
            </select>
        );
    }

    function getOffenseSelectJSX(): ReactElement {
        return (
            <select
                key={'offenseSelect' + id}
                id={'offenseSelect' + id}
                onChange={(event) => setOffense(event.target.value as OffenseType)}
            >
                <option value={OffenseTypes.None}>Select...</option>
                <option value={OffenseTypes.AggravatedAssault}>Aggravated Assault</option>
                <option value={OffenseTypes.Kidnapping}>Kidnapping</option>
                <option value={OffenseTypes.Rape}>Rape</option>
                <option value={OffenseTypes.Robbery}>Robbery</option>
                <option value={OffenseTypes.Shoplifting}>Shoplifting</option>
                <option value={OffenseTypes.Vandalism}>Vandalism</option>
            </select>
        );
    }

    function getYearSelectJSX(): ReactElement {
        return (
            <select
                key={'yearSelect' + id}
                id={'yearSelect' + id}
                onChange={(event) =>
                    setYear(
                        event.target.value !== 'none'
                            ? (parseInt(event.target.value) as Year)
                            : 'none',
                    )
                }
            >
                <option key={'yearSelectionOption' + id + '_none'} value="none">
                    Select year...
                </option>
                {allowedYears.map((year: number, i: number) => (
                    <option key={'yearSelectionOption' + id + '_' + i} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        );
    }

    function getDataOptionsSelectJSX(dataType: DataType): ReactElement[] {
        const jsxElements: ReactElement[] = [];
        jsxElements.push(
            <button type="button" key={'resetState' + id} onClick={resetState}>
                Remove
            </button>,
        );

        switch (dataType) {
            case DataTypes.CountsOfOffense:
                jsxElements.push(getOffenseSelectJSX());
                jsxElements.push(getStateSelectJSX());
                break;
            case DataTypes.OffenderDemographics:
            case DataTypes.VictimDemographics:
                jsxElements.push(getOffenseSelectJSX());
                jsxElements.push(getStateSelectJSX());
                jsxElements.push(getDemographicSelectJSX());
                jsxElements.push(getYearSelectJSX());
                jsxElements.push(getChartSelectJSX(dataType));
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
                    state: state,
                    year: year !== 'all' ? (year as number) : undefined,
                    party: 'offender',
                    offense: offense,
                    demographic: demographic,
                }}
                url={GetURLForDataType(dataType)}
                chartType={chartType}
            />
        );
    }

    return (
        <div>
            {dataType === 'none' ? getDatasetSelectJSX() : getDataOptionsSelectJSX(dataType)}
            {state !== 'none' &&
            demographic !== DemographicTypes.None &&
            offense !== OffenseTypes.None &&
            chartType !== 'none' &&
            year !== 'none' ? (
                getChartJSX(chartType)
            ) : (
                <></>
            )}
        </div>
    );
};

export default ComponentWidget;
