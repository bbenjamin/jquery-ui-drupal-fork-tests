module.exports = function( grunt ) {

"use strict";

var component = grunt.option( "component" ) || "**";

grunt.loadNpmTasks("grunt-contrib-qunit");

grunt.initConfig({
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
