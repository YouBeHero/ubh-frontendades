/* global instantsearch algoliasearch */

function getCategorySlug(name) {
  return name
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

function getCategoryName(slug) {
  return slug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}


const search = instantsearch({
    indexName: 'ybhIndex',
    searchClient: algoliasearch("BFIHYR57MA", "881465747d181cdb11789d76b044aa08"),
    routing: {
      
      router: instantsearch.routers.history({
          windowTitle(routeState) {
              
              const search = routeState.ybhIndex
              const queryTitle = search!==undefined ? `Results for "${search.query}"` : 'YBH Search';  

              if(search!==undefined && search.hierarchicalMenu!==undefined){
                  return `${search.hierarchicalMenu['hierarchicalCategories.lvl0']} – ${queryTitle}`;
              }
              return queryTitle;
          },

          createURL({ qsModule, routeState, location }) {
              const { pathname } = location;
              const urlParts = location.href.match(/^(.*?)\/search/);
              let baseUrl = `${urlParts ? urlParts[1] : pathname}`;
              
              const categoryPath = routeState.category  ? routeState.category.map((category) => getCategorySlug(category)).join('/') + '/' : '';

              const queryParameters = {};

            if (routeState.query) {
              queryParameters.query = encodeURIComponent(routeState.query);
            }

            if (routeState.page !== 1) {
              queryParameters.page = routeState.page;
            }

            if (routeState.brands) {
              queryParameters.brands = routeState.brands.map(encodeURIComponent);
            }

            const queryString = qsModule.stringify(queryParameters, {
              addQueryPrefix: true,
              arrayFormat: 'repeat'
            });
            
            if(routeState.query || routeState.brands || routeState.category){
              return `${baseUrl}/search/${categoryPath}${queryString}`;
            }else{
              return `${baseUrl}`
            }  
                
          },

          parseURL({ qsModule, location }) {
              const pathnameMatches = location.pathname.match(/category\/(.*?)\/?$/);
              const category = ((pathnameMatches && pathnameMatches[1]) || '')
                .split('/')
                .map((path) => getCategoryName(path));

              const { query = '', page, brands = [] } = qsModule.parse(
                location.search.slice(1)
              );
              // `qs` does not return an array when there's a single value.
              const allBrands = Array.isArray(brands)
                ? brands
                : [brands].filter(Boolean);

              return {
                query: decodeURIComponent(query),
                page,
                brands: allBrands.map(decodeURIComponent),
                category,
              };
          }   
      }),
      stateMapping: {
        
        stateToRoute(uiState) {
          const indexUiState = uiState['ybhIndex'] || {};
          
          return {
            query: indexUiState.query,
            page: indexUiState.page,
            brands: indexUiState.refinementList && indexUiState.refinementList.brand_name,
            category: indexUiState.hierarchicalMenu && indexUiState.hierarchicalMenu['hierarchicalCategories.lvl0']
          };
        },
        routeToState(routeState) {
          console.log(routeState)
          return {
            ybhIndex: {
              query: routeState.query,
              page: routeState.page,
              hierarchicalMenu: {
                'hierarchicalCategories.lvl0': routeState.category
              },
              refinementList: {
                brands: routeState.brand_name
              }
            }
          };
        }
      },
     
    }
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