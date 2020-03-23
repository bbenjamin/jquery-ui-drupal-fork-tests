module.exports = function( grunt ) {

"use strict";

var component = grunt.option( "component" ) || "**";

require( "load-grunt-tasks" )( grunt );

grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
	qunit: {
		files: ["tests/unit/" + component + "/*.html"],
		options: {
			inject: false,
			page: {
				viewportSize: { width: 700, height: 500 }
			}
		}
	}
});

grunt.registerTask( "default", [ "test" ]);

grunt.registerTask( "test", [ "qunit" ]);


};
