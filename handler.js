//import dependencies 
// import express from "express";
// React apps get Transpiled
// This version of NodeJS does support import statements and there is no transpilation step

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

//create a conecction that config the Database
//pass a config object

const app = express();
app.use(cors());
app.use(bodyParser.json())

// Logically separate 4 sections of code according to the method of the HTTP request received
// Export a single function, called app


// // this function should made a SELECT * FROM Tasks query to the DB and return the result
// // for now, it;s just going to return dummy data
// // when this function is invoked it will invoked with 2 parameters (request (its an object) and response)
// // request has loafd og info about the request
// // response has some useful methods for sending a response


 // Should make a SELECT * FROM Tasks query to the DB and return the results
  // For now, it's just going to return some dummy data
  // Request has loads of info about the request
  // Resposne has some useful methods for sending a response

app.get('/tasks', function (request, response) {
 
  //make DB query to the DB, defne a function that will run when the query becomes successful or not, 
  //in the if / else send out response

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

  response.status(200).send(`Deleted a task with ID ${id}!`);
});



app.post('/tasks', function (request, response) {
  const data = request.body;

  //SQL injection - avoid this by "escaping" user-provided values
  const query = `INSERT INTO Tasks (Description,Completed, Deadline, Status) VALUES (?, ?, ?, ?)`;

  connection.query(query, [data.Description, False, data.Deadline, data.status], function (err, results) {
    if (err) {
      console.log("Error from MYSQL", err);
      response.status(500).send(err);
    } else {
      //send back the newly created task
      //because the front ens or the client might want to know the ID
      connection.query(`SELECT * FROM Tasks Where TaskId = ${results.insertID}`, function (err, results) {
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

//{text: "wash the dog", Deadline: "20-05-2020"}
//{completed:true }
app.put('/tasks/:id', function (request, response) {

const query = `UPDATE Task`
connection.query( )

  const id = request.params.id;
  const data = request.body
  response.status(200).send(`updated a task with ID ${id} and data ${JSON.stringify(data)}`);
});

// // when a get request comes in, this is the function we want to run, the function should do something
// // when app.get is deployed, aws will prodivde a url/host/domain, we get https://fjr832ry.api_gateway.aws.com/tasks

// module.exports.app = serverlessHttp(app);
// export a single function called app so its the function we want to run

module.exports.app = serverlessHttp(app);