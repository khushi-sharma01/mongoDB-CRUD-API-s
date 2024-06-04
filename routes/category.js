var express = require('express');
var router = express.Router();
const Category = require('./models/categoryModel');
var upload = require('./multer');

/* GET home page. */
router.post('/submit', upload.single('categoryicon'), async function(req, res, next) {
    try {
        var category = new Category({...req.body, categoryicon: req.file.filename});
        const saveDocument = await category.save();
        if (category === saveDocument) {
            res.json({ message: 'Category Submitted Successfully...', status: true });
        } else {
            res.json({ message: 'Failed to submit category...', status: false });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/update', async function(req, res, next) {
    try {
        var { categoryid, ...data } = req.body;
        const mydata = await Category.updateOne({ '_id': categoryid }, data);
        if (mydata.matchedCount > 0) {
            res.json({ message: 'Category updated successfully...', status: true });
        } else {
            res.json({ message: 'Failed to update category', status: false });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/display_by_id', async function(req, res, next) {
    try {
        var { categoryid } = req.body;
        const mydata = await Category.findOne({ '_id': categoryid });
        if (mydata) {
            res.json({ message: 'Category by ID displayed successfully', status: true, data: mydata });
        } else {
            res.json({ message: 'Failed to show category by ID', status: false });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/update_pic', upload.single('categoryicon'), async function(req, res, next) {
    try {
        const mydata = await Category.updateOne({ '_id': req.body.categoryid }, { 'categoryicon': req.file.filename });
        if (mydata.matchedCount > 0) {
            res.json({ status: true, message: 'Category icon updated successfully' });
        } else {
            res.json({ status: false, message: 'Failed to update category icon' });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/delete', async function(req, res, next) {
    try {
        const mydata = await Category.deleteOne({ '_id': req.body.categoryid });
        if (mydata.deletedCount > 0) {
            res.json({ status: true, message: 'Category deleted' });
        } else {
            res.json({ status: false, message: 'Failed to delete category' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
