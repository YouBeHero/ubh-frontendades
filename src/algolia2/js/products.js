//  This exemple is with local  JSON file with Algilia credentials 
// Right now i added algoliasearch as package and

const algoliaSearch = require("algoliasearch");
const client = algoliaSearch("3CUMU7CU6Q", "9b7885176dc700e465237047fce8057a"); //(AppID, AdminAPIKey)
const index = client.initIndex("ybh_index");


//  Local Json file.
const products = (require("../_JSONs/products.json"));

//  Before to send the json files on Algolia, i convert the full price and price string-->number
const produc = products.map(element => {
    element.full_price = parseInt(element.full_price);
    element.price = parseInt(element.price);
    return element
});
console.log( produc)
//  Then push the data on Algolia
index.replaceAllObjects(produc, { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
    console.log(objectIDs);
})
.catch(err => console.error(err));