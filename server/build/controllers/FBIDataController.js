"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.getDemographics = void 0;
const axios_1 = __importDefault(require("axios"));
const DataConverters_1 = require("./DataConverters");
const database_1 = require("../database/database");
function getDemographicsURL(offense, demographic, location, party) {
    return ("https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/" +
        offense +
        "/" +
        party +
        "/" +
        (location === "USA" ? "national/" : "states/" + location) +
        "/" +
        demographic +
        "?API_KEY=" +
        process.env.CDE_API_KEY);
}
const getDemographics = async (req, res) => {
    let dataForYear = undefined;
    let responseBody = {};
    try {
        const apiResponse = await axios_1.default.get(getDemographicsURL(req.body.offense, req.body.demographic, req.body.location, req.body.party));
        dataForYear = apiResponse.data.results.find((element) => element.data_year === req.body.year);
        if (dataForYear != undefined) {
            responseBody = (0, DataConverters_1.CreateGraphData)(dataForYear, req.body.demographic);
        }
    }
    catch (error) {
        console.log(error.toJSON());
    }
    finally {
        res.status(200).json({
            body: responseBody,
        });
    }
};
exports.getDemographics = getDemographics;
const getCount = async (req, res) => {
    let responseBody = {};
    (0, database_1.getUsers)();
    try {
        const apiResponse = await axios_1.default.get(getDemographicsURL(req.body.offense, "count", req.body.location, "offender"));
        const results = apiResponse.data.results;
        if (results.length > 0) {
            responseBody = [
                (0, DataConverters_1.CreateCountDataAcrossYears)(apiResponse.data.results, "Counts for " + req.body.location),
                (0, DataConverters_1.CreateCountPercentageChangedDataAcrossYears)(apiResponse.data.results, "Percentage Changed of Counts for " + req.body.location),
            ];
        }
    }
    catch (error) {
        console.log(error.toJSON());
    }
    finally {
        res.status(200).json({
            body: responseBody,
        });
    }
};
exports.getCount = getCount;
