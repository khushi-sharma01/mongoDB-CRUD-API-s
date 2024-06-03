
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
router.post('/update',async function(req,res,next){
    var {categoryid,...data}=req.body
    await Category.updateOne({'_id':categoryid},data).then((mydata)=>{
        if(mydata){
            res.json({message:'category updated successfully....',status:true})
        }
        else{
            res.json({message:'failed to update category', status:false})
        }
    })

})

router.post('/display_by_id',async function(req,res,next){
    var {categoryid}=req.body
    await Category.find({'_id':categoryid}).then((mydata)=>{
        if(mydata){
            res.json({message:'category by id dusplayed succesfully',status:true})
        }
        else{
            res.json({message:'failed to show category by id',status:false})
        }
    })
})

router.post('/update_pic',upload.single('catgoryicon'),async function(req,res,next){
    (await Category.updateOne({'_id':req.body.categoryid,'categoryicon':req.file.filename})).then((mydata)=>{
        if(mydata){
            res.json({status:true,message:'categoryicon updated sucessfully'})
        }
        else{
            res.json({status:false,message:'failed to update categoryicon'})
        }
    })
})
router.post('/delete', async function (req,res,next){
    await Category.deleteOne({'_id':req.body.categoryid}).then((data)=>{
        if(data)
            res.json({status:true,message:'category deleted'})
        else{
            res.json({status:false,message:'failed to delete category'})
        }
    })
})



module.exports = router;

