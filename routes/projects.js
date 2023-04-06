const Project = require('../models/project');
const { Router } = require('express');

const projectRouter = Router();

projectRouter.get('/', (req, res) => {
    Project.find().then(projects => {
        res.render('projects', { projects });
    });
});

projectRouter.get('/new', (req, res) => {
    res.render('new');
});

projectRouter.get('/json', (req, res) => {
    Project.find().then(projects => {
        res.json(projects);
    });
});

projectRouter.get('/:id', (req, res) => {
    Project.findOne({ _id: req.params.id }).then(project => {
        res.render('project', { project });
    });
});

projectRouter.get('/:id/json', (req, res) => {
    Project.findOne({ _id: req.params.id }).then(project => {
        res.json(project);
    });
});

projectRouter.post('/', (req, res) => {
    const data = req.body;
    const project = new Project(data);
    project.save().then(() => {
        res.render('projects', { success: true });
    }).catch(err => {
        res.render('projects', { success: false, data: err.message });
    });
});

projectRouter.post('/json', (req, res) => {
    const data = req.body;
    const project = new Project(data);
    project.save().then(() => {
        res.json({ success: true });
    }).catch(err => {
        res.json({ success: false, data: err.message });
    });
});

projectRouter.put('/:id', (req, res) => {
    const data = req.body;
    Project.updateOne({ _id: req.params.id }, data).then((updated) => {
        if (updated) {
            res.redirect('projects');
        }
    }).catch(err => {
        res.render('project', {project:data});
    });
});

projectRouter.put('/:id/json', (req, res) => {
    const data = req.body;
    console.log(req.params.id)
    Project.updateOne({ _id: req.params.id }, data).then((updated) => {
        if (updated) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    }).catch(err => {
        res.json({ success: false, data: err.message });
    });
});

projectRouter.delete('/:id', (req, res) => {
    Project.deleteOne({ _id: req.params.id }).then(() => {
        res.json({ success: true });
    }).catch(err => {
        res.json({ success: false, data: err.message });
    });
});

module.exports = projectRouter;
