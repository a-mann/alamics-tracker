"use strict";

module.exports = function (grunt) {
    var paths = {
        "grunt": "grunt/"
    };
    
    require("load-grunt-config")(grunt, {
        config: {
            "paths": paths
        },
        jitGrunt: {
            staticMappings: {
                "watch": "watch.js",
                "commands": "grunt-commands",
            }
        }
    });
};