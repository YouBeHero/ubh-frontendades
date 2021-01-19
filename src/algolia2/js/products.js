//  This exemple is with local  JSON file with Algilia credentials 
// Right now i added algoliasearch as package and this is specific for shoes but there is anothers products with number as sizes

const algoliaSearch = require("algoliasearch");
const client = algoliaSearch("3CUMU7CU6Q", "9b7885176dc700e465237047fce8057a"); //(AppID, AdminAPIKey)
const index = client.initIndex("ybh_index");


//  Local Json file.
const products = (require("../_JSONs/products-shoes.json"));

//  Before to send the json files on Algolia, i convert the full price and price string-->number
const produc = products.filter(element => {
    element.full_price = parseInt(element.full_price);
    element.price = parseInt(element.price);
    element.price = parseInt(element.price);

    //  There is some products wich don't have size key
    if(element.size){
        //  Some sizes are separeted by '/' and another by ',' 
        if (element.size.includes('/')){
            element.size = element.size.split('/')
        }else{
            element.size = element.size.split(',')
        }
        element.size = element.size.map(item => parseInt(item))
        return element
    }   
});
//  Then push the data on Algolia
index.replaceAllObjects(produc, { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
    console.log(objectIDs);
})
.catch(err => console.error(err));