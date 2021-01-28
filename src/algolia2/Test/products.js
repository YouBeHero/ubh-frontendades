//  This exemple is with local  JSON file with Algilia credentials 
// Right now i added algoliasearch as package and this is specific for shoes but there is anothers products with number as sizes

const algoliaSearch = require("algoliasearch");
const client = algoliaSearch("3CUMU7CU6Q", "9b7885176dc700e465237047fce8057a"); //(AppID, AdminAPIKey)
const index = client.initIndex("ybh_index");

function prepareData(){
    //  Local Json file.
    const products = (require("./products.json"));
    //  Before to send the json files on Algolia, 
    
    const produc = products.filter(element => {
        //  I convert the full price and price string-->number
        element.full_price = parseInt(element.full_price);
        element.price = parseInt(element.price);

    //  I convert the size as an array
        if(element.size){
            //  Some sizes are separeted by '/' and another by ',' 
            if (element.size.includes('/')){
                element.size = element.size.split('/')
            }else{
                element.size = element.size.split(',')
            }  
        }  
        
        //  I create a hierarchichalCategories key
        if(element.category){
            if (element.category.includes('&gt;')){
                element.category = element.category.split('&gt;')  
            }
            element.hierarchicalCategories ={};
            for(let i=0; i<element.category.length; i++){
                if(i==0){
                    element.hierarchicalCategories[ "lvl" + i ] =element.category[i]
                }else{
                    element.hierarchicalCategories[ "lvl" + i ] =element.hierarchicalCategories[ "lvl" + (i-1) ]+' > '+element.category[i]
                }
                
            }
        
        } 
        return element
    });

    return produc;

}

function uptade(produc){
    //  Then push the data on Algolia
    index.replaceAllObjects(produc, { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
        console.log(objectIDs);
    })
    .catch(err => console.error(err))
}

uptade(prepareData());




