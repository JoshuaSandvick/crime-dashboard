import VisualizationData, { StreamDataPoint } from "./VisualizationData";

export interface DemographicDataFromCDE {
  data_year: number;
}

interface AgeDemographicDataFromCDE extends DemographicDataFromCDE {
  unknown: number;
  range_0_9: number;
  range_10_19: number;
  range_20_29: number;
  range_30_39: number;
  range_40_49: number;
  range_50_59: number;
  range_60_69: number;
  range_70_79: number;
  range_80_89: number;
  range_90_99: number;
}

interface RaceDemographicDataFromCDE extends DemographicDataFromCDE {
  unknown: number;
  asian: number;
  native_hawaiian: number;
  black: number;
  american_indian: number;
  white: number;
}

interface SexDemographicDataFromCDE extends DemographicDataFromCDE {
  unknown: number;
  male_count: number;
  female_count: number;
}

interface CountDataFromCDE extends DemographicDataFromCDE {
  count: number;
}

function CreateAgeData(apiData: AgeDemographicDataFromCDE): VisualizationData {
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

function CreateRaceData(
  apiData: RaceDemographicDataFromCDE
): VisualizationData {
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

function CreateSexData(apiData: SexDemographicDataFromCDE): VisualizationData {
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

export function CreateGraphData(
  data: DemographicDataFromCDE,
  demographic: string
): VisualizationData {
  switch (demographic) {
    case "age": {
      return CreateAgeData(data as AgeDemographicDataFromCDE);
    }
    case "race": {
      return CreateRaceData(data as RaceDemographicDataFromCDE);
    }
    case "sex": {
      return CreateSexData(data as SexDemographicDataFromCDE);
    }
    default: {
      return { key: "error" };
    }
  }
}

export function CreateCountDataAcrossYears(
  data: CountDataFromCDE[],
  key: string | number
): VisualizationData {
  const countsAcrossYears: StreamDataPoint[] = [];
  let dataForYear: CountDataFromCDE | undefined = undefined;

  for (let year = 2020; year >= 2015; year--) {
    dataForYear = data.find(
      (element: DemographicDataFromCDE) => element.data_year === year
    );

    if (dataForYear != undefined) {
      countsAcrossYears.unshift({ x: year, y: dataForYear.count });
    } else {
      break;
    }
  }

  return { key: key, values: countsAcrossYears };
}

export function CreateCountPercentageChangedDataAcrossYears(
  data: CountDataFromCDE[],
  key: string | number
): VisualizationData {
  const countsAcrossYears: StreamDataPoint[] = [];

  // Grab data for the first year
  let dataForYear: CountDataFromCDE | undefined = data.find(
    (element: DemographicDataFromCDE) => element.data_year === 2020
  );

  for (let year = 2020; year >= 2015; year--) {
    const dataForPreviousYear = data.find(
      (element: DemographicDataFromCDE) => element.data_year === year - 1
    );

    if (dataForPreviousYear != undefined && dataForYear != undefined) {
      countsAcrossYears.unshift({
        x: year,
        y:
          ((dataForYear.count - dataForPreviousYear.count) /
            dataForPreviousYear.count) *
          100,
      });
      dataForYear = dataForPreviousYear;
    } else {
      break;
    }
  }

  return { key: key, values: countsAcrossYears };
}
