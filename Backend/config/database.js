// create instance of mongoose
const mongoose = require('mongoose');

// load config of .env file
require('dotenv').config();

// function for connect db and express app
const dbConnect = () => {

    mongoose.connect(process.env.DATABASE_URL,{dbName:"BlogBrewDB"})
    .then(() => {console.log("Database Connection Successfully");})
    .catch((error) => {
        console.log(error.message)
        process.exit(1);
    });

};

// export db connection function
module.exports = dbConnect;