var url = require('url');
var request = require( 'request' );
var cheerio = require( 'cheerio' );

function Opengraph () {}

Opengraph.prototype = {
  options: {
    maxRedirects: 50,
    followRedirect: true,
    jar: true
  },
  get: function ( url, options, callback ) {
    if ( typeof options === 'function' ) {
      callback = options;
    } else {
      this.options = options;
    }
    if ( ! url ) {
      throw new Error( 'Please provide a url.' );
    } else {
      this.options.url = url;
    }
    request( this.options, function( error, response, body ) {
      if ( ! error && response.statusCode == 200 ) {
        $ = cheerio.load( body );
        var meta = {};
        meta['title'] = $( 'meta[property="og:title"]' ).attr( 'content' ) || $( 'title' ).text();
        if ( ! meta['title'] ) {
          if ( $( 'h1' ).length ) {
            meta['title'] = $( 'h1' ).first().text();
          } else {
            console.log( 'There is not enough information on this page.' );
          }
        }
        meta['description'] = $( 'meta[property="og:description"]' ).attr( 'content' ) || $( 'meta[name="description"]' ).attr( 'content' ) || null;
        meta['image'] = {};
        meta['image']['url'] = $( 'meta[property="og:image"]' ).attr( 'content' ) || $( 'link[rel="image_src"]' ).attr( 'href' );
        if ( ! meta['image']['url]'] ) {
          if ( $( 'img' ).length ) {
            meta['image']['url'] = $( 'img' ).first().attr( 'src' );
          } else {
            meta['image']['url]'] = null;
          }
        }
        meta['site_name' ] = $( 'meta[property="og:site_name"]' ).attr( 'content' ) || null;
        meta['type'] =  $( 'meta[property="og:type"]' ).attr( 'content' ) || $( 'meta[name="type"]' ).attr( 'content') || 'article';
        meta['url'] =  $( 'meta[property="og:url"]' ).attr( 'content' ) || $( 'link[rel="canonical"]' ).attr( 'href' ) || url;
        callback( meta );
      } else {
        console.log( 'There was a problem connecting: ' + error );
      }
    } );
  }
};

module.exports = Opengraph;
