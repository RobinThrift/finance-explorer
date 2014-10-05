// src/modules/db/models/Entry.js

module.exports.register = function(sequelize) {
    var Sequelize = require('sequelize');

    return sequelize.define('Entry', {
        name: Sequelize.STRING,
        value: Sequelize.FLOAT,
        group: Sequelize.STRING,
        date: Sequelize.DATE
    });
};
