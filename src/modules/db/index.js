// src/modules/db/index.js

var Sequelize = require('sequelize'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    reqDir = require('require-dir'),
    _ = require('lodash'),
    DB;

DB = function() {
    this.models = {};
};

util.inherits(DB, EventEmitter);

DB.prototype.init = function(config, done) {
    this.seq = new Sequelize(config.db.name, null, null,  {
        dialect: 'sqlite',
        storage: config.db.path
    });

   _.forEach(reqDir('./models'), (model, name) => {
        this.models[name.replace('.js', '')] = model.register(this.seq);
   });

    this.seq.sync({
            logging: false
        })
        .complete(function(err) {
            if (err) { throw err; }
            done();
        });
};

DB.prototype.register = function(app, config, screen, blessed, expose, done) {
    this.init(config, done);
    expose.DB = this;
};

module.exports = new DB();
