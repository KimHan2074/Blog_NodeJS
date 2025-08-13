const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        videoId: { type: String, required: true },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        duration: { type: String },
        lesson: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
