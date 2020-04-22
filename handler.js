
// import dependecies
// import express from  "express"
// React version of NodeJS does support import statement and there is no transpilation step


const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")

// logically separate 4 sections of code according to the method of the HTTP request recieved

const app = express();
app = use(cors());
app = use(bodyParser.json())

// this function should made a SELECT * FROM Tasks query to the DB and return the result
// for now, it;s just going to return dummy data
// when this function is invoked it will invoked with 2 parameters (request (its an object) and response)
// request has loafd og info about the request
// response has some useful methods for sending a response

app.get('/tasks', function (request, response) {
    response.status(200).send({
        tasks: [
            {
            id: 1,
            text: 'organise bookcase',
            status: 0,
            completed: false
        },
        {
            id: 2,
            text: 'Iron clothes',
            status: 20, 
            completed: false
        },
        {
            id: 3,
            text: 'Clean car',
            status: 40,
            completed: false
        }
        ]
    })
});


// every response should have status, number in bracet means success

// should delete the taks with specified ID for the database
// For now, just send back a text message(and status 200)


app.delete('/tasks/:id', function (request, response) {

const taskIdToBeDeleted = request.params.taskId;

   let someResponse= {
        message: "You issues a delete request for ID: " + taskIdToBeDeleted

    };
    if (taskIdToBeDeleted > 3){
        response.status(404);
        someResponse ={
            message: "Task" + taskIdToBeDeleted + " does not exist"

        }
    }

    response.json(someResponse);
});


// should INSERY INTO the ddatabase the new task
// for now, just send back a text message (and status 200) "New task saved"

app.post('/tasks', function (request, response) {

    const text= request.body.text;
    const date =request.body.date;

    response.status(201).send({
        message: 'Received a request to add task ${text} with date ${date}'
      })
});

// should UPDATE a task in the DB
// For now, just send back a text message (and status 200)

app.put('/tasks/:id', function (request, response) {
    response.status(200).send({
        message: "You issued a put request for ID: 4"
      })
});

// when a get request comes in, this is the function we want to run, the function should do something
// when app.get is deployed, aws will prodivde a url/host/domain, we get https://fjr832ry.api_gateway.aws.com/tasks

module.exports.app = serverlessHttp(app);
// export a single function called app so its the function we want to run
