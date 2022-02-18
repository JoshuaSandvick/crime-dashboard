import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import {
  CreateGraphData,
  CreateCountDataAcrossYears,
  CreateCountPercentageChangedDataAcrossYears,
  DemographicDataFromCDE,
} from "./DataConverters";

function getDemographicsURL(
  offense: string,
  demographic: string,
  location: string,
  party: "offender" | "victim"
): string {
  return (
    "https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/" +
    offense +
    "/" +
    party +
    "/" +
    (location === "USA" ? "national/" : "states/" + location) +
    "/" +
    demographic +
    "?API_KEY=HjPXTM86aVOOEROPonTUllReA8n7T3mw9TcuaDtw"
  );
}

export const getDemographics = async (req: Request, res: Response) => {
  const apiResponse = await axios.get(
    getDemographicsURL(
      req.body.offense,
      req.body.demographic,
      req.body.location,
      req.body.party
    )
  );

  const dataForYear = apiResponse.data.results.find(
    (element: DemographicDataFromCDE) => element.data_year === req.body.year
  );

  res.status(200).json({
    body:
      dataForYear != undefined
        ? CreateGraphData(dataForYear, req.body.demographic)
        : {},
  });
};

export const getCount = async (req: Request, res: Response) => {
  const apiResponse = await axios.get(
    getDemographicsURL(req.body.offense, "count", req.body.location, "offender")
  );

  const results = apiResponse.data.results;

  res.status(200).json({
    body:
      results.length > 0
        ? [
            CreateCountDataAcrossYears(
              apiResponse.data.results,
              "Counts for " + req.body.location
            ),
            CreateCountPercentageChangedDataAcrossYears(
              apiResponse.data.results,
              "Percentage Changed of Counts for " + req.body.location
            ),
          ]
        : {},
  });
};
