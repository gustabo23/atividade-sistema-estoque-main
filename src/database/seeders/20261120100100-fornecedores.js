'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('fornecedores', [
      {
        id: 1,
        nome: 'Distribuidora Norte Ltda',
        cnpj: '11.222.333/0001-81',
        telefone: '(91) 3222-1000',
        email: 'contato@distnorte.com.br',
      },
      {
        id: 2,
        nome: 'Papelaria Amazônia',
        cnpj: '22.333.444/0001-90',
        telefone: '(91) 3244-2000',
        email: 'vendas@papelariaamazonia.com.br',
      },
      {
        id: 3,
        nome: 'TecInfo Suprimentos',
        cnpj: '33.444.555/0001-02',
        telefone: '(91) 98888-3000',
        email: 'comercial@tecinfo.com.br',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('fornecedores', null, {});
  },
};
