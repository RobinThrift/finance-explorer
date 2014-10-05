// src/index.js

function main() {
    
    'use strict';

    var blessed = require('blessed'),
        screen  = blessed.screen(),
        program = blessed.program(),
        modules = {
            App: require('./modules/app'),
        },
        app     = new modules.App({
            cwd: process.cwd(),
            screen: screen,
            blessed: blessed,
            program: program,
            modules: modules
        });


    app.start();
}

main();
