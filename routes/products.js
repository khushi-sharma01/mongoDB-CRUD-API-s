var express = require("express");

var upload = require("./multer");
var Products = require("./models/ProductModel");
var router = express.Router();

router.post(
  "/submit",
  upload.single("producticon"),
  async function (req, res, next) {
    var product = new Products({ ...req.body, producticon: req.file.filename });
    await product.save().then((saveDocument) => {
      if (product === saveDocument) {
        res.json({ message: "product submitted successfully", status: true });
      } else {
        res.json({ message: "faied to submit product", status: false });
      }
    });
  }
);
router.get("/displayall" ,async function (req,res,next){
    await Products.aggregate([
        {
            $lookup:{
                from:'categories',
                localField:"categoryid",
                foreignField:"_id",
                as:'categoryData'
            },
            $lookup:{
                from:'subcategory',
                localField:"subcategoryid",
                foreignField:"_id",
                as:'subCategoryData'
            },
        }
    ],
{$unwind:"$categoryData"},{$unwind:'$subCategoryData'}).then((data)=>{
    res.json({data:data})
})

})

module.exports = router;
