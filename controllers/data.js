/*!
 * Better opengraph
 */

/**
 * Module dependencies
 * @private
 */
const axios = require( 'axios' );
const cheerio = require( 'cheerio' );
const { createModel } = require( '../models/model' );

/**
 * Iterate through values and make sure if
 * anything is undefined it becomes null
 * @param {Object} json - the opengraph json
 * @private
 */
const checkJSON = ( json ) => {
	const keys = Object.keys( json );
	for ( const key of keys ) {
		if ( json[key] === undefined ) {
			json[key] = null;
		}
	}
	return json;
};

/**
 * Gets site name from the URL
 * @param {String} url - the url requested
 * @private
 */
const getSiteNameFromURL = ( url ) => {
	// Get rid of protocol
	url = url.split( '://' );
	// Get first entry
	url = url[1].split( '/' );
	// Get rid of www
	url = url[0].replace( 'www.', '');
	return url;
};

/**
 * Grab some data
 * @param {String} url – the url to scrape
 * @return {Object} $ - the cheerio processed html, or error
 */
const fetch = async ( url ) => {
  var page;
  try {
    // Load the page
    page = await axios.get( url );
  } catch ( error ) {
    return  { error };
  }
  // Return processed html
  return cheerio.load( page.data );
};

/**
 * Parse html into useable opengraph information
 * @param {String} $ – the cheerio body from the webpage
 * @return {Object} json - the opengraph information from the page
 */
const parse = ( $, url ) => {
  // Create model
  let json = createModel();
  // Parse OG title, page title, first h1 title
  try {
    json['title'] = $( 'meta[property="og:title"]' ).attr( 'content' ) || $( 'title' ).text() || $( 'h1' ).first().text();
  } catch ( error ) {
    // If it can't find a title then you are probably not
    // going to be able to get anything meaningful
    return { error };
  }
  // Parse description, meta description
  json['description'] = $( 'meta[property="og:description"]' ).attr( 'content' ) || $( 'meta[name="description"]' ).attr( 'content' );
  // Parse image, link image, first page image
  json['image']['url'] = $( 'meta[property="og:image"]' ).attr( 'content' ) || $( 'link[rel="image_src"]' ).attr( 'href' ) || $( 'img' ).first().attr( 'src' );
  // Parse site name, twitter name, get name from url
  json['site_name' ] = $( 'meta[property="og:site_name"]' ).attr( 'content' ) || $( 'meta[name="twitter:site"]' ).attr( 'value' ) || getSiteNameFromURL( url );;
  // Parse type of content (defaults to article)
  json['type'] =  $( 'meta[property="og:type"]' ).attr( 'content' ) || $( 'meta[name="type"]' ).attr( 'content');
  // Parse page url
  json['url'] =  $( 'meta[property="og:url"]' ).attr( 'content' ) || $( 'link[rel="canonical"]' ).attr( 'href' ) || url;
  // Make sure JSON is properly formatted
  json = checkJSON( json );
  // Return meta information
  return json;
};

module.exports = {
  fetch,
  parse
};