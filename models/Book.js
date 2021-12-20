const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{
        required: [true, 'Ingrese un titulo de libro'],
        maxlength: [500, 'El titulo del libro debe ser mayor de 500 caracteres'],
        type:String
    },
    description:String,
    price:Number,
    dataPublication:Date,
    autor:{id:String,completeName:String}
});

module.exports = mongoose.model('Book', BookSchema);