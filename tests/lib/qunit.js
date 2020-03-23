define( [
	"qunit",
	"jquery",
	"qunit-assert-classes",
	"qunit-assert-close",
	"lib/qunit-assert-domequal",
	"phantom-bridge"
], function( QUnit, $ ) {

QUnit.config.autostart = false;
QUnit.config.requireExpects = true;

QUnit.reset = ( function( reset ) {
	return function() {

		// Ensure jQuery events and data on the fixture are properly removed
		$( "#qunit-fixture" ).empty();

		// Let QUnit reset the fixture
		reset.apply( this, arguments );
	};
} )( QUnit.reset );

return QUnit;

} );
