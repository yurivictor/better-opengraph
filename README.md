# Better Opengraph

Parses a webpage for opengraph information with smart fallbacks. Will attempt to get page information even if opengraph information does not exist.

## Install

Add it to your project:

`npm i https://github.com/yurivictor/better-opengraph.git --save`

## Easy to use

```js
const bo = require( 'better-opengraph' );

bo( url )
.then( json => console.log( json ) )
.catch( error => console.log( error ) );
```

## Response

* **title** {String} – The webpage title
* **description** {String} – The webpage description
* **image** {Object}
  * **url** {String} – The image for the page
* **site_name** {String} – The name of the site
* **type** {String} – The type of content (default: article)
* **url** {String} – The canonical url for the page or the requested url

### Example

```json
{
  "title": "Breaking News, World News & Multimedia",
  "description": "The New York Times: Find breaking news, multimedia, reviews & opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars & more at nytimes.com.",
  "image": {
    "url": "https://static01.nyt.com/newsgraphics/images/icons/defaultPromoCrop.png"
  },
  "site_name": "@nytimes",
  "type": "website",
  "url": "https://www.nytimes.com"
}
```

## People

The original author is [@yurivictor](https://github.com/yurivictor).

## License

[MIT](LICENSE)

---

[back to top](#better-opengraph)
