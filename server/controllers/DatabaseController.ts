import { Request, Response } from "express";
import {
  saveDashboard as saveDashboardToDB,
  loadDashboard as loadDashboardFromDB,
  loadDashboardsList as loadDashboardsListFromDB,
  addUser as addUserToDB,
} from "../database/database";

export const saveDashboard = async (req: Request, res: Response) => {
  let success = true;

  try {
    success = await saveDashboardToDB(
      req.body.userID,
      req.body.dashboardID,
      req.body.widgets
    );
  } catch (error) {
    console.log(error);
  } finally {
    success ? res.status(200).json() : res.status(500).json();
  }
};

export const loadDashboard = async (req: Request, res: Response) => {
  let result: any;

  try {
    result = await loadDashboardFromDB(req.body.dashboardID);
  } catch (error) {
    console.log(error);
  } finally {
    result ? res.status(200).json({ body: result }) : res.status(500).json();
  }
};

export const loadDashboardsList = async (req: Request, res: Response) => {
  let result: any;

  try {
    result = await loadDashboardsListFromDB(req.body.userID);
  } catch (error) {
    console.log(error);
  } finally {
    result ? res.status(200).json({ body: result }) : res.status(500).json();
  }
};

export const addUser = async (req: Request, res: Response) => {
  let success = true;

  try {
    success = await addUserToDB(req.body.userID);
  } catch (error) {
    console.log(error);
  } finally {
    success ? res.status(200).json() : res.status(500).json();
  }
};
