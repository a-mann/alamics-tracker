'use strict';

module.exports = function (grunt) {
    return {
        options: {force: false},
        'copy': {
            cmd: [
                {
                    cmd: 'xcopy /S /Y D:\\work\\projects\\dart-user-script\\dart-support.user.js C:\\Users\\mann-aa\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\bqsnp692.default-1492581588453\\gm_scripts\\DartIT_tracker-tweaker_revo\\',
                    force: true
                }
            ]
        }
    };
};