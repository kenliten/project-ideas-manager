const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    name: { type: String },
    description: { type: String },
    pros: { type: String },
    cons: { type: String },
    title: { type: String },
});

const Project = model('Project', ProjectSchema);

module.exports = Project;