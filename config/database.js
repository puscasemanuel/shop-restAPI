const { Sequelize } = require('sequelize');

const connection = async () => {
  const db = new Sequelize(process.env.DATABASE);
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connection;
