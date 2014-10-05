// src/modules/app/index.js
var _ = require('lodash'),
    util = require('util'),
    forEach = require('each-async'),
    EventEmitter = require('events').EventEmitter,
    App;
    

App = function(opts) {
    this.defaults = {
        db: {
            name: 'finances',
            path: opts.cwd + '/finances.db'
        }
    };
    this.opts = _.defaults(opts, this.defaults);
    this.screen = this.opts.screen;
    this.blessed = this.opts.blessed;
    this.prg = this.opts.program;
    this.cwd = opts.cwd;

    this.modulesArr = [];
    this.expose = {};
};

util.inherits(App, EventEmitter);

App.prototype.start = function() {
    this.emit('before:start');

    this.prg.alternateBuffer();
    this.prg.disableMouse();
    this.prg.hideCursor();
    this.prg.clear();

    this.setup();

    this.emit('after:start');
};

App.prototype.setup = function() {
    forEach(this.modulesArr, (module, index, done) => {
        module.register(this, this.opts, this.screen, this.blessed, this.expose, done);
    }); 
};

App.prototype.registerModule = function(module) {
    this.modulesArr.push(module);
};

module.exports = App;
