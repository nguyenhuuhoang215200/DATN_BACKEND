'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // key: DataTypes.STRING,
    // type: DataTypes.STRING,
    // values_eng: DataTypes.STRING,
    // values_vi: DataTypes.STRING,
    // sequelize,
    // modelName: 'Allcode',
    await queryInterface.createTable('Allcode', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      value_Eng: {
        type: Sequelize.STRING
      },
      value_Vi: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Allcode');
  }
};
