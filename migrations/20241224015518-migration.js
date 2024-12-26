module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("USER", "password", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("USER", "password", {
      type: Sequelize.STRING(225),
      allowNull: false,
    });
  },
};
