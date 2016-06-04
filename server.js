"use strict";

var express = require('express');
var lessMiddleware = require('less-middleware');
var bodyParser = require('body-parser')
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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

/* Student Queries */

app.post('/studentsOfSubject/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT tfg.User.idUser, tfg.User.name, tfg.User.surname FROM tfg.User INNER JOIN tfg.Tuition ON tfg.User.idUser=tfg.Tuition.idStudent INNER JOIN tfg.Subject ON tfg.Tuition.idSubject=tfg.Subject.idSubject WHERE tfg.Subject.idSubject='" + id + "'  ORDER BY tfg.User.surname";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
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
    var query = "SELECT * FROM tfg.Group INNER JOIN tfg.Subject ON tfg.Group.idSubject=tfg.Subject.idSubject WHERE idTeacher='" + id + "'";
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

app.post('/newQuestion', function(req, res) {
    var query = "INSERT INTO tfg.Question (tfg.Question.idSection, tfg.Question.text, tfg.Question.difficulty, tfg.Question.answerA, tfg.Question.answerB, tfg.Question.answerC, tfg.Question.answerD, tfg.Question.solution, tfg.Question.expiration) VALUES (" + req.body.idSection + ", '" + req.body.text + "', " + req.body.difficulty + ", '" + req.body.answerA + "', '" + req.body.answerB + "', '" + req.body.answerC + "', '" + req.body.answerD + "', '" + req.body.solution + "', '" + req.body.expiration + "')";
    connection.query(query, function(err, result) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            res.send(result);
        }
    });
});

app.post('/editQuestion', function(req, res) {
    var query = "UPDATE tfg.Question SET tfg.Question.text = '" + req.body.text + "', tfg.Question.difficulty  = " + req.body.difficulty + ", tfg.Question.answerA = '" + req.body.answerA + "', tfg.Question.answerB = '" + req.body.answerB + "', tfg.Question.answerC = '" + req.body.answerC + "', tfg.Question.answerD = '" + req.body.answerD + "', tfg.Question.solution = '" + req.body.solution + "', tfg.Question.expiration = '" + req.body.expiration + "' WHERE tfg.Question.idQuestion = '" + req.body.idQuestion + "'";
    connection.query(query, function(err, result) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            res.send(result);
        }
    });
});

app.post('/removeQuestion/:id', function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM tfg.Question WHERE idQuestion='" + id + "'";
    connection.query(query, function(err, result) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            res.send(result);
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

app.post('/answersOfStudent/:id/section/:idSection', function(req, res) {
    var id = req.params.id;
    var idSection = req.params.idSection;
    var query = "SELECT * FROM tfg.Answer INNER JOIN tfg.Question ON tfg.Answer.idQuestion=tfg.Question.idQuestion WHERE idStudent='" + id + "' AND idSection='" + idSection + "'";
    connection.query(query, function(err, rows) {
        if(err) {
            console.error("Problem with MySQL" + err);
        } else {
            var json = JSON.stringify(rows);
            res.send(json);
        }
    });
});