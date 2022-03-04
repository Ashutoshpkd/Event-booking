const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model('Bookings', bookingSchema);