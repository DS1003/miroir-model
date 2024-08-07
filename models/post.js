    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
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
        updatedAt: {
            type: Date,
            default: Date.now
        },
        likes: {
            type: Number,
            default: 0
        }
    });

    const PostSchema = new Schema({
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
        comments: [CommentSchema],
        media: [{
        type: String,
        required: false
        }]
    });
    

    
    module.exports = mongoose.model('Post', PostSchema);
