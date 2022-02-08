import express from "express";
export const router = express.Router();
import { getDemographics, getCount } from "./../controllers/controllers";

router.post("/get-demographics", getDemographics);
router.post("/get-counts", getCount);

module.exports = router;
