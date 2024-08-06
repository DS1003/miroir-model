const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastupdatedAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        // {
        //     user: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'User',
        //         required: true
        //     },
        //     content: {
        //         type: String,
        //         required: true
        //     },
        //     createdAt: {
        //         type: Date,
        //         default: Date.now
        //     },
        //     lastupdatedAt: {
        //         type: Date,
        //         default: Date.now
        //     },
        //     likes: {
        //         type: Number,
        //         default: 0
        //     }
        // }
    ]

});

module.exports = mongoose.model('Post', PostSchema);
