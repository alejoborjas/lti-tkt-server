'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Programs',
            [
                {
                    name: 'Art History',
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'History',
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Computer Science',
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Mathematics',
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Program', null, {});
    }
};
