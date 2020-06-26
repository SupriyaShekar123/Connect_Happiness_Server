const express = require("express");
const authMiddelware = require("../auth/middleware");
const Shopping = require("../models/").shoppinglist;
const User = require("../models/").user;

// var nodemailer = require("nodemailer");
// const creds = require("../config/conifg");
// const cron = require("node-cron");

const { Router } = express;

const router = new Router();
//console.log("Shopping", Shopping);

router.post("/shopping", async (req, res, next) => {
  console.log("requested values ", req.body);
  try {
    const { category, list, userId } = req.body;

    if (!category || !list || !userId) {
      res.status(400).send({ message: "Missing parameters " });
    } else {
      const shoppinglist = await Shopping.create({
        category,
        list,
        userId,
      });
      res.status(201).json({ ...shoppinglist.dataValues });
    }
  } catch (e) {
    console.log("ERROR :", e.message);
    next(e);
  }
});

router.get("/shopping", async function getShoppingList(req, res, next) {
  try {
    const getShoppingLists = await Shopping.findAll({
      include: [User],
    });

    res.json(getShoppingLists);
  } catch (e) {
    next(e);
  }
});

router.get("/shopping/:id", async function getShoppingDetails(req, res, next) {
  const Id = req.params.id;
  try {
    const getData = await Shopping.findByPk(Id, {
      include: [User],
    });

    res.json(getData);
  } catch (e) {
    next(e);
  }
});

router.patch("/shopping/:id", async (req, res, next) => {
  console.log("THE BODAY", req.body);
  try {
    const Id = parseInt(req.params.id);
    const toUpdate = await Shopping.findByPk(Id, {
      include: [User],
    });
    if (!toUpdate) {
      res.status(404).send("List not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    console.log(e.message);
  }
});

//************************************************************************* */

// var transport = {
//   host: "smtp.gmail.com",
//   auth: {
//     user: creds.USER,
//     pass: creds.PASS,
//   },
// };

// var transporter = nodemailer.createTransport(transport);

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take messages");
//   }
// });

// router.post("/shopping", async (req, res, next) => {
//   console.log("requested values ", req.body);
//   try {
//     const { category, list, userId } = req.body;

//     if (!category || !list || !userId) {
//       res.status(400).send("Missing parameters ");
//     } else {
//       const shoppinglist = await Shopping.create({
//         category,
//         list,
//         userId,
//       });
//       res.status(201).json({ ...shoppinglist.dataValues });
//     }
//   } catch (e) {
//     console.log("ERROR :", e.message);
//     next(e);
//   }
// });

module.exports = router;
