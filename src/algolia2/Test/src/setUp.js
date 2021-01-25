// To run this file you need to install 'npm install algoliasearch instantsearch.js' and the 'node setUp.js'
const algoliaSearch = require("algoliasearch");

const client = algoliaSearch("3CUMU7CU6Q", "9b7885176dc700e465237047fce8057a");
const index = client.initIndex('ybh-index');

index.setSettings({
    searchableAttributes: ["orded(brand_name)", "orded(product_name)", "category"]
});

index.setSettings({
    customRanking: ["asc(price)", "asc(full_price)"]
});

index.setSettings({
    attributesForFaceting: [
        'brand_name',
        'category',
        'price',
        'size'
    ]
});

index.setSettings({
    replicas: [
        'price-desc',
        'price-asc'
    ]
}).then(() => {
        console.log("It's done")
}).catch(err => console.error(err));

//  Update the replicat
const replicaAsc = client.initIndex('price-asc');

replicaAsc.setSettings({
    ranking: [
        "asc(price)",
        "typo",
        "geo",
        "words",
        "filters",
        "proximity",
        "attribute",
        "exact",
        "custom"
    ]
}).then(() => {
    console.log("It's done for asc")
});

const replicaDesc = client.initIndex('price-desc');

replicaDesc.setSettings({
    ranking: [
        "desc(price)",
        "typo",
        "geo",
        "words",
        "filters",
        "proximity",
        "attribute",
        "exact",
        "custom"
    ]
}).then(() => {
    console.log("It's done for desc")
});