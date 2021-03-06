var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorageSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    type: {type: String,
       required: true,
        enum: ['SSD','Hybrid', '5400RPM', '5900RPM', '7200RPM'] },
    capacity: {type: String, required: true, enum: ['128GB', '256GB', '512GB', '1TB', '2TB', '4TB', '8TB', '16TB']},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for storage URL
StorageSchema
.virtual('url')
.get(function () {
  return 'storage/' + this._id;
});

//Export model
module.exports = mongoose.model('Storage', StorageSchema);