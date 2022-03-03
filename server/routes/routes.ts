import express from "express";
export const router = express.Router();
import { getDemographics, getCount } from "../controllers/FBIDataController";
import {
  saveDashboard,
  loadDashboard,
  loadDashboardsList,
  addUser,
} from "../controllers/DatabaseController";

router.post("/get-demographics", getDemographics);
router.post("/get-counts", getCount);
router.post("/save-dashboard", saveDashboard);
router.post("/load-dashboard", loadDashboard);
router.post("/load-dashboards-list", loadDashboardsList);
router.post("/add-user", addUser);

export default router;
