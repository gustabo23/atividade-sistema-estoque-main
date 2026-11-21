'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categorias', [
      { id: 1, nome: 'Limpeza', descricao: 'Produtos de limpeza e higiene' },
      { id: 2, nome: 'Escritório', descricao: 'Material de escritório e papelaria' },
      { id: 3, nome: 'Informática', descricao: 'Periféricos e acessórios de informática' },
      { id: 4, nome: 'Alimentos', descricao: 'Itens de copa e cozinha' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categorias', null, {});
  },
};
