const mongoose = require('mongoose');
const shortid = require('shortid');
const shorturl = new mongoose.Schema({
    fullurl:{
        required:true,
        type:String,

    },
    short:{
        required:true,
        type:String,
        default:shortid.generate
    },
    clicks:{
        required:true,
        type:Number,
        default:0
    }
});
module.exports = mongoose.model("shorturl",shorturl);