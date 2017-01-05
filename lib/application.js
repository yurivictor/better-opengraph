/*!
 * Better opengraph
 */
"use strict";

/**
 * Module dependencies
 * @private
 */
const fs = require( 'fs' );
const request = require( 'request' );
const cheerio = require( 'cheerio' );
const url = require( 'url' );

/**
 * Expose prototypes
 */
let app = exports = module.exports = {};

/**
 * Initialize the settings
 *
 *   - setup default configuration
 *
 * @private
 */
app.init = function () {
  this.settings = {};
  this.defaultConfiguration();
};

/**
 * Initialize application configuration.
 * @private
 */
app.defaultConfiguration = function () {
  let options = this.options || {
      maxRedirects : 50
    , followRedirect : true
    , jar : true
    , transform : function ( body ) {
        return cheerio.load( body );
      }
  };
  this.set( 'options', options );
};

/**
 * Get og array
 *
 * @param {string} url – the url to get the information from
 * @param {object} options – (optional) the request options
 * @param {function} callback – the function to pass the og response
 * @return {array} og
 */
app.og = function ( url, options, callback ) {
  let opts = this.get( 'options' );
  // Handle options
  if ( typeof options === 'function' ) {
    callback = options;
  } else {
    opts = options;
  }
  // Handle url
  if ( ! url ) {
    this.error( 'Please provide a url.' );
  } else {
    if ( ! url.startsWith( 'http' ) ) {
      url = 'http://' + url;
    }
    opts.uri = url;
  }
  // Scope callback
  if ( callback ) { app.callback = callback; }
  // Return og information
  return request( opts, this.parse )
};

/**
 * Parse html into useable opengraph information
 *
 * @param {object} err – any errors
 * @param {object} res – the response
 * @param {string} body – the html body from the webpage
 * @return {array} og - the opengraph information from the page
 */
app.parse = function ( err, res, body ) {
  // Handle errors
  if ( err ) { return app.error( err ); }
  if( res.statusCode !== 200 ) { return app.error( 'There was a problem connecting to the url: ' + res.statusCode ) };
  // Convert body into cheerio object
  let $ = cheerio.load( body );
  // Initialize og
  let og = [];
  // Parse title
  try {
    og['title'] = $( 'meta[property="og:title"]' ).attr( 'content' ) || $( 'title' ).text() || $( 'h1' ).first().text();
  } catch ( err ) {
    // Get out if there is no title because it probably means a lot is wrong
    BO.error( 'There is not enough information on this page: ' + err );
    process.exit();
  }
  // Parse description
  og['description'] = $( 'meta[property="og:description"]' ).attr( 'content' ) || $( 'meta[name="description"]' ).attr( 'content' ) || null;
  // Parse image
  og['image'] = $( 'meta[property="og:image"]' ).attr( 'content' ) || $( 'link[rel="image_src"]' ).attr( 'href' ) || $( 'img' ).first().attr( 'src' ) || null;
  // Parse site name
  og['site_name' ] = $( 'meta[property="og:site_name"]' ).attr( 'content' ) || url.parse( res.request.uri.href ).hostname || null;
  // Parse type of content (defaults to article)
  og['type'] =  $( 'meta[property="og:type"]' ).attr( 'content' ) || $( 'meta[name="type"]' ).attr( 'content') || 'article';
  // Parse page url
  og['url'] =  $( 'meta[property="og:url"]' ).attr( 'content' ) || $( 'link[rel="canonical"]' ).attr( 'href' ) || res.request.uri.href;
  // Return meta information
  return app.callback( og );
}


/**
 * Assign `setting` to `val`, or return `setting`'s value
 *
 *    app.set('foo', 'bar');
 *    app.get('foo');
 *    // => "bar"
 *
 * @param {String} setting
 * @param {*} [val]
 * @return {Server} for chaining
 * @public
 */
app.set = function ( setting, val ) {
  if (arguments.length === 1) {
    // app.get(setting)
    return this.settings[setting];
  }
  // set value
  this.settings[setting] = val;
  return this;
};

/**
 * Return `setting`'s value
 *
 *    app.get( 'foo' );
 *    // => "bar"
 *
 * @uses {function} app.set
 * @param {String} setting
 * @return {set} for chaining
 */
app.get = function ( setting ) {
  return this.set( setting );
};

/**
 * Returns an error
 *
 *    app.error( 'error messae' );
 *    // => "error message"
 *
 * @param {String} error - the error to display
 * @return {set} for chaining
 */
app.error = function ( error ) {
  app.log( error );
  throw new Error( error );
};

/**
 * Handles logging errors to files
 *
 * @uses {function} fs
 * @param {String} error - the error to log
 */
app.log = function ( error ) {
  error = error + "\n";
  fs.appendFile( './logs/node.error.log', error );
};
