var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Smog check station Schema
 */
var StationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        zip: String,
        county: String
    },
    loc: {
        type: [Number],
        index: '2d'
    },
    analyzers: Number,
    license: String,
    star: {
        type: Boolean,
        default: false
    },
    cap: {
        type: Boolean,
        default: false
    },
    yelp: {
        id: String,
        url: String,
        image_url: String,
        rating: Number,
        review_count: Number,
        rating_image_url: String,
        updated: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Station', StationSchema);