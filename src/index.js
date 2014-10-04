// src/index.js

function main() {
    
    'use strict';

    var blessed = require('blessed'),
        screen  = blessed.screen(),
        reqDir  = require('require-dir'),
        modules = reqDir('./modules'),
        app     = new modules.app({
            screen: screen,
            modules: modules
        });

    app.start();
}

main();
