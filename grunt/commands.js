'use strict';

module.exports = function (grunt) {
    return {
        options: {force: false},
        'copy': {
            cmd: [
                {
                    cmd: 'xcopy /s D:\\work\\projects\\dart-user-script\\dart-support.user.js C:\\Users\\mann-aa\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\0ku4mupo.default-1369634687588\\gm_scripts\\DartIT_tracker-tweaker_revo\\',
                    force: true
                }
            ]
        }
    };
};
