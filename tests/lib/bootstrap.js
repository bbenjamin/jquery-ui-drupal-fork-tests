( function() {
//		"jquery": "../../../../../assets/vendor/jquery/jquery",
	//"jquery": "../../../external/jquery/jquery",
requirejs.config( {
	paths: {
		"jquery": "../../../../../assets/vendor/jquery/jquery",
		"jquery-simulate": "../../../../jquery-simulate/jquery.simulate",
		"lib": "../../lib",
		"phantom-bridge": "../../../../grunt-contrib-qunit/phantomjs/bridge",
		"qunit-assert-classes": "../../../../qunit-assert-classes/qunit-assert-classes",
		"qunit-assert-close": "../../../../qunit-assert-close/qunit-assert-close",
		"qunit": "../../../../qunitjs/qunit/qunit",
		"ui": "../../../../../assets/vendor/jquery.ui/ui"
	},
	shim: {
		"jquery-simulate": [ "jquery" ],
		"qunit-assert-close": [ "qunit" ]
	}
} );

// Create a module that disables back compat for UI modules
define( "jquery-no-back-compat", [ "jquery" ], function( $ ) {
	$.uiBackCompat = false;

	return $;
} );

// Load all modules in series
function requireModules( dependencies, callback, modules ) {
	if ( !dependencies.length ) {
		if ( callback ) {
			callback.apply( null, modules );
		}
		return;
	}

	if ( !modules ) {
		modules = [];
	}

	var dependency = dependencies.shift();
	require( [ dependency ], function( module ) {
		modules.push( module );
		requireModules( dependencies, callback, modules );
	} );
}

// Load a set of test file along with the required test infrastructure
function requireTests( dependencies, noBackCompat ) {
	dependencies = [
		"lib/qunit",
		noBackCompat ? "jquery-no-back-compat" : "jquery",
		"jquery-simulate"
	].concat( dependencies );

	requireModules( dependencies, function( QUnit ) {
		QUnit.start();
	} );
}

( function() {

	// Find the script element
	var scripts = document.getElementsByTagName( "script" );
	var script = scripts[ scripts.length - 1 ];

	// Read the modules
	var modules = script.getAttribute( "data-modules" );
	if ( modules ) {
		modules = modules
			.replace( /^\s+|\s+$/g, "" )
			.split( /\s+/ );
	} else {
		modules = [];
	}
	var widget = script.getAttribute( "data-widget" );
	var deprecated = !!script.getAttribute( "data-deprecated" );
	var noBackCompat = !!script.getAttribute( "data-no-back-compat" );

	if ( widget ) {
		modules = modules.concat( [
			( deprecated ? "common-deprecated" : "common" ),
			"core",
			"events",
			"methods",
			"options"
		] );
		if ( deprecated ) {
			modules = modules.concat( "deprecated" );
		}
	}

	requireTests( modules, noBackCompat );
} )();

} )();
