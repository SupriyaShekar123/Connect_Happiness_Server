const express = require("express");
const authMiddelware = require("../auth/middleware");
const User = require("../models/").user;
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

router.get("/volunteerEmail", async function getVolunteers(req, res, next) {
  try {
    const volunteers = await User.findAll({
      include: [
        {
          attributes: ["email"],
          where: {
            roles: {
              [Op.like]: "%volunteer%",
            },
          },
        },
      ],
    });

    res.json(volunteers);
  } catch (e) {
    next(e);
  }
});

router.get("/user", async function getVolunteers(req, res, next) {
  try {
    const volunteers = await User.findAll();

    res.json(volunteers);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
