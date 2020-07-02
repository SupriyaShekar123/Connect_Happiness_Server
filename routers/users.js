const express = require("express");
const authMiddelware = require("../auth/middleware");
const User = require("../models/").user;
const Shopping = require("../models/").shoppinglist;
const { Router } = express;
const { Op } = require("sequelize");

const router = new Router();

router.get("/volunteer", async function getVolunteers(req, res, next) {
  try {
    const volunteers = await User.findAll({
      where: {
        roles: {
          [Op.like]: "%volunteer%",
        },
      },
    });

    const test = volunteers.map((t) => {
      console.log(t.dataValues.email);
      return (
        //
        t.dataValues.email
      );
    });

    console.log("volumenterrs :", test);
    res.json(`${test}`);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get("/user/:id", async function getShoppingDetails(req, res, next) {
  console.log("VALUE OF ID", req.params.id);
  const Id = req.params.id;
  try {
    const getData = await User.findByPk(Id, {
      include: [Shopping],
      order: [[Shopping, "createdAt", "DESC"]],
    });

    res.json(getData);
  } catch (e) {
    //next(e);
    console.log("error", e.message);
  }
});

module.exports = router;
