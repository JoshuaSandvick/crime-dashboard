import { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import {
  CreateGraphData,
  CreateCountDataAcrossYears,
  CreateCountPercentageChangedDataAcrossYears,
  DemographicDataFromCDE,
} from "./DataConverters";
import VisualizationData from "./VisualizationData";
import { getUsers } from "../database/database";

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
  let dataForYear = undefined;
  let responseBody: VisualizationData | {} = {};

  try {
    const apiResponse = await axios.get(
      getDemographicsURL(
        req.body.offense,
        req.body.demographic,
        req.body.location,
        req.body.party
      )
    );

    dataForYear = apiResponse.data.results.find(
      (element: DemographicDataFromCDE) => element.data_year === req.body.year
    );

    if (dataForYear != undefined) {
      responseBody = CreateGraphData(dataForYear, req.body.demographic);
    }
  } catch (error) {
    console.log((error as AxiosError).toJSON());
  } finally {
    res.status(200).json({
      body: responseBody,
    });
  }
};

export const getCount = async (req: Request, res: Response) => {
  let responseBody: VisualizationData[] | {} = {};

  getUsers();

  try {
    const apiResponse = await axios.get(
      getDemographicsURL(
        req.body.offense,
        "count",
        req.body.location,
        "offender"
      )
    );

    const results = apiResponse.data.results;
    if (results.length > 0) {
      responseBody = [
        CreateCountDataAcrossYears(
          apiResponse.data.results,
          "Counts for " + req.body.location
        ),
        CreateCountPercentageChangedDataAcrossYears(
          apiResponse.data.results,
          "Percentage Changed of Counts for " + req.body.location
        ),
      ];
    }
  } catch (error) {
    console.log((error as AxiosError).toJSON());
  } finally {
    res.status(200).json({
      body: responseBody,
    });
  }
};
