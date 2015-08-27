# Better Opengraph lib

A really simple library that parses a page for open graph information with some smart fallbacks.

## Install

Add it to your project:

`npm install https://github.com/yurivictor/better-opengraph.git --save`

## Easy to use

```js
var Opengraph = require( 'better-opengraph' );
var og = new Opengraph();
og.get( 'http://www.vox.com/2015/8/27/9214687/donald-trump-numbers-soar', function ( response ) {
  console.log( response );
} );
```

## Response

* **title** {string} – The article title
* **description** {string} – The article description
* **image** {object}
  * **url** {string} – The lead image for the article
* **site_name** {string} – The name of the site
* **type** {string} – The type of content (usually article)
* **url** {url} – The canonical url for the page

---

[back to top](#table-of-contents)
