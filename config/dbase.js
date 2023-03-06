const mongoose = require('mongoose')


mongoose.set('strictQuery', false) //adding to avoid error


const dbConnect = async () => {
    try {
        const connt = await mongoose.connect(process.env.MONGOURI)
        console.log('database connection established')
    } catch (err) {
        console.error(err);
        console.log(err)
    }
}


module.exports = {
    dbConnect,
}