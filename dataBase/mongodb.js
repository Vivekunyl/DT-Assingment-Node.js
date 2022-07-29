/**
 * Dotenv Module
 * @const
 */
const dotenv = require('dotenv');

/**
 * MongoDB Module
 * @const
 */
const {MongoClient} = require('mongodb');

//Configuring dotenv file Path
dotenv.config({path:"./config.env",debug:true});
//System ENV variable for Database URL
const DB = process.env.DB;
//Creating a instance of the database client
const client = new MongoClient(DB);
let _db; //Variable to store the database connection

/**
 *  function to connect to MongoDB URL and return the databse instance
 * @param {String} database 
 * @returns {String} Database
 * @async
 */
const initDB = async(database) =>{
    try{
        await client.connect();  //connecting to Database
        console.log('Connected successfully to Database');
    }
    catch(err){
        console.log('Error connecting to Database');
    }
    const db = client.db(database);
    _db = db; //assigning the database Object
    
    return db;
}

/**
 * Function to return Database object
 * @returns {String} databse Object
 */
const getDB = ()=>{
    return _db;
}
/**
 * Function to close the connection with Database
 */
const closeDB = async()=>{
    _db.close();
}

/**
 * @exports mongodb
 */
module.exports = {initDB, closeDB, getDB};