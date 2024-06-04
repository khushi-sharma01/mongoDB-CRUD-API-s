var express = require("express");
var upload = require("./multer");
var Products = require("./models/ProductModel");
var router = express.Router();

router.post(
  "/submit",
  upload.single("producticon"),
  async function (req, res, next) {
    try {
      var product = new Products({ ...req.body, producticon: req.file.filename });
      const saveDocument = await product.save();
      if (product === saveDocument) {
        res.json({ message: "Product submitted successfully", status: true });
      } else {
        res.json({ message: "Failed to submit product", status: false });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/update', async function(req, res, next) {
  try {
    var { productid, ...data } = req.body;
    const mydata = await Products.updateOne({ '_id': productid }, data);
    if (mydata.matchedCount > 0) {
      res.json({ message: 'Product data updated successfully', status: true });
    } else {
      res.json({ message: 'Failed to update product data', status: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/update_pic', upload.single("producticon"), async function(req, res, next) {
  try {
    const mydata = await Products.updateOne({ "_id": req.body.productid }, { "producticon": req.file.filename });
    if (mydata.matchedCount > 0) {
      res.json({ message: 'Product picture updated successfully', status: true });
    } else {
      res.json({ message: 'Failed to update product picture', status: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/delete', async function(req, res, next) {
  try {
    const mydata = await Products.deleteOne({ "_id": req.body.productid });
    if (mydata.deletedCount > 0) {
      res.json({ message: 'Product deleted successfully', status: true });
    } else {
      res.json({ message: 'Failed to delete product', status: false });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/displayall", async function(req, res, next) {
  try {
    const data = await Products.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: "categoryid",
          foreignField: "_id",
          as: 'categoryData'
        }
      },
      {
        $lookup: {
          from: 'subcategory',
          localField: "subcategoryid",
          foreignField: "_id",
          as: 'subCategoryData'
        }
      },
      { $unwind: "$categoryData" },
      { $unwind: '$subCategoryData' }
    ]);

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
