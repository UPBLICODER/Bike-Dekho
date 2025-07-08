const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{type:String,required:true, unique:true},
    desc:{type:String,required:true},
    tags:{type:String},
    images:{type:images}
})

const Product = mongoose.model('Product',productSchema)