const mongoose = require("mongoose");

const connectionMongoDb = async () => {

    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology:true
    })

    console.log('MongoDB server running', connection.connection.host)
};

module.exports = connectionMongoDb;