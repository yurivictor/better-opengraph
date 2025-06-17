const bo = require( './index.js' );

bo( 'https://www.nytimes.com/' )
.then( json => console.log( json ) )
.catch( error => console.log( error ) );