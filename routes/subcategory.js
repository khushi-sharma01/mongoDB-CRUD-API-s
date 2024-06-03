var express = require("express");
var router = express.Router();
const SubCategory = require("./models/subCategoryModel");
var upload = require("./multer");

router.post(
  "/submit",
  upload.single("subcategoryicon"),
  async function (req, res, next) {
    var subcategory = new SubCategory({
      ...req.body,
      subcategoryicon: req.file.filename,
    });
    await subcategory.save().then((saveDocument) => {
      if (subcategory === saveDocument) {
        res.json({
          message: "Subcategory Submitted successfully...",
          status: true,
        });
      } else {
        res.json({ message: "Failed to submit subcategory..", status: false });
      }
    });
  }
);

router.post('/delete',async function(req,res,next){
 await SubCategory.deleteOne({"_id":req.body.subcategoryid}).then((mydata)=>{
    if(mydata){
      res.json({message:'subcategory deleted successfully',status:true})
    }else{
      res.json({message:'failed to delete subcategory',status:false})
    }
  })
})

router.post('/update',async function(req,res,next){
  var {subcategoryid,...data}=req.body
  await SubCategory.updateOne({"_id":subcategoryid},data).then((mydata)=>{
    if(mydata){
      res.json({messgae:"subcategory updated succesfully",status:true})
    }
    else{
      res.json({message:'subcategory failed to update',status:false})
    }
  })
})
  
router.post('/upadte_pictures',upload.single('subcategoryicon'),async function(req,res,next){

  await SubCategory.updateOne({"_id":req.body.subcategoryid},{"subcategoryicon":req.file.filename}).then((mydata)=>{
    if(mydata){
      res.json({message:"subcategoryicon updated successfully",status:true})
    }
    else{
      res.json({message:'failed to update subcategory icon',status:false})
    }
  })
  
})
router.get("/displayall" ,async function (req,res,next){
    await SubCategory.aggregate([
        {
            $lookup:{
                from:'categories',
                localField:"categoryid",
                foreignField:"_id",
                as:'categoryData'
            },
        }
    ],
{$unwind:"$categoryData"}).then((data)=>{
    res.json({data:data})
})

})

module.exports = router;
