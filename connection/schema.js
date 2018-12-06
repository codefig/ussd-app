const mongoose = require('mongoose')
const emergencySchema = new mongoose.Schema({
    name : {
        type: String
    }, 
    userLocation : {
        type: String
    }, 
    distressLocation : {
        type: String, 
    }, 
    details : {
        type: String, 
    }
})

const Emergency  = mongoose.model("Emergency", emergencySchema);
module.exports = Emergency;