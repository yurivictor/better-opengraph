# Better Opengraph

Parses a webpage for open graph information with smart fallbacks. Will attempt to get page information even if opengraph fails.

## Install

Add it to your project:

`npm install https://github.com/yurivictor/better-opengraph.git --save`

## Easy to use

```js
var bo = require( 'better-opengraph' );
var client = bo();

client.og( 'http://www.vox.com/cards/super-super-super-secret-easter-eggs/whats-an-easter-egg', function ( response ) {
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

## Options

Standard request options from [node request lib](https://github.com/request/request). All are optional.

```js
var options = {
  jar : true
}
client.og( 'http://nyti.ms/1MAcXZj', options, function ( response ) {
  console.log( response );
} );
```

### default

-  `maxRedirects` - 50,
- `followRedirect` - true
- `jar` - true

## People

The original author is [@yurivictor](https://github.com/yurivictor).

## License

[MIT](LICENSE)

---

[back to top](#better-opengraph)
