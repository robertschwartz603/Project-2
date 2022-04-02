const sequelize = require('../config/connection');
const { User, Hotdog } = require('../models');

const userData = require('./userData.json');
const hotdogData = require('./hotdogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const hotdog of hotdogData) {
    await Hotdog.create({
      ...hotdog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();