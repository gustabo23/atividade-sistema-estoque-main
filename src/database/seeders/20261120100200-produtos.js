'use strict';

/**
 * qnt_atual bate com a soma das movimentações do seeder seguinte
 * (entradas - saídas). Produtos 2, 4 e 6 ficam em estoque baixo
 * (qnt_atual <= estoque_minimo) e o 9 está inativo, para a demonstração.
 *
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('produtos', [
      {
        id: 1,
        nome: 'Detergente neutro 500ml',
        codigo: 'LMP-001',
        descricao: 'Detergente líquido neutro',
        unidade: 'un',
        categoria_id: 1,
        fornecedor_id: 1,
        qnt_atual: 32,
        estoque_minimo: 20,
        ativo: true,
      },
      {
        id: 2,
        nome: 'Água sanitária 1L',
        codigo: 'LMP-002',
        descricao: null,
        unidade: 'un',
        categoria_id: 1,
        fornecedor_id: 1,
        qnt_atual: 8,
        estoque_minimo: 15,
        ativo: true,
      },
      {
        id: 3,
        nome: 'Papel A4 (caixa com 10 resmas)',
        codigo: 'ESC-001',
        descricao: 'Papel sulfite 75g/m²',
        unidade: 'cx',
        categoria_id: 2,
        fornecedor_id: 2,
        qnt_atual: 28,
        estoque_minimo: 10,
        ativo: true,
      },
      {
        id: 4,
        nome: 'Caneta esferográfica azul (caixa com 50)',
        codigo: 'ESC-002',
        descricao: null,
        unidade: 'cx',
        categoria_id: 2,
        fornecedor_id: 2,
        qnt_atual: 3,
        estoque_minimo: 5,
        ativo: true,
      },
      {
        id: 5,
        nome: 'Mouse óptico USB',
        codigo: 'INF-001',
        descricao: 'Mouse com fio, 1200 DPI',
        unidade: 'un',
        categoria_id: 3,
        fornecedor_id: 3,
        qnt_atual: 11,
        estoque_minimo: 5,
        ativo: true,
      },
      {
        id: 6,
        nome: 'Teclado ABNT2 USB',
        codigo: 'INF-002',
        descricao: null,
        unidade: 'un',
        categoria_id: 3,
        fornecedor_id: 3,
        qnt_atual: 5,
        estoque_minimo: 5,
        ativo: true,
      },
      {
        id: 7,
        nome: 'Café torrado e moído',
        codigo: 'ALM-001',
        descricao: 'Pacote de 500g',
        unidade: 'kg',
        categoria_id: 4,
        fornecedor_id: 1,
        qnt_atual: 15,
        estoque_minimo: 10,
        ativo: true,
      },
      {
        id: 8,
        nome: 'Açúcar refinado',
        codigo: 'ALM-002',
        descricao: 'Pacote de 1kg',
        unidade: 'kg',
        categoria_id: 4,
        fornecedor_id: 1,
        qnt_atual: 14,
        estoque_minimo: 10,
        ativo: true,
      },
      {
        id: 9,
        nome: 'Pen drive 32GB',
        codigo: 'INF-003',
        descricao: 'Fora de linha',
        unidade: 'un',
        categoria_id: 3,
        fornecedor_id: 3,
        qnt_atual: 0,
        estoque_minimo: 3,
        ativo: false,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('produtos', null, {});
  },
};
