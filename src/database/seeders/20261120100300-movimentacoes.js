'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const d = (dia, hora) => new Date(`2026-11-${dia}T${hora}:00-03:00`);

    await queryInterface.bulkInsert('movimentacao', [
      // Entradas iniciais (compra dos fornecedores)
      {
        produto_id: 1,
        tipo: 'ENTRADA',
        quantidade: 50,
        motivo: 'Compra inicial - NF 1001',
        data: d('03', '09:00'),
      },
      {
        produto_id: 2,
        tipo: 'ENTRADA',
        quantidade: 30,
        motivo: 'Compra inicial - NF 1001',
        data: d('03', '09:00'),
      },
      {
        produto_id: 7,
        tipo: 'ENTRADA',
        quantidade: 25,
        motivo: 'Compra inicial - NF 1001',
        data: d('03', '09:00'),
      },
      {
        produto_id: 8,
        tipo: 'ENTRADA',
        quantidade: 20,
        motivo: 'Compra inicial - NF 1001',
        data: d('03', '09:00'),
      },
      {
        produto_id: 3,
        tipo: 'ENTRADA',
        quantidade: 40,
        motivo: 'Compra inicial - NF 2001',
        data: d('04', '10:30'),
      },
      {
        produto_id: 4,
        tipo: 'ENTRADA',
        quantidade: 10,
        motivo: 'Compra inicial - NF 2001',
        data: d('04', '10:30'),
      },
      {
        produto_id: 5,
        tipo: 'ENTRADA',
        quantidade: 15,
        motivo: 'Compra inicial - NF 3001',
        data: d('05', '14:00'),
      },
      {
        produto_id: 6,
        tipo: 'ENTRADA',
        quantidade: 8,
        motivo: 'Compra inicial - NF 3001',
        data: d('05', '14:00'),
      },
      {
        produto_id: 9,
        tipo: 'ENTRADA',
        quantidade: 5,
        motivo: 'Compra inicial - NF 3001',
        data: d('05', '14:00'),
      },

      // Saídas (consumo interno pelos setores)
      {
        produto_id: 1,
        tipo: 'SAIDA',
        quantidade: 10,
        motivo: 'Requisição - setor de limpeza',
        data: d('08', '08:15'),
      },
      {
        produto_id: 2,
        tipo: 'SAIDA',
        quantidade: 12,
        motivo: 'Requisição - setor de limpeza',
        data: d('08', '08:15'),
      },
      {
        produto_id: 3,
        tipo: 'SAIDA',
        quantidade: 7,
        motivo: 'Requisição - secretaria',
        data: d('10', '11:00'),
      },
      {
        produto_id: 4,
        tipo: 'SAIDA',
        quantidade: 4,
        motivo: 'Requisição - secretaria',
        data: d('10', '11:00'),
      },
      {
        produto_id: 5,
        tipo: 'SAIDA',
        quantidade: 4,
        motivo: 'Reposição - laboratório 2',
        data: d('11', '15:40'),
      },
      {
        produto_id: 6,
        tipo: 'SAIDA',
        quantidade: 3,
        motivo: 'Reposição - laboratório 2',
        data: d('11', '15:40'),
      },
      {
        produto_id: 7,
        tipo: 'SAIDA',
        quantidade: 10,
        motivo: 'Consumo - copa',
        data: d('12', '09:20'),
      },
      {
        produto_id: 8,
        tipo: 'SAIDA',
        quantidade: 6,
        motivo: 'Consumo - copa',
        data: d('12', '09:20'),
      },
      {
        produto_id: 9,
        tipo: 'SAIDA',
        quantidade: 5,
        motivo: 'Distribuição - coordenação',
        data: d('13', '16:00'),
      },
      {
        produto_id: 1,
        tipo: 'SAIDA',
        quantidade: 8,
        motivo: 'Requisição - setor de limpeza',
        data: d('17', '08:30'),
      },
      {
        produto_id: 2,
        tipo: 'SAIDA',
        quantidade: 10,
        motivo: 'Requisição - setor de limpeza',
        data: d('17', '08:30'),
      },
      {
        produto_id: 3,
        tipo: 'SAIDA',
        quantidade: 5,
        motivo: 'Requisição - coordenação',
        data: d('18', '13:10'),
      },
      {
        produto_id: 4,
        tipo: 'SAIDA',
        quantidade: 3,
        motivo: 'Requisição - coordenação',
        data: d('18', '13:10'),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movimentacao', null, {});
  },
};
