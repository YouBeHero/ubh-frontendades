const algoliaSearch = require("algoliasearch");

const client = algoliaSearch("3CUMU7CU6Q", "9b7885176dc700e465237047fce8057a");
const index = client.initIndex('ybh_index');

index.setSettings({
    searchableAttributes: ["orded(brand_name)", "orded(product_name)", "category"]
});

index.setSettings({
    customRanking: ["asc(price)", "asc(full_price)"]
});

index.setSettings({
    attributesForFaceting: [
        'searchable(brand_name)',
        'category',
        'price',
        'size',
        'hierarchicalCategories'
    ]
});

index.setSettings({
    replicas: [
        'prices_desc',
        'prices_asc'
    ]
}).then(() => {
        console.log("It's done")
}).catch(err => console.error(err));

//  Update the replicat
const replicaAsc = client.initIndex('prices_asc');

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

const replicaDesc = client.initIndex('prices_desc');

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