const Item = require("../models/Item");
const mongoose = require("mongoose");

// GET ROUTES/ Homepage

exports.homepage = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Inventory Management System",
    description: "Final Project in BE101",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const items = await Item.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Item.count();
    const count = await Item.countDocuments({});

    res.render("index", {
      locals,
      items,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Final Project in BE101",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

// GET ROUTES/ New Item
exports.addItem = async (req, res) => {
  const locals = {
    title: "Add New Item ",
    description: "Final Project in BE101",
  };

  res.render("item/add", locals);
};

// PoST ROUTES/ Create New Item
exports.postItem = async (req, res) => {
  console.log(req.body);

  const newItem = new Item({
    itemId: req.body.itemId,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    createdAt: req.body.createdAt,
  });

  try {
    await Item.create(newItem);
    await req.flash("info", "Medicine created successfully.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// Get ITEM DATA

exports.view = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });

    const locals = {
      title: "View Medicine Info",
      description: "Final Project in BE101",
    };

    res.render("item/view", {
      locals,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

// Edit Item Info

exports.edit = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Medicine Info",
      description: "Final Project in BE101",
    };

    res.render("item/edit", {
      locals,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Info
exports.editPost = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, {
      itemId: req.body.itemId,
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
      createdAt: req.body.createdAt,
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

// Delete
exports.deleteItem = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//   res.render("item/add", locals);
// };

// // Homepage
// app.get("/", (req, res) => {
//   const locals = {
//     title: "Inventory Management System",
//     description: "Final Project in BE101",
//   };
//   res.render("index", locals);
// });
