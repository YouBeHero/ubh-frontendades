// This exemple is with local  JSON file with Algilia credentials
// Right now i added algoliasearch as package and this is specific for shoes but there
// is anothers products with number as sizes

const algoliaSearch = require('algoliasearch');
const client = algoliaSearch('YIHUQNGCJ6', '85d2bfc3deb77619fcdea55b2e459fc7'); //(AppID, AdminAPIKey)
const index = client.initIndex('algoliasearch');

//  Local Json file.
const products = require('../_JSONs/products-clothes.json');
console.log(products.length);
//  Before to send the json files on Algolia, i convert the full price and price string-->number
const produc = products.filter((element) => {
  element.full_price = parseInt(element.full_price);
  element.price = parseInt(element.price);
  element.price = parseInt(element.price);

  // in this part we can create a way let the user choose a price using numeric  filter.
  // Notce. this is what i found on algolia website you can find more info here.
  // https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/how-to/filter-by-numeric-value/

  index
    .search('query', {
      filters: `price < 100`,
    })
    .then(({ hits }) => {
      console.log(hits);
    });

  //     //  There is some products which don't have size key
  if (element.size) {
    //         //  Some sizes are separeted by '/' and another by ','
    if (element.size.includes('/')) {
      element.size = element.size.split('/');
    } else {
      element.size = element.size.split(',');
    }

    return element;
  }
});

//  Then push the data on Algolia
index
  .replaceAllObjects(produc, { autoGenerateObjectIDIfNotExist: true })
  .then(({ objectIDs }) => {
    console.log(objectIDs);
  })
  .catch((err) => console.error(err));
