/* global instantsearch algoliasearch */

const search = instantsearch({
    indexName: 'ybh_index',
    searchClient: algoliasearch("BFIHYR57MA", "881465747d181cdb11789d76b044aa08"),
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
        placeholder: 'Search for products name, brand or categories '
    }),

    instantsearch.widgets.clearRefinements({
        container: '#clear-refinements',
    }),

    instantsearch.widgets.refinementList({
        container: '#brand-list',
        attribute: 'brand_name',
        searchable:true,
        searchablePlaceholder: "Search for brands",
        sortBy: ["name:asc", "count:desc"]
    }),

    instantsearch.widgets.numericMenu({
        container: '#price',
        attribute: 'price',
        items: [
          { label: 'All' },
          { label: 'Less than 20$', end: 20 },
          { label: 'Between 20$ - 100$', start: 20, end: 100 },
          { label: 'More than 100$', start: 100 },
        ],
      }),

      instantsearch.widgets.refinementList({
        container: '#size',
        attribute: 'size',
        showMore: true,
    }),

    instantsearch.widgets.hierarchicalMenu({
        container: '#hierarchical-menu',
        attributes: ['hierarchicalCategories.lvl0','hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2']
    }),

    instantsearch.widgets.hitsPerPage({
        container: '#hits-per-page',
        items: [
            { label: '16 hits per page', value: 16, default: true },
            { label: '32 hits per page', value: 32 },
            { label: '64 hits per page', value: 64 },
        ],
    }),

    instantsearch.widgets.sortBy({
        container: '#sort-by',
        items: [
            { label: 'Featured', value: search.indexName, },
            { label: 'Price (asc)', value: 'price_asc' },
            { label: 'Price (desc)', value: 'price_desc' },
        ]
    }),

    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item: `
        <div>
          <img src="{{image_url}}" align="left" alt="{{product_name}}" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "product_name" }{{/helpers.highlight}}
          </div>
          <div class="hit-category">
            {{#helpers.highlight}}{ "attribute": "brand_name" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\${{price}}</div>
          <div class="hit-size">{{size}}</div>
        </div>
      `,
        empty: "<h1>No results... Please consider another query</h1>"
        },
    }),

    instantsearch.widgets.pagination({
        container: '#pagination',
    }),
]);

search.start();