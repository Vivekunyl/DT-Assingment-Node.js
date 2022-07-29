/**
 * @const
 */
const ObjectId = require('mongodb').ObjectID;
const database = require("../dataBase/mongodb");

/**
 * Function to render index.ejs file
 * @param {*} req 
 * @param {JSON} res 
 * @method GET
 */
exports.getHome = (req, res) => {
    res.render('index');
}

/**
 * Function to provide a particular envent or an array of event based on _id and other fields
 * @param {String , Number} req id , type , limit ,page 
 * @param {JSON} res 
 * @return {Number} Status code
 * @async
 * @method GET
 */
exports.getEventById = async (req, res) => {
    let events = new Array(); //initialize empty array to store events based on page and limit
    let initialValue=0 , finalValue=0; //initialize initial value and final value as 0 for performing iteration in resultant array of events
    const id = req.query.id; //getting ObjectId from url parameter
    const type = req.query.type; //getting type from url Parameter
    const limit = req.query.limit; //getting limit of events per page from url parameters
    const page = req.query.page; //getting no. of page from url parameters
    const client = database.getDB(); //getting database instance from mongoDB module
    const user = client.collection("documents");
    if (id != null) {  //meaning user want to search a specific event based on _id
        const query = { "_id": new ObjectId(id) }; //creating a mongoDB query
        try {
            const data = await user.findOne(query); //finding the document in the database
            res.status(200).json(data); //sending data and status code
        } catch (err) {
            console.log(err);
            res.status(404).json(err);
        }
    }
    else {  //Meaning client requested for pagination of events based on limit and page no.
        try {
            user.find().toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result.length < limit) { //if no. of events in result array is less than limit then simply show the events
                    res.status(200).json(result);
                }
                else {
                    if (page == 1) { //initializing values for 1st Page
                        initialValue = 0;
                        finalValue = limit-1;
                    }
                    else{ //initailizing values to pages other than 1st
                        initialValue = (page * limit) - ((page - 1) * limit) - 1;
                        finalValue = (page * limit) - 1;
                    }
                    //Iterating over the resultant array of events and extracting the desired set of events
                    for (let i = initialValue; i <= finalValue; i++) {
                        events.push(result[i]);
                    }
                    res.status(200).json(events);
                }
            });
            
        } catch (err) {
            console.log(err);
            res.status(404).json(err);
        }
    }


}


/**
 * Function to post event data to database 
 * @param {String} req name, tagline, schedule, description, moderator, category, sub_category, rigor_rank
 * @param {JSON} res 
 * @async
 * @method POST
 */
exports.postEvent = async (req, res) => {
    const client = database.getDB();
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
    const image = req.files;
    const user = client.collection("documents");
    const doc = {
        name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, image
    }
    try {
        const data = await user.insertOne(doc);
        if (data) {
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}

/**
 * Function to update a particular event by its _id
 * @param {String} req name, tagline, schedule, description, moderator, category, sub_category, rigor_rank
 * @param {JSON} res 
 * @async
 * @method PUT
 * @return {Number}status code
 */
exports.putEvent = async (req, res) => {
    const id = req.query.id;
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
    const image = req.files;
    const client = database.getDB();
    const user = client.collection("documents");
    let query = { "_id": new ObjectId(id) };  //setting the query
    try {
        let prevData = user.findOne(query); //searching for the _id in database
        if (prevData) {
            prevData = { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, image };
            res.status(200).json(prevData);
        }
        else {
            res.status(202);
        }

    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}

/**
 * Function to delte a event based on the _id
 * @param {number} req _id
 * @param {JSON} res 
 * @async
 * @method DELETE
 */
exports.deleteEvent = async (req, res) => {
    const id = req.query.id;
    const client = database.getDB();
    const user = client.collection("documents");
    const query = { "_id": new ObjectId(id) };  //creating the query
    try {
        const data = await user.deleteOne(query); //searrching and deleting the respective event based on query
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}
