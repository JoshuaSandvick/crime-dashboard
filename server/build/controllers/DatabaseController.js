"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.loadDashboardsList = exports.loadDashboard = exports.saveDashboard = void 0;
const database_1 = require("../database/database");
const saveDashboard = async (req, res) => {
    let success = true;
    try {
        success = await (0, database_1.saveDashboard)(req.body.userID, req.body.dashboardID, req.body.widgets);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        success ? res.status(200).json() : res.status(500).json();
    }
};
exports.saveDashboard = saveDashboard;
const loadDashboard = async (req, res) => {
    let result;
    try {
        result = await (0, database_1.loadDashboard)(req.body.dashboardID);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        result ? res.status(200).json({ body: result }) : res.status(500).json();
    }
};
exports.loadDashboard = loadDashboard;
const loadDashboardsList = async (req, res) => {
    let result;
    try {
        result = await (0, database_1.loadDashboardsList)(req.body.userID);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        result ? res.status(200).json({ body: result }) : res.status(500).json();
    }
};
exports.loadDashboardsList = loadDashboardsList;
const addUser = async (req, res) => {
    let success = true;
    try {
        success = await (0, database_1.addUser)(req.body.userID);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        success ? res.status(200).json() : res.status(500).json();
    }
};
exports.addUser = addUser;
