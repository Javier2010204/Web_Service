(function(){
	var express=require('express');
	var morgan=require('morgan');
	var Sequelize = require('sequelize');
	var bodyparser=require('body-parser')
	var app=express();
	var puerto=3000;
	var mysql=require('mysql');
	var conf=require/('./config');
	var pool=mysql.createPool(conf.database);

	var sequelize = new Sequelize('genbetadev', 'root', '', {
		host: 'localhost',
		dialect: 'mysql',
		pool:{
			max: 5,
			min: 0,
			idle: 10000
		},
	});

	var Usuario = sequelize.define('usuario', {
		nombre:{
			type: Sequelize.STRING,
			field: 'nombre'
		},
		correo:{
			type: Sequelize.STRING,
			field: 'correo'
		},
		nick:{
			type: Sequelize.STRING,
			field: 'nick'
		},
		contrasenia:{
			type: Sequelize.STRING,
			field: 'contrasenia'
		}
	}, {
		freezeTableName: true
	});
		
	
	app.set('pool',pool);
	app.use(morgan('dev'));
	app.use(bodyparser.urlencoded({
		extended:false
		
	}));
	
	app.use(bodyparser.json())
	app.use('/api/vl', require('./rutas')(app));

	app.listen(puerto, function(){
		console.log("Servidor iniciado en el puerto: "+puerto);
		
	});
	
	
}) ();