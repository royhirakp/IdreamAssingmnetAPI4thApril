const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

 const ImageData = new Schema({
    image: {
        data: Buffer,
        contentType: String
      },
      label:String
    // user: {type: ObjectId, ref: "User"}
 })
const imageModel = mongoose.model('image',ImageData)
module.exports = imageModel;

