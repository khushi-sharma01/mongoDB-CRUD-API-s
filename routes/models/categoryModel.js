var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   categoryname: {
       type: String,
       required: [true, 'category name is required']
   },
   categoryicon: {
       type: String,
       required: [true, 'category image is required']
   }
}, {
   timestamps: true // Correct way to add timestamps
});

module.exports = mongoose.model('Category', categorySchema);
