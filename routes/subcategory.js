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
