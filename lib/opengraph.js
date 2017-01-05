/*!
 * Better Opengraph
 */

'use strict';

/**
 * Module dependencies
 */
const EventEmitter = require( 'events' ).EventEmitter;
const mixin        = require( 'merge-descriptors' );
const proto        = require( './application' );

/**
 * Expose `createApplication()`
 */
exports = module.exports = createApplication;

/**
 * Create opengraph application
 *
 * @return {function} app
 * @api public
 */
function createApplication( options ) {
  let app = function ( next ) {};

  mixin( app, EventEmitter.prototype, false );
  mixin( app, proto, false );

  app.options = options;
  app.init();
  return app;
};

/**
 * Expose the prototype.
 */
exports.application = proto;
