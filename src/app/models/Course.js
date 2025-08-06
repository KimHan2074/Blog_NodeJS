// const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
// const mongooseDelete = require('mongoose-delete');
// const Schema = mongoose.Schema;

// const Course = new Schema(
//     {
//         name: { type: String, require: true },
//         description: { type: String, maxLength: 600 },
//         videoId: { type: String, require: true },
//         image: { type: String, maxLength: 255 },
//         slug: { type: String, slug: 'name', unique: true },
//     },
//     {
//         timestamps: true,
//     },
// );

// // Add Plugins
// mongoose.plugin(slug);
// Course.plugin(mongooseDelete, {
//   deletedAt: true,
//   overrideMethods: 'all',
// });

// module.exports = mongoose.model('Course', Course);

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

mongoose.plugin(slug); // ✅ Chỗ này đúng, gắn plugin global một lần cho mongoose

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        videoId: { type: String, required: true },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// ✅ Gắn plugin soft delete đúng cách
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
