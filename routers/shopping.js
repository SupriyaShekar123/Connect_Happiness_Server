const express = require("express");
const auth = require("../auth/middleware");
const Shopping = require("../models/").shoppinglist;
const User = require("../models/").user;
const { Op } = require("sequelize");

const helperfunction = require("../routers/generalfunctions");

const { Router } = express;

const router = new Router();

router.post("/shopping", auth, async (req, res, next) => {
  // console.log("requested values ", req.body);
  try {
    const { category, list, userId, requiredBy } = req.body;

    if (!category || !list || !userId || !requiredBy) {
      res.status(400).send("Please fill all the fields");
    } else {
      const shoppinglist = await Shopping.create({
        category,
        list,
        userId,
        requiredBy,
      });
      res.status(201).json({ ...shoppinglist.dataValues });
    }
  } catch (e) {
    console.log("ERROR :", e.message);
    return res.status(400).send("Something went wrong, sorry");

    // next(e);
  }
});

router.get("/shopping", async function getShoppingList(req, res, next) {
  try {
    const getShoppingLists = await Shopping.findAll({
      where: {
        status: {
          [Op.like]: "%open%",
        },
      },
      include: [User],
    });

    res.json(getShoppingLists);
  } catch (e) {
    console.log("error", e.message);
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

module.exports = router;
