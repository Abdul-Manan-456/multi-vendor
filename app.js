const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./src/routes/userRoutes')
const storeRoute = require('./src/routes/storeRoutes');
const productRoute = require('./src/routes/productRoutes');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/config/.env') })

// Json parsing data
app.use(express.json());




//________________________ Routes___________________

// userRoute
app.use("/api/v1/", userRoute)

// storeRoute
app.use('/api/v1', storeRoute)

// Product routes
app.use('/api/v1/', productRoute)





// connecting to the server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})


//database connection
const { dbConnect } = require('./config/dbase.js');
dbConnect();


// // Error handling Middlware
// const { errorHandler } = require('./src/middlewares/errorHandler');
// errorHandler();

