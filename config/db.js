const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const DBCONNECTION = async () =>{
    try{
        if (!process.env.MONGO_URL_LIVE) throw new Error("MONGO_URL is not define in our enviroment variable")
        
            await mongoose.connect(process.env.MONGO_URL_LIVE)

            if (mongoose.connection.host === "localhost"){
                console.log("Connected to local database");
            } else {
                console.log("Connected to production Database");
            }
    }catch(error){
        console.log("An error occured while trying to connect to the database", error);
    }
}

module.exports = DBCONNECTION