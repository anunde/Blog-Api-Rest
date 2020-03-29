'use strict'

var express = require('express');
var ProjectController = require('../controllers/project.js');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/update/:id', ProjectController.updateProject);
router.delete('/delete/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);


module.exports = router;