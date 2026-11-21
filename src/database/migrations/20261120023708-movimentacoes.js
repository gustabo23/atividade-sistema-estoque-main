'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimentacao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      produto_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        allowNull: false,
        references: {
          model: 'produtos',
          key: 'id',
        },
      },
      tipo: {
        type: Sequelize.ENUM('ENTRADA', 'SAIDA', 'AJUSTE'),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      motivo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('movimentacao');
  },
};
