# Better Opengraph

Parses a webpage for [opengraph](https://ogp.me/) information with smart fallbacks. Will attempt to get page information even if opengraph information does not exist.

## Install

```bash
npm install better-opengraph
```

## Usage

### ES Modules (recommended)

```js
import og from 'better-opengraph';

try {
  const result = await og('https://www.nytimes.com/');
  console.log(result);
} catch (error) {
  console.error(error);
}
```

### With callback

```js
import og from 'better-opengraph';

og('https://www.nytimes.com/', (result) => {
  console.log(result);
});
```

### Promise-based

```js
import og from 'better-opengraph';

og('https://www.nytimes.com/')
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## API

### `og(url[, callback])`

Parses the given URL for OpenGraph metadata.

**Parameters:**
- `url` (String) - The URL to parse
- `callback` (Function, optional) - Callback function to receive the result

**Returns:** Promise that resolves to the parsed metadata object

## Response Format

* **title** {String} – The webpage title
* **description** {String} – The webpage description
* **image** {Object}
  * **url** {String} – The image for the page
* **site_name** {String} – The name of the site
* **type** {String} – The type of content (default: article)
* **url** {String} – The canonical url for the page or the requested url

### Example Response

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
