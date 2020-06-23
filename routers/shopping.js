const express = require("express");
const authMiddelware = require("../auth/middleware");
const Shopping = require("../models/").shoppinglist;
//'const Bids = require("../models/").bid;
//console.log("Artwork", Artwork);
const { Router } = express;

const router = new Router();
console.log("Shopping", Shopping);

router.get("/shopping", async function getEventsList(req, res, next) {
  try {
    const getData = await Shopping.findAll();

    res.json(getData);
  } catch (e) {
    next(e);
  }
});

router.post("/shopping", async (req, res, next) => {
  console.log("requested values ", req.body);
  try {
    const { category, list, userId } = req.body;

    // const tt = req.body.list;

    //console.log("C :", category, "list : ", list, "user ", userId);

    if (!category || !list || !userId) {
      res.status(400).send("Missing parameters ");
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

router.get("/shopping", async function getEventsList(req, res, next) {
  try {
    const getShoppingLists = await Shopping.findAll();

    res.json(getShoppingLists);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
