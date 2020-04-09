# Tests for Drupal core's fork of jQuery UI.

## Why is there a Drupal core fork of jQuery UI?
jQuery UI was [added to Drupal core in 2009](https://www.drupal.org/node/315035)
, but jQuery UI has been unmaintained since 2017 and listed as an **Emeritus project** in
[https://openjsf.org/projects/](https://openjsf.org/projects/).
It describes an Emeritus project as:
> Emeritus projects are those which the maintainers feel have reached or are nearing end-of-life**

Drupal is in the process of removing jQueryUI, but some components have not yet
been replaced. To ensure these components are maintained, Drupal now uses a fork
of jQuery UI 1.12.1 that includes only the components in use.

## About the tests

The Drupal fork of jQuery UI still needs test coverage. This is a refactor of
jQuery UI's Qunit tests built to be run by Drupal.org's CI. Dependencies were
reduced to only the ones necessary for Drupal's purposes, and many tests were
removed for these reasons: 
- They require a jQuery UI component that is not included in Drupal's fork
- The tests fail due to incompatibility with jQuery 3.4.1, the version used in
Drupal core. The tests in jQuery UI are only guaranteed to work up to jQuery
3.1.0. Tests that do not work with newer versions of jQuery have been commented
out and noted which version of jQuery they ceased working in.

## What Components are Tested?
- autocomplete
- button
- checkboxradio
- controlgroup
- core
- dialog
- draggable
- form-reset-mixin
- menu
- position
- resizable
- widget

## Running the Tests
These must be run from Drupal's /core directory. Run 
```yarn --cwd node_modules/jquery-ui-drupal-fork-tests test``` to run every test
in the suite.

### Options
``--component=<componentName>`` to run the tests for a single component

``--skip=<componentName,componentName>`` to skip a component in the tests.
Note that this option can't be used alongside ``--component``.
