const searchClient = algoliasearch(
    'INTGABK9HK',
    '09b33dd55df6515157fa641dbb30acf6'
);

const encodedCategories = {
    mpotakia: 'Μποτάκια',
    goves: 'Γόβες',
    pedila: 'Πέδιλα',
    sandalia: 'Σανδάλια',
    anatomika: 'Ανατομικά',
    athlhtika: 'Αθλητικά'
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
    const newKey = encodedCategories[key];
    const newValue = key;

    return {
        ...acc,
        [newKey]: newValue,
    };
}, {});

function getCategorySlug(name) {
    const encodedName = decodedCategories[name] || name;

    return encodedName
        .split(' ')
        .map(encodeURIComponent)
        .join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
    const decodedSlug = encodedCategories[slug] || slug;

    return decodedSlug
        .split('+')
        .map(decodeURIComponent)
        .join(' ');
}

const routing = {
    router: instantsearch.routers.history({
        windowTitle({ category, query }) {
            const queryTitle = query ? `Αποτελέσματα για "${query}" - YouBeHero` : 'Προϊόντα - YouBeHero';

            if (category) {
                return `${category} - ${queryTitle}`;
            }

            return queryTitle;

        },

        createURL({ qsModule, routeState, location }) {
            const urlParts = location.href.match(/^(.*?)\/gr\/category/);
            const baseUrl = `${urlParts ? urlParts[1] : ''}/`;
            const categoryPath = routeState.category ?
                routeState.category
                .map((category) => getCategorySlug(category))
                .join('/') + '/' :
                '';
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
                arrayFormat: 'repeat',
            });
            return `${baseUrl}gr/category/${categoryPath}${queryString}`;
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
            const allBrands = Array.isArray(brands) ?
                brands : [brands].filter(Boolean);

            return {
                query: decodeURIComponent(query),
                page,
                brands: allBrands.map(decodeURIComponent),
                category,
            };
        },
    }),

    stateMapping: {
        stateToRoute(uiState) {
            const indexUiState = uiState['products'] || {};
            return {
                query: indexUiState.query,
                page: indexUiState.page,
                brands: indexUiState.refinementList && indexUiState.refinementList.brand,
                category: indexUiState.hierarchicalMenu &&
                    indexUiState.hierarchicalMenu['products.lvl0'], //WHAT IS THIS?
            };
        },

        routeToState(routeState) {
            return {
                linkwise_shops: {
                    query: routeState.query,
                    page: routeState.page,
                    hierarchicalMenu: {
                        'categories.lvl0': routeState.category,
                    },
                    refinementList: {
                        brand: routeState.brands,
                    },
                },
            };
        },
    },
};

const search = instantsearch({
    indexName: 'products',
    searchClient,
    routing
});

// Create the render function
const renderList = ({ items, createURL }) => `
  <ul class="ais-HierarchicalMenu-list">
    ${items
      .map(
        item => `
          <li class="ais-HierarchicalMenu-item">
            <a class="ais-HierarchicalMenu-link mb-1 smaller-1"
              href="${createURL(item.value)}"
              data-value="${item.value}"
              style="font-weight: ${item.isRefined ? 'bold' : 'normal'}"
            >
              ${item.label} <small class="text-dark">(${item.count})</small>
            </a>
            ${item.data ? renderList({ items: item.data, createURL }) : ''}
          </li>
        `
      )
      .join('')}
  </ul>
`;

const renderHierarchicalMenu = (renderOptions, isFirstRender) => {
    const {
      items,
      isShowingMore,
      refine,
      toggleShowMore,
      createURL,
      widgetParams,
    } = renderOptions;
  
    if (isFirstRender) {
      const list = document.createElement('div');
     
  
      widgetParams.container.appendChild(list);
      
    }
  
    const children = renderList({ items, createURL });
  
    widgetParams.container.querySelector('div').innerHTML = children;
    
    [...widgetParams.container.querySelectorAll('a')].forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        refine(event.target.dataset.value);
      });
    });
  };


//
// LEARN HOW TO MAKE THE WIDGET
//

// Create the custom widget
const customHierarchicalMenu = instantsearch.connectors.connectHierarchicalMenu(
    renderHierarchicalMenu
  );
  
  // Instantiate the custom widget
  search.addWidgets([
    customHierarchicalMenu({
      container: document.querySelector('#hierarchical-menu'),
      attributes: [
        'categories.lvl0',
        'categories.lvl1',
      ],
      showParentLevel: true,
      showMore: false,
      limit: 100,
      showMoreLimit: 1000
    })
  ]);