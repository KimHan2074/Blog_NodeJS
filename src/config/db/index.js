const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/hannie_education_dev',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connected successfully!');
    } catch (error) {
        console.log('Connected fail!');
    }
}

module.exports = { connect };
