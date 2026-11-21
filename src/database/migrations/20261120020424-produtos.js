'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      codigo: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      unidade: {
        type: Sequelize.ENUM('un', 'kg', 'cx'),
        allowNull: false,
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id',
        },
      },
      fornecedor_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        allowNull: false,
        references: {
          model: 'fornecedores',
          key: 'id',
        },
      },
      qnt_atual: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      estoque_minimo: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('produtos');
  },
};
