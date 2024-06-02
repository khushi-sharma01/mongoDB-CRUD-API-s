const mongoose=require('mongoose');

const subCategorySchema =mongoose.Schema ({
    subcategoryname:{
        type :String,
        required:[true,'sub category name is required']

    },
    subcategoryicon:{
        type:String,
        required:[true,'sub category image is required']
    },
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    }
    
},{
    timestamps: true // Correct way to add timestamps
 });
module.exports=mongoose.model('subcategory',subCategorySchema)