"use strict";

module.exports = function (grunt) {
    var paths = {
        "jsparts": "js-parts/",
        "grunt": "grunt/"
    };

    require("time-grunt")(grunt);

    require("load-grunt-config")(grunt, {
        config: {
            "paths": paths
        },
        jitGrunt: {
            staticMappings: {
                "watch": "watch.js"
                //,
                //"run-executables": "grunt-run-executables",
            }
        }
    });
};