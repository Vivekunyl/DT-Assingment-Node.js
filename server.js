/**
 * @file server.js is the main file for this application
 * @author Vivek uniyal
 */

/**
 * express Module
 * @const
 */
const express = require('express');
/**
 * Path Module
 * @const
 */
const path = require('path');
/**
 * Body-Parser Module
 * @const
 */
const bodyParser = require('body-parser');
/**
 * Cookie-Parser Module
 * @const
 */
const cookieParser = require('cookie-parser');

//System environment variables
/**
 * Port for listening our backend application 
 * @const
 */
const PORT = process.env.PORT||2000; //a port of 2000 is mentioned in case of failure of system environment port
const  app = express();   //Creating app for routing
const route = require("./routes/route"); //acquiring routes module for different end-points
const dataBase = require('./dataBase/mongodb'); //acquiring MongoDB database module

app.use(express.static(path.join(__dirname, 'public'))); //Specifying static folder
app.use(bodyParser.json()); //specifying HTTP request handlers with JSON format data
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //Setting up view engine as ejs
app.set("views", path.join(__dirname, "./templates/views")); //setting up views folder for template engine

app.use("",route); //using acquired module for express routing

dataBase.initDB("assingment1"); //Specifying and initializing MongoDB database

//Listening on port mentioned 
app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})


