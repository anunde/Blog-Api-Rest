'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ngblog', { useNewUrlParser: true })
		.then(() => {
			console.log('Estas conectado a la base de datos! eres el puto amo');

			app.listen(port, () => {
				console.log("Servidor corriendo correctamente en la url: localhost:3700")
			});
		})
		.catch(err => console.log(err));