'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Rules',
            [
                {
                    name: 'Art History Diploma',
                    template:
                        'https://bbgs-sandbox.s3.us-east-2.amazonaws.com/F299CF3301122C4839F1DFF394F9920A_Bernardo+Henriquez.pdf',
                    type: 'Diploma',
                    language: 'English',
                    programId: 1,
                    includeDynamicDate: false,
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'History Diploma',
                    template:
                        'https://bbgs-sandbox.s3.us-east-2.amazonaws.com/F299CF3301122C4839F1DFF394F9920A_Bernardo+Henriquez.pdf',
                    type: 'Diploma',
                    language: 'English',
                    programId: 1,
                    includeDynamicDate: false,
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Computer Science Diploma',
                    template:
                        'https://bbgs-sandbox.s3.us-east-2.amazonaws.com/F299CF3301122C4839F1DFF394F9920A_Bernardo+Henriquez.pdf',
                    type: 'Diploma',
                    language: 'English',
                    programId: 1,
                    includeDynamicDate: false,
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Mathematics Diploma',
                    template:
                        'https://bbgs-sandbox.s3.us-east-2.amazonaws.com/F299CF3301122C4839F1DFF394F9920A_Bernardo+Henriquez.pdf',
                    type: 'Diploma',
                    language: 'English',
                    programId: 1,
                    includeDynamicDate: false,
                    description: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Rule', null, {});
    }
};
