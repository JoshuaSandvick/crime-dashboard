"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes"));
// Create a new express application named 'app'
const app = (0, express_1.default)();
// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;
// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});
// Configure the bodyParser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
// Configure the CORs middleware
app.use((0, cors_1.default)());
// Configure app to use route
app.use("/api/v1/", routes_1.default);
// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/../../client/build")));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
    });
}
// Catch any bad requests
app.get("*", (req, res) => {
    res.status(200).json({
        msg: "Catch All",
    });
});
// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
