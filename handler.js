const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todo",
});


const app = express();
app.use(cors());
app.use(bodyParser.json())


app.get('/tasks', function (request, response) {
 console.log(process.env)


  connection.query("SELECT * FROM Tasks", function (err, data) {
    if (err) {
      console.log("Error frem MYSQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    };
  });
});


app.delete('/tasks/:id', function (request, response) {
  const id = request.params.id;
  const query = "DELETE FROM Tasks WHERE TaskId = ?";
  connection.query(query, [id], (err) => {
    if(err){
      console.log("Error from MYSQL", err);
      response.status(500).send(err);
    }else {
      response.status(200).send("Task deleted")
    }
  });
});



app.post('/tasks', function (request, response) {
  const data = request.body;

  const query = `INSERT INTO Tasks (Description,Completed, Deadline, Status) VALUES (?, ?, ?, ?)`;

  connection.query(query, [data.Description, false, data.Deadline, data.Status], function (err, results) {
    if (err) {
      console.log("Error from MYSQL", err);
      response.status(500).send(err);
    } else {
      connection.query(`SELECT * FROM Tasks WHERE TaskId = ${results.insertId}`, function (err, results) {
        if (err) {
          console.log("Error from MYSQL", err);
          response.status(500).send(err);
        } else {
          response.status(201).send(results[0])
        }
      });
    }
  });
});


app.put('/tasks/:id', function (request, response) {
  const id = request.params.id;
  const data = request.body;
  const query = "UPDATE Tasks SET ? WHERE TaskId = ?";
  connection.query(query, [data, id], (err) => {
    if(err){
      console.log("Error from MYSQL", err);
      response.status(200).send(err); 
    } else {
      response.status(200).send("Updated Task")
    }
  });
});

module.exports.app = serverlessHttp(app);