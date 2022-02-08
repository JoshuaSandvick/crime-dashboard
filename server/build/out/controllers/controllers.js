"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.getDemographics = void 0;
const axios_1 = __importDefault(require("axios"));
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
function CreateCountData(data) {
    return {
        key: "Counts For " + data.data_year,
        values: [
            {
                label: "Count",
                value: data.count,
            },
        ],
    };
}
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
function getDemographicsURL(offense, demographic, state, party) {
    return ("https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/" +
        offense +
        "/" +
        party +
        "/" +
        (state === "national" ? "national/" : "states/" + state) +
        "/" +
        demographic +
        "?API_KEY=HjPXTM86aVOOEROPonTUllReA8n7T3mw9TcuaDtw");
}
const getDemographics = async (req, res) => {
    /*
    const demographic: string = "sex";
    const offense:
      | "aggravated-assault"
      | "kidnapping-abduction"
      | "statutory-rape"
      | "destruction-damage-vandalism-of-property"
      | "shoplifting"
      | "robbery"
      | "test-for-nothing" = "robbery";
    const state: string = "WI";
    const year: number = 2019;
    const party: "offender" | "victim" = "offender";
    */
    const apiResponse = await axios_1.default.get(getDemographicsURL(req.body.offense, req.body.demographic, req.body.state, req.body.party));
    const dataForYear = apiResponse.data.results.find((element) => element.data_year === req.body.year);
    res.status(200).json({
        body: dataForYear != undefined
            ? CreateGraphData(dataForYear, req.body.demographic)
            : {},
    });
};
exports.getDemographics = getDemographics;
/* export const getCount = async (req: Request, res: Response) => {
  const apiResponses = await Promise.allSettled([
    axios.get(
      getDemographicsURL(req.body.offense, "count", req.body.state, "offender")
    ),
    axios.get(
      getDemographicsURL(req.body.offense, "count", "national", "offender")
    ),
  ]);

  const responseValues = apiResponses
    .filter(({ status }) => status === "fulfilled")
    .map(
      (apiResponse) =>
        (apiResponse as PromiseFulfilledResult<AxiosResponse<any, any>>).value
    );

  const locations = [req.body.state, "USA"];

  const responseArray = {
    values: responseValues.map((value, i) => {
      return CreateCountDataAcrossYears(
        value.data.results,
        "Counts for " + locations[i]
      );
    }),
  };

  res.status(200).json({
    body: responseValues.length > 0 ? responseArray : {},
  });
}; */
const getCount = async (req, res) => {
    const apiResponse = await axios_1.default.get(getDemographicsURL(req.body.offense, "count", req.body.state, "offender"));
    res.status(200).json({
        body: [
            CreateCountDataAcrossYears(apiResponse.data.results, "Counts for " + req.body.state),
            CreateCountPercentageChangedDataAcrossYears(apiResponse.data.results, "Percentage Changed of Counts for " + req.body.state),
        ],
    });
};
exports.getCount = getCount;
