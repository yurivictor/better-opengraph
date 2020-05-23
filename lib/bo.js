/*!
 * Better opengraph
 */

/**
 * Module dependencies
 * @private
 */
const { fetch, parse } = require( '../controllers/data' );

/**
 * Initiate OpenGraph
 * @param {String} url - the url to parse
 * @param {Function} callback - (optional) function to pass data to
 * @return json - returns opengraph json, if no callback is specified
 */
module.exports = bo = async ( url, callback ) => {
  // Handle lack of callback
  var newCallback;
  if ( typeof callback !== 'function' ) { 
    newCallback = ( json ) => {
      return json;
    };
  } else {
    newCallback = callback;
  }
  // Get the webpage
  const $ = await fetch( url );
  // Handle errors
  if ( $.error ) { 
    return newCallback( $.error ) 
  }
  // Parse the webpage
  const json = parse( $, url );
  // Return the opengraph data
  return newCallback( json );
};