const ShopByBudget = require("../modals/shopByBudget.modal.js");

exports.createShopByBudget = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(name, "name");
    // Create a new document using the ShopByBudget model
    const newShopByBudget = new ShopByBudget({ name });

    // Save the document to the database

    const datas = await newShopByBudget.save();

    res.status(201).json(datas);

    // const SShopByBudget = new ShopByBudget(req.body);

    // const shopByBudgetData = await SShopByBudget.save();
    // res.status(201).json({
    //   message: "successfully created shopBy Budget",
    //   data: shopByBudgetData,
    // });
  } catch (error) {}
};

exports.deleteShopByBudget = async (req, res, next) => {
  try {
    const deleteShopByBudgetData = await ShopByBudget.deleteOne(
      {
        _id: req.params.shopByBudgetId,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "success fully deleted shop by budget",
      data: deleteShopByBudgetData,
    });
  } catch (error) {}
};

// exports.updateShopByBudget = async (req, res, next) => {
//   try {
//     const updateShopByBudgetData = await ShopByBudget.findOneAndUpdate(
//       { _id: req.params.shopByBudgetId },
//       req.body,
//       {
//         new: true,
//       }
//     );

//     res.status(201).json({
//       message: "successfully udpated  shop by budget",
//       data: updateShopByBudgetData,
//     });
//   } catch (error) {}
// };

exports.getAllShopByBudget = async (req, res, next) => {
  const data = await ShopByBudget.find();
  res
    .status(201)
    .json({ message: "success fully get Shop By Budget", data: data });
};
