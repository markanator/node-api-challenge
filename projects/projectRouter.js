const express = require("express");
const ProjectModel = require("../data/helpers/projectModel");

const router = express.Router();
// fetch all projects
router.get("/projects", async (req, res) => {
    // do your magic!
    const projects = await ProjectModel.get();

    if (projects === null) {
        return res.status(400).json({
            message: "Nothing found!",
        });
    } else {
        return res.status(200).json(projects);
    }
});

// fetch by id
router.get("/projects/:id", async (req, res, next) => {
    const projects = await ProjectModel.get(req.params.id);

    if (projects === null) {
        return res.status(400).json({
            message: "Nothing found!",
        });
    } else {
        return res.status(200).json(projects);
    }
});

router.post("/projects", validateBody(), (req, res, next) => {
    // @name
    // @description
    // @completed
    ProjectModel.insert(req.body)
        .then((project) => {
            return res.status(201).json({
                message: project,
            });
        })
        .catch((error) => {
            return res.status(400).json({
                message: "Could't Post",
                error,
            });
        });
});

router.put("/projects/:id", validateBody(), (req, res, next) => {
    ProjectModel.update(req.params.id, req.body)
        .then((project) => {
            return res.status(201).json({ project });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Couldn't edit project, try again later",
                err,
            });
        });
});

router.delete("/projects/:id", (req, res, next) => {
    ProjectModel.remove(req.params.id)
        .then((resp) => {
            return res.status(200).json({
                message: "Project Deleted!",
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "error, couldn't delete",
                err,
            });
        });
});

function validateBody() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "Missing all fields",
            });
        } else if (
            !req.body.name ||
            !req.body.description ||
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
