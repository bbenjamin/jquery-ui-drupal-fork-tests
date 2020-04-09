module.exports = function( grunt ) {

	"use strict";

	var components = [
		"autocomplete",
		"button",
		"checkboxradio",
		"controlgroup",
		"core",
		"dialog",
		"draggable",
		"form-reset-mixin",
		"menu",
		"position",
		"resizable",
		"widget"
	];

	var component = grunt.option( "component" ) || "**";
	var files = [];

	if (grunt.option( "skip" ) && component === "**") {
		var toBeSkipped = grunt.option( "skip" ).split(",").map(function(item) {
			return item.trim().toLowerCase();
		});
		for (var i = 0; i < components.length; i++) {
			if (!toBeSkipped.includes(components[i])) {
				files.push("tests/unit/" + components[i] + "/*.html");
			}
		}
	} else {
		files.push("tests/unit/" + component + "/*.html");
	}

	grunt.task.loadTasks("../grunt-contrib-qunit/tasks");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		qunit: {
			files: files,
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
