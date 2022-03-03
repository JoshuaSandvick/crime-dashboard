"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const FBIDataController_1 = require("../controllers/FBIDataController");
const DatabaseController_1 = require("../controllers/DatabaseController");
exports.router.post("/get-demographics", FBIDataController_1.getDemographics);
exports.router.post("/get-counts", FBIDataController_1.getCount);
exports.router.post("/save-dashboard", DatabaseController_1.saveDashboard);
exports.router.post("/load-dashboard", DatabaseController_1.loadDashboard);
exports.router.post("/load-dashboards-list", DatabaseController_1.loadDashboardsList);
exports.router.post("/add-user", DatabaseController_1.addUser);
exports.default = exports.router;
