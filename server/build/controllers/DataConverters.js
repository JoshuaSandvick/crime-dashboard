"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCountPercentageChangedDataAcrossYears = exports.CreateCountDataAcrossYears = exports.CreateGraphData = void 0;
function CreateAgeData(apiData) {
    return {
        key: "Age Demographic Data For " + apiData.data_year,
        values: [
            {
                label: "Unknown",
                value: apiData.unknown,
            },
            {
                label: "0-9",
                value: apiData.range_0_9,
            },
            {
                label: "10-19",
                value: apiData.range_10_19,
            },
            {
                label: "20-29",
                value: apiData.range_20_29,
            },
            {
                label: "30-39",
                value: apiData.range_30_39,
            },
            {
                label: "40-49",
                value: apiData.range_40_49,
            },
            {
                label: "50-59",
                value: apiData.range_50_59,
            },
            {
                label: "60-69",
                value: apiData.range_60_69,
            },
            {
                label: "70-79",
                value: apiData.range_70_79,
            },
            {
                label: "80-89",
                value: apiData.range_80_89,
            },
            {
                label: "90-99",
                value: apiData.range_90_99,
            },
        ],
    };
}
function CreateRaceData(apiData) {
    return {
        key: "Race Demographic Data For " + apiData.data_year,
        values: [
            {
                label: "Unknown",
                value: apiData.unknown,
            },
            {
                label: "Asian",
                value: apiData.asian,
            },
            {
                label: "Native Hawaiian",
                value: apiData.native_hawaiian,
            },
            {
                label: "Black",
                value: apiData.black,
            },
            {
                label: "American Indian",
                value: apiData.american_indian,
            },
            {
                label: "White",
                value: apiData.white,
            },
        ],
    };
}
function CreateSexData(apiData) {
    return {
        key: "Sex Demographic Data For " + apiData.data_year,
        values: [
            {
                label: "Unknown",
                value: apiData.unknown,
            },
            {
                label: "Male",
                value: apiData.male_count,
            },
            {
                label: "Female",
                value: apiData.female_count,
            },
        ],
    };
}
function CreateGraphData(data, demographic) {
    switch (demographic) {
        case "age": {
            return CreateAgeData(data);
        }
        case "race": {
            return CreateRaceData(data);
        }
        case "sex": {
            return CreateSexData(data);
        }
        default: {
            return { key: "error" };
        }
    }
}
exports.CreateGraphData = CreateGraphData;
function CreateCountDataAcrossYears(data, key) {
    const countsAcrossYears = [];
    let dataForYear = undefined;
    for (let year = 2020; year >= 2015; year--) {
        dataForYear = data.find((element) => element.data_year === year);
        if (dataForYear != undefined) {
            countsAcrossYears.unshift({ x: year, y: dataForYear.count });
        }
        else {
            break;
        }
    }
    return { key: key, values: countsAcrossYears };
}
exports.CreateCountDataAcrossYears = CreateCountDataAcrossYears;
function CreateCountPercentageChangedDataAcrossYears(data, key) {
    const countsAcrossYears = [];
    // Grab data for the first year
    let dataForYear = data.find((element) => element.data_year === 2020);
    for (let year = 2020; year >= 2015; year--) {
        const dataForPreviousYear = data.find((element) => element.data_year === year - 1);
        if (dataForPreviousYear != undefined && dataForYear != undefined) {
            countsAcrossYears.unshift({
                x: year,
                y: ((dataForYear.count - dataForPreviousYear.count) /
                    dataForPreviousYear.count) *
                    100,
            });
            dataForYear = dataForPreviousYear;
        }
        else {
            break;
        }
    }
    return { key: key, values: countsAcrossYears };
}
exports.CreateCountPercentageChangedDataAcrossYears = CreateCountPercentageChangedDataAcrossYears;
