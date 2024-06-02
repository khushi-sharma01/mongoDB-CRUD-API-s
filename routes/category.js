
var express = require('express');
var router = express.Router();
const Category=require('./models/categoryModel')
var upload = require('./multer')
/* GET home page. */
router.post('/submit', upload.single('categoryicon'),async function(req, res, next) {
    var category=new Category({...req.body,categoryicon:req.file.filename})
    await category.save().then((saveDocument)=>{
        if(category===saveDocument)
            {
                res.json({message:'Category Submitted Succesfully...',status:true})
            }
            else{
                res.json({message:'Failed to submit category....',status:false})
         
            }
    })
  
});
router.post('/update',async function (req,res,next){
    var category=new Category(req.body)
    await category.updateOne().then((saveDocument)=>{
        if(category===saveDocument)
            {
                res.json({message:'Category Updated Succesfully...',status:true})
            }
            else{
                res.json({message:'Failed to update category....',status:false})
         
            }
    })
})

module.exports = router;

