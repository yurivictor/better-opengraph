# Better Opengraph

Parses a webpage for opengraph information with smart fallbacks. Will attempt to get page information even if opengraph information does not exist.

## Install

Add it to your project:

`npm i https://github.com/yurivictor/better-opengraph.git --save`

## Easy to use

```js
const bo = require( 'better-opengraph' );

bo( 'https://www.nytimes.com/', ( json ) => {
  console.log( json );
} );
```

## Response

* **title** {String} – The webpage title
* **description** {String} – The webpage description
* **image** {Object}
  * **url** {String} – The image for the page
* **site_name** {String} – The name of the site
* **type** {String} – The type of content (default: article)
* **url** {String} – The canonical url for the page or the requested url

## People

The original author is [@yurivictor](https://github.com/yurivictor).

## License

[MIT](LICENSE)

---

[back to top](#better-opengraph)
