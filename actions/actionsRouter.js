const express = require("express");
const ProjectModel = require("../data/helpers/projectModel");
const actionsModel = require("../data/helpers/actionModel");

const router = express.Router();

// fetch single actions
router.get("/projects/:projectID/actions/:id", async (req, res, next) => {
    const actions = await actionsModel.get(req.params.id);

    if (actions === null) {
        return res.status(400).json({
            message: "No action found!",
        });
    } else {
        return res.status(200).json(actions);
    }
});

// post an action based on project ID
router.post("/projects/:id/actions", validateBody(), async (req, res, next) => {
    // const project = req.project;

    const combinedAction = {
        project_id: req.params.id,
        ...req.body,
    };

    const action = actionsModel.insert(combinedAction);

    if (action === null) {
        return res.status(500).json({
            message: "Error",
        });
    } else {
        return res.status(200).json(action);
    }
});

router.put(
    "/projects/:id/actions/:actionID",
    validateBody(),
    async (req, res, next) => {
        const combinedAction = {
            project_id: req.params.id,
            ...req.body,
        };

        const action = actionsModel.update(req.params.actionID, combinedAction);

        if (action === null) {
            return res.status(500).json({
                message: "Error Something happened",
            });
        } else {
            return res.status(201).json({
                message: "Action edited!",
            });
        }
    }
);

router.delete("/projects/:id/actions/:actionID", async (req, res, next) => {
    const action = await actionsModel.remove(req.params.actionID);

    if (!action) {
        return res.status(400).json({
            message: "Could not find action",
        });
    } else {
        return res.status(200).json({
            message: "Action Deleted",
        });
    }
});

function validateBody() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "Missing all fields",
            });
        } else if (
            !req.body.description ||
            !req.body.notes ||
            !req.body.completed
        ) {
            return res.status(400).json({
                message: "Please enter all fields!",
            });
        } else {
            return next();
        }
    };
}

module.exports = router;
