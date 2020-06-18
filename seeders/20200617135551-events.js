"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "events",
      [
        {
          title: "Learn Dutch",
          detail: "Its for people who want to learn Dutch.",
          imageUrl:
            "https://www.taalcoachwijzer.nl/wp-content/uploads/2016/04/SandraEiman-691jpg.jpg",
          date: 19720020,
          location: "Amstelveen,Netherlands",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Learn to cook",
          detail: "Its a event where people come and cook together",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyD4zow0BpsUmx8cnEuFPbK5UutHvzMVPUxEl5qit9ZOfEGL7I&usqp=CAU",
          date: 15720020,
          location: "Amstelveen,Netherlands",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Art and crafts",
          detail:
            "A fun way to learn art and crafts and also share your ideas and talent",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiYrqG1fvvhKf4nyuAItUriMIT1hQipCKHSKURM6Sd9pKxm0nn&usqp=CAU",
          date: 20820020,
          location: "Amstelveen,Netherlands",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Zumba",
          detail:
            "Zumba is for everyone! Anybody who's interested in Dance Fitness/ Zumba classes can join this group .No prior Dance or Group Fitness experience required.",

          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVrHjkokTN_uFeOPM3aIAAlRHOKfoltxKW1CTYCLlSHM8zZ3ks&usqp=CAU",
          date: 10820020,
          location: "Amstelveen,Netherlands",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("events", null, {});
  },
};
