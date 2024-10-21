const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required: true
    }
})

const Posts = new mongoose.model('Posts', postSchema);

module.exports = Posts;