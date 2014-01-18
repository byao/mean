var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Zip code Schema
 */
var ZipcodeSchema = new Schema({
    '_id': Number,
    loc: {
        type: [Number],
        index: '2d'
    },
    county: String
});

mongoose.model('Zipcode', ZipcodeSchema);