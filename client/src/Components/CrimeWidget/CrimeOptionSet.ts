import { SelectOption } from './GenericSelect';

abstract class CrimeOptionSet {
    static datasetTypes: SelectOption[] = [
        { value: 'CountsOfOffense', displayValue: 'Counts of Offense' },
        { value: 'OffenderDemographics', displayValue: 'Offender Demographics' },
        { value: 'VictimDemographics', displayValue: 'Victim Demographics' },
    ];

    static demographicChartTypes: SelectOption[] = [
        { value: 'BarChart', displayValue: 'Bar Chart' },
        { value: 'DonutChart', displayValue: 'Donut Chart' },
    ];

    static countsOfOffenseChartTypes: SelectOption[] = [
        { value: 'LinePlusBarChart', displayValue: 'Line and Bar Chart' },
    ];

    static offenseTypes: SelectOption[] = [
        { value: 'aggravated-assault', displayValue: 'Aggravated Assault' },
        { value: 'kidnapping-abduction', displayValue: 'Kidnapping' },
        { value: 'destruction-damage-vandalism-of-property', displayValue: 'Vandalism' },
        { value: 'statutory-rape', displayValue: 'Rape' },
        { value: 'robbery', displayValue: 'Robbery' },
        { value: 'shoplifting', displayValue: 'Shoplifting' },
    ];

    static demographicTypes: SelectOption[] = [
        { value: 'age', displayValue: 'Age' },
        { value: 'race', displayValue: 'Race' },
        { value: 'sex', displayValue: 'Sex' },
        //{ value: 'relationship', displayValue: 'Relationship' },
    ];

    static allowedYears: SelectOption[] = [
        { value: 2015, displayValue: 2015 },
        { value: 2016, displayValue: 2016 },
        { value: 2017, displayValue: 2017 },
        { value: 2018, displayValue: 2018 },
        { value: 2019, displayValue: 2019 },
        { value: 2020, displayValue: 2020 },
    ];

    static locations: SelectOption[] = [
        { value: 'USA', displayValue: 'United States of America' },
        { value: 'AL', displayValue: 'Alabama' },
        { value: 'AK', displayValue: 'Alaska' },
        { value: 'AZ', displayValue: 'Arizona' },
        { value: 'AR', displayValue: 'Arkansas' },
        { value: 'CA', displayValue: 'California' },
        { value: 'CO', displayValue: 'Colorado' },
        { value: 'CT', displayValue: 'Connecticut' },
        { value: 'DE', displayValue: 'Delaware' },
        { value: 'DC', displayValue: 'District Of Columbia' },
        { value: 'FL', displayValue: 'Florida' },
        { value: 'GA', displayValue: 'Georgia' },
        { value: 'GU', displayValue: 'Guam' },
        { value: 'HI', displayValue: 'Hawaii' },
        { value: 'ID', displayValue: 'Idaho' },
        { value: 'IL', displayValue: 'Illinois' },
        { value: 'IN', displayValue: 'Indiana' },
        { value: 'IA', displayValue: 'Iowa' },
        { value: 'KS', displayValue: 'Kansas' },
        { value: 'KY', displayValue: 'Kentucky' },
        { value: 'LA', displayValue: 'Louisiana' },
        { value: 'ME', displayValue: 'Maine' },
        { value: 'MD', displayValue: 'Maryland' },
        { value: 'MA', displayValue: 'Massachusetts' },
        { value: 'MI', displayValue: 'Michigan' },
        { value: 'MN', displayValue: 'Minnesota' },
        { value: 'MS', displayValue: 'Mississippi' },
        { value: 'MO', displayValue: 'Missouri' },
        { value: 'MT', displayValue: 'Montana' },
        { value: 'NE', displayValue: 'Nebraska' },
        { value: 'NV', displayValue: 'Nevada' },
        { value: 'NH', displayValue: 'New Hampshire' },
        { value: 'NJ', displayValue: 'New Jersey' },
        { value: 'NM', displayValue: 'New Mexico' },
        { value: 'NY', displayValue: 'New York' },
        { value: 'NC', displayValue: 'North Carolina' },
        { value: 'ND', displayValue: 'North Dakota' },
        { value: 'MP', displayValue: 'Northern Mariana Islands' },
        { value: 'OH', displayValue: 'Ohio' },
        { value: 'OK', displayValue: 'Oklahoma' },
        { value: 'OR', displayValue: 'Oregon' },
        { value: 'PA', displayValue: 'Pennsylvania' },
        { value: 'PR', displayValue: 'Puerto Rico' },
        { value: 'RI', displayValue: 'Rhode Island' },
        { value: 'SC', displayValue: 'South Carolina' },
        { value: 'SD', displayValue: 'South Dakota' },
        { value: 'TN', displayValue: 'Tennessee' },
        { value: 'TX', displayValue: 'Texas' },
        { value: 'UT', displayValue: 'Utah' },
        { value: 'VT', displayValue: 'Vermont' },
        { value: 'VI', displayValue: 'Virgin Islands' },
        { value: 'VA', displayValue: 'Virginia' },
        { value: 'WA', displayValue: 'Washington' },
        { value: 'WV', displayValue: 'West Virginia' },
        { value: 'WI', displayValue: 'Wisconsin' },
        { value: 'WY', displayValue: 'Wyoming' },
    ];
}

export default CrimeOptionSet;
