/**
 * Create model structure
 */
const createModel = () => {
  return {
    "title": null, // String
    "description": null, // String
    "image": {
      "url": null // String
    },
    "site_name": null, // String
    "type": "article", // String (default)
    "url": null // String
  }
};

module.exports = {
  createModel
};