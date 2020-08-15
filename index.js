const express = require("express");
// imports
const ProjectRouter = require("./projects/projectRouter");
const ActionsRouter = require("./actions/actionsRouter");
// middlwares
const logger = require("./middleware/logger");
// init setup
const server = express();
const port = 4000;
// middlewares
server.use(express.json());
server.use(logger());

// routes
server.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to NODE API SRINT 1!",
    });
});

// cusom routes
server.use(ProjectRouter);
server.use(ActionsRouter);

// error checking
server.use((error, req, res, next) => {
    // console.log(error);
    res.status(500).json({
        message: "Something went wrong, try again later.",
        error,
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
