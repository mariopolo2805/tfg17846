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
    var query = "SELECT * FROM tfg.User WHERE email='" + user + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

/* Subject Queries */

app.post('/subjects', function(req, res) {
    var query = "SELECT * FROM tfg.Subject";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/subject/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Subject WHERE idSubject='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

/* Group Queries */

app.post('/groups', function(req, res) {
    var query = "SELECT * FROM tfg.Group";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/group/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Group WHERE idGroup='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

app.post('/groupsOfTeacher/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Group WHERE idTeacher='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/groupsWithSubjectOfTeacher/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Group NATURAL JOIN tfg.Subject WHERE idTeacher='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

/* Section Queries */

app.post('/sections', function(req, res) {
    var query = "SELECT * FROM tfg.Section";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/section/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Section WHERE idSection='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

app.post('/sectionsOfGroup/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Section WHERE idGroup='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

/* Question Queries */

app.post('/questions', function(req, res) {
    var query = "SELECT * FROM tfg.Question";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/question/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Question WHERE idQuestion='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

app.post('/questionsOfSection/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Question WHERE idSection='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

/* Answer Queries */

app.post('/answers', function(req, res) {
    var query = "SELECT * FROM tfg.Answer";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/answer/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Answer WHERE idAnswer='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows[0]);
            res.send(json);
        }
    });
});

app.post('/answersOfQuestion/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Answer WHERE idQuestion='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});

app.post('/answersOfStudent/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM tfg.Answer WHERE idStudent='" + id + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});