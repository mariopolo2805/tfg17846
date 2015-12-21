"use strict";

var express = require('express');
var lessMiddleware = require('less-middleware');
var app = express();

/******************************************************************************
 **************************** Routing configuration ***************************
 ******************************************************************************/

/* Compile less and store CSS in target/public */
app.use(lessMiddleware('public', { dest : 'public' }));
/* Default static files are in /public folder */
app.use(express.static('public'));
/* Serve uncompressed NPM packages in /lib folder */
app.use('/lib', express.static('node_modules'));

/******************************************************************************
 **************************** Server configuration ****************************
 ******************************************************************************/

/* Create the server in http://localhost:9000/ */
var server = app.listen(9000, function () {
    var port = server.address().port;
    console.log('Server listening at http://localhost:%s', port);
});

/******************************************************************************
 ***************************** MySQL configuration ****************************
 ******************************************************************************/

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'mariopolo2805',
    password : 'tfg17846',
    database : 'tfg'
});

/******************************************************************************
 ******************************* MySQL Query API ******************************
 ******************************************************************************/

/* Login Queries */

app.get('/#/login', function(req, res) {
    res.sendfile('login/login.html');
});

app.post('/login/:user', function(req, res) {
    var user = req.params.user;
    var query = "SELECT * FROM User WHERE email='" + user + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.log("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

/* Subject Queries */

app.post('/subjects', function(req, res) {
    var query = "SELECT * FROM Subject";
    connection.query(query, function(err, rows) {
        if(err) {
            console.log("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(rows);
        }
    });
});

app.post('/subject/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM Subject WHERE idSubject='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.log("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});
