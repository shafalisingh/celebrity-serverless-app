'use strict';
// Include our "db"
var db = require('../../config/db')();
var express = require('express');
var mysql = require('mysql');
var fs = require("fs");
var app = express();
var path = require('path');
var http = require("http");
var connection = mysql.createConnection({
    host: "celebritydatabase.cci1dwkfz7ga.us-west-2.rds.amazonaws.com",
    user: "shafali",
    password: "9417755499",
    database: "celebritydatabase"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// Exports all the functions to perform on the db
module.exports = {getAll, save, getOne, update, delCeleb};

//GET /movie operationId
function getAll(req, res, next) {
    connection.query("Select * From celebrity" ,function(err, result)
    {
        if (err)
            throw err;
        else{
	    console.log("THE RESULT IS:");
            console.log((result))
            res.send(result)
        }
    });
}

//POST /movie operationId
function save(req, res, next) {

    var postData  = req.body;
    connection.query("INSERT INTO celebrity(name,film,id) Values('"+postData.name+"','"+postData.movie+"','"+postData.id+"')",function (error, results) {
        if (error)
            throw error;
        else {
            res.send({'success': 1, 'description': 'Addedto swaggerdb'})
        }
    });
    }

//GET /movie/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    connection.query("select * from celebrity where id="+id, function (error, result) {
        if (error)
            throw error;
        else {
            console.log("Record Found !!")

            let data={
                'id':(result[0].id).toString(),
                'name':result[0].name,
                'movie':result[0].film
            }
            console.log(data)
            res.send(data);
        }
    });
}

//PUT /movie/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var celebrity = req.body;
    console.log(celebrity)
    connection.query('UPDATE celebrity SET name = ?, film=?  WHERE id = '+id, [celebrity.name,celebrity.movie]),function (error, results, fields){
    if (error)
        throw error;
    else {
        res.send({'success': 1, 'description': 'Addedto swaggedb'})
    }
}
}
//DELETE /movie/{id} operationId
function delCeleb(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    connection.query('DELETE FROM `celebrity` WHERE `id`=' +id, function (error, results, fields) {
        if (error)
            throw error;
        else {

            res.send({success: 1, description: "Celebrity deleted!"});

        }
    });
}
