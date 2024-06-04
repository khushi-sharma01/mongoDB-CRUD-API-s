var express = require("express");
var router = express.Router();
const SubCategory = require("./models/subCategoryModel");
var upload = require("./multer");

router.post(
  "/submit",
  upload.single("subcategoryicon"),
  async function (req, res, next) {
    try {
      var subcategory = new SubCategory({
        ...req.body,
        subcategoryicon: req.file.filename,
      });
      const saveDocument = await subcategory.save();
      if (subcategory === saveDocument) {
        res.json({
          message: "Subcategory Submitted successfully...",
          status: true,
        });
      } else {
        res.json({ message: "Failed to submit subcategory..", status: false });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/delete', async function(req, res, next) {
  try {
    const mydata = await SubCategory.deleteOne({ "_id": req.body.subcategoryid });
    if (mydata.deletedCount > 0) {
      res.json({ message: 'Subcategory deleted successfully', status: true });
    } else {
      res.json({ message: 'Failed to delete subcategory', status: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/update', async function(req, res, next) {
  try {
    var { subcategoryid, ...data } = req.body;
    const mydata = await SubCategory.updateOne({ "_id": subcategoryid }, data);
    if (mydata.matchedCount > 0) {
      res.json({ message: "Subcategory updated successfully", status: true });
    } else {
      res.json({ message: 'Failed to update subcategory', status: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/update_pic', upload.single('subcategoryicon'), async function(req, res, next) {
  try {
    const mydata = await SubCategory.updateOne({ "_id": req.body.subcategoryid }, { "subcategoryicon": req.file.filename });
    if (mydata.matchedCount > 0) {
      res.json({ message: "Subcategory icon updated successfully", status: true });
    } else {
      res.json({ message: 'Failed to update subcategory icon', status: false });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/displayall", async function(req, res, next) {
  try {
    const data = await SubCategory.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: "categoryid",
          foreignField: "_id",
          as: 'categoryData'
        }
      },
      { $unwind: "$categoryData" }
    ]);

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
