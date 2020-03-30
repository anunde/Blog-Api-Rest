'use strict'

var Project = require('../models/project.js');
var fs = require('fs');

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el test'
		});
	},

	saveProject: function(req, res){
		var project = new Project();

		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored) => {
			if(err) return res.status(500).send({
				message: 'Error al guardar'
			});
			if(!projectStored) return res.status(404), send({
				message: 'no se ha podido guardar el proyecto'
			});

			return res.status(200).send({
				project: projectStored
			});
		});
	},

	getProject: function(req, res){
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({
				message: 'Necesitamos que nos indiques un proyecto'
			});

		Project.findById(projectId, (err, project) =>{
			if(err) return res.status(500).send({
				message: 'Error al devolver los datos'
			});

			if(!project) return res.status(404).send({
				message: 'Error al encontrar documento con ese ID'
			});

			return res.status(200).send({
				project
			});
		});
	},

	getProjects: function(req, res) {
		Project.find().exec((err, projects) => {
			if(err) return res.status(500).send({
				message: 'Error al devolver los datos.'
			});

			if(!projects) return res.status(404).send({
				message: 'Error al encontrar el documento'
			});

			return res.status(200).send({
				projects
			});
		});
	},

	updateProject: function(req, res) {
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate({ _id: projectId}, update, {new:true}, (err, projectUpdated) => {
			if(err) return res.status(500).send({
				message: 'Error al actualizar.'
			});

			if(!projectUpdated) return res.status(404).send({
				message: 'No existe el documento'
			});

			return res.status(200).send({
				project: projectUpdated
			});
		});
	},

	deleteProject: function(req, res) {
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
			if(err) return res.status(500).send({
				message: 'No se ha podido borrar.'
			});

			if(!projectRemoved) return res.status(404).send({
				message: 'No existe el documento'
			});

			return res.status(200).send({
				project : projectRemoved
			});
		});
	},

	uploadImage: function(req, res) {
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files) {
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('/');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

			Project.findByIdAndUpdate(projectId, {image : fileName}, {new:true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({
						message: 'No se ha podido borrar.'
					});

					if(!projectUpdated) return res.status(404).send({
						message: 'No existe el documento'
					});	

					return res.status(200).send({
						project: projectUpdated
					});
				});
			} else {
				fs.unlink(filePath, (err) => {
					return res.status(200).send({
						message: 'La extensión no es válida'
					});
				});
			}

		} else {
			return res.status(200).send({
				files: req.fileName
			});
		}
	}

};

module.exports = controller;