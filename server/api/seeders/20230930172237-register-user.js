'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Users', [{
       name: 'John Doe',
       contactNumber: '+558597856425',
       email: 'john@email.com',
      password: 'admin',
      status: 'true',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
