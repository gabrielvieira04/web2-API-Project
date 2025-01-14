const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    capacity: { type:Number, required: true },
});

module.exports = mongoose.model("Laboratory", UserSchema);
