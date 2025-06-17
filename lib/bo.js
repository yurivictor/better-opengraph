/*!
 * Better opengraph
 */

/**
 * Module dependencies
 * @private
 */
import { fetch, parse } from '../controllers/data.js';

/**
 * Initiate OpenGraph
 * @param {String} url - the url to parse
 * @param {Function} callback - (optional) function to pass data to
 * @return json - returns opengraph json, if no callback is specified
 */
export default async ( url, callback ) => {
  // Handle lack of callback
  callback = callback || function ( json ) {
   return json;
  };
  // Get the webpage
  const $ = await fetch( url );
  // Handle errors
  if ( $.error ) { 
    throw new Error( $.error );
  }
  // Parse the webpage
  try {
    const json = parse( $, url );
    return callback( json );
  } catch ( error ) {
    throw new Error( error );
  }
};