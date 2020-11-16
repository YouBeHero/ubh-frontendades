/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'Y9NV6194MT',
  'd3191a6f8232cbedb18b93ba922b71af'
);

const encodedCategories = {
  ilektronika: 'Η/Υ Ηλεκτρονικά',
  ypologistes_ilektronika: 'Η/Υ / Ηλεκτρονικά',
  moda_omorfia: 'Μόδα & Ομορφιά',
  polikatastimata: 'Πολυκαταστήματα',
  proionta: 'Προϊόντα',
  taksidia: 'Ταξίδια',
  analosima: 'Αναλώσιμα',
  ipiresies: 'Υπηρεσίες',
  fitness: 'Fitness / Υγεία',
  endisi: 'Ένδυση',
  athlitika: 'Αθλητικά Είδη',
  aksesouar: 'Αξεσουάρ',
  idi_farmakeiou: 'Είδη Φαρμακείου',
  esorouxa: 'Εσώρουχα',
  kosmimata: 'Κοσμήματα',
  optika: 'Οπτικά',
  paidika_rouxa: 'Παιδικά Ρούχα / Παπούτσια',
  papoutsia: 'Παπούτσια',
  prosopiki_frontida_kallintika: 'Προσωπική Φροντίδα / Καλλυντικά',
  rologia: 'Ρολόγια',
  ygeia_omorfia: 'Υγεία & Ομορφιά',
  gadgets: 'Gadgets',
  agrotika_proionta: 'Αγροτικά Προϊόντα',
  autokinita_mixanes: 'Αυτοκίνητα / Μηχανές',
  vivlia: 'Βιβλία / CD / DVD',
  gamilia: 'Γαμήλια / Βαπτιστικά',
  idi_supermarket: 'Είδη Supermarket',
  dora: 'Είδη Δώρων',
  idi_spitiou_kipos_diy: 'Είδη Σπιτιού / Κήπος / DIY',
  taksidi: 'Είδη Ταξιδίου',
  ilektrikes_siskeues: 'Ηλεκτρικές Συσκευές',
  katikidia_zoa: 'Κατοικίδια / Ζώα',
  louloudia: 'Λουλούδια',
  mousiki: 'Μουσική / Εξοπλισμός',
  paixnidia: 'Παιχνίδια',
  kouponia: 'Προσφορές / Κουπόνια',
  spiti_kipos: 'Σπίτι & Κήπος',
  silloges: 'Συλλογές / Συλλέκτες',
  fagito: 'Φαγητό / Ποτό',
  aeroporika_isitiria: 'Αεροπορικά Εισιτήρια',
  aktoploika_isitiria: 'Ακτοπλοϊκά Εισιτήρια',
  enoikiaseis_autokiniton: 'Ενοικιάσεις Αυτοκινήτων',
  krouazieres: 'Κρουαζιέρες',
  xenodoxeia: 'Ξενοδοχεία',
  paketa_taksidion: 'Πακέτα Ταξιδίων',
  browser_games: 'Browser Games',
  hosting_domains: 'Hosting / Domains',
  gamos_vaptisi: 'Γάμος / Βάπτιση',
  dimoprasies: 'Δημοπρασίες',
  diakosmisi: 'Διακόσμηση',
  diaskedasi: 'Διασκέδαση / Ψυχαγωγία',
  diafimisi: 'Διαφήμιση / Marketing',
  ekpaideusi: 'Εκπαίδευση',
  energeia: 'Ενέργεια / Φωτοβολταϊκά',
  estiasi_delivery: 'Εστίαση / Delivery',
  tilefonia: 'Κινητή / Σταθερή τηλεφωνία',
  revma: 'Πάροχοι Ηλ. Ρεύματος'
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

/*function setCanonical() {
    var canonical = "";
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i ++) {
        if (links[i].getAttribute("rel") === "canonical") {
            canonical = links[i].getAttribute("href")
        }
    }
    alert(canonical);
    canonical = links[i].setAttribute("href", "adfasfasdfasdf")
    alert(canonical);
}*/

const routing = {
  router: instantsearch.routers.history({
    windowTitle({ category, query }) {
      const queryTitle = query ? `Αποτελέσματα για "${query}" - YouBeHero` : 'Όλα τα καταστήματα - YouBeHero';

      if (category) {
        return `${category} - ${queryTitle}`;
      }

      return queryTitle;

    },

    createURL({ qsModule, routeState, location }) {
      const urlParts = location.href.match(/^(.*?)\/gr\/category/);
      const baseUrl = `${urlParts ? urlParts[1] : ''}/`;
      const categoryPath = routeState.category
        ? routeState.category
            .map((category) => getCategorySlug(category))
            .join('/') + '/'
        : '';
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
      const allBrands = Array.isArray(brands)
        ? brands
        : [brands].filter(Boolean);

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
      const indexUiState = uiState['linkwise_shops'] || {};
      return {
        query: indexUiState.query,
        page: indexUiState.page,
        brands:
          indexUiState.refinementList && indexUiState.refinementList.brand,
        category:
          indexUiState.hierarchicalMenu &&
          indexUiState.hierarchicalMenu['categories.lvl0'],
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
  indexName: 'linkwise_shops',
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


var width = $(window).width();
var height = $(document).height();
var myLocation = location.href.split('/');

$(document).ready(function() {
  filtersCheck();
  $('.ais-SearchBox-input').focus();

  if (myLocation.length <= 5) {
    $('.ais-ClearRefinements-button').click()
  }

});

$(window).resize(function() {
    filtersCheck();
});

function filtersCheck() {
  if ($(window).width() < 992) {
    $('.left-panel').appendTo('#causeFiltersModal .modal-body')
    $('.gangsta').prependTo('.searchContainerMobile .container').addClass('col px-0 mt-3')
  } else {
    $('.left-panel').appendTo('.returnToBase')
    $('.gangsta').prependTo('.inHere').removeClass('col px-0 mt-3')
  }
}

var pctScrolled;

function amountscrolled(){
    var winheight = $(window).height()
    var docheight = $(document).height()
    var scrollTop = $(window).scrollTop()
    var trackLength = docheight - winheight
    pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
}
 
$(window).on("scroll", function(){
    amountscrolled();
    if (pctScrolled > 50) {
      //$('.ais-InfiniteHits-loadMore').click();
    }
})

function printCategories(pinakas) {
  var kenoString = '';

  for (var i = 0; i < pinakas.length; i++) {
      var category = pinakas[i] == null ? '' : pinakas[i];
      kenoString += '<span class="badge badge-pill badge-secondary mr-1">'+ category +'</span>'
   } 

   return kenoString;
}

function printArea(pinakas) {
  var kenoString = '';
  var area = pinakas == null ? '' : '<span class="smaller-3 text-truncate pt-1 float-right text-secondary"><i class="fas fa-map-marker-alt mr-1"></i>' + pinakas + '</span>';
  kenoString += area 
  
  return kenoString;

}

function printNumberOfVisits(pinakas) {
  var kenoString = '';
  var NumberOfVisits = pinakas == 0 ? '<p class="smaller-2 mb-0">Γίνε ο πρώτος/η που θα επισκεφθεί το κατάστημα.</p>' : '<p class="smaller-2 text-truncate mb-0">' + pinakas + ' επισκέψεις</p>';
  kenoString += NumberOfVisits 
  
  return kenoString;

}

function printTotalDonation(pinakas) {
  var kenoString = '';
  var TotalDonation = pinakas == 0 ? '' : '<p class="smaller-2 text-truncate mb-0">' + pinakas + '€ σε δωρεές</p>';
  kenoString += TotalDonation 
  
  return kenoString;

}

function printNumberOfShoppers(pinakas) {
  var kenoString = '';
  var NumberOfShoppers = pinakas == 0 ? '' : '<p class="smaller-2 text-truncate mb-0">' + pinakas + ' αγορές</p>';
  kenoString += NumberOfShoppers 
  
  return kenoString;

}

function getHostName(originalUrl, url) {
    var match = originalUrl.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return '<p class="smaller-2 text-truncate mb-0"><a href="'+url+'" title="Επίσκεψη στην σελίδα του καταστήματος">' + match[2] + '</a></p>';
    }
    else {
        return null;
    }
}

// Create the render function for the pagination
const renderPagination = (renderOptions, isFirstRender) => {
  const {
    pages,
    currentRefinement,
    nbPages,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = renderOptions;

  const container = document.querySelector('.pagination');

  container.innerHTML = `
    <ul class="pagination">
      ${
        !isFirstPage
          ? `
            <li class="page-item">
              <a class="page-link"
                href="${createURL(currentRefinement - 1)}"
                data-value="${currentRefinement - 1}"
              >
                Προηγούμενη
              </a>
            </li>
            `
          : ''
      }
      ${pages
        .map(
          page => `
            <li class="page-item ${currentRefinement === page ? 'active' : ''}">
              <a class="page-link YO"
                href="${createURL(page)}"
                data-value="${page}"
              >
                ${page + 1}
              </a>
            </li>
          `
        )
        .join('')}
        ${
          !isLastPage
            ? `
              <li class="page-item">
                <a class="page-link"
                  href="${createURL(currentRefinement + 1)}"
                  data-value="${currentRefinement + 1}"
                >
                  Επόμενη
                </a>
              </li>
              `
            : ''
        }
    </ul>
  `;

  [...container.querySelectorAll('a')].forEach(element => {
    element.addEventListener('click', event => {
      GoToTop();
      event.preventDefault();
      refine(event.currentTarget.dataset.value);
    });
  });
};


function GoToTop(){
  var elmnt = document.getElementById("searchbox");
  elmnt.scrollIntoView(); 
}

// Create the custom widget
const customPagination = instantsearch.connectors.connectPagination(
  renderPagination
);

// Instantiate the custom widget
search.addWidgets([
  customPagination({
    scrollTo: document.querySelector('#here'),
    padding: 1,
  })
]);

// Create the render function for breadcrumb
const renderBreadcrumbItem = ({ item, createURL }) => `
  <li class="breadcrumb-item">
   <small>
    ${
      item.value
        ? `<a
            href="${createURL(item.value)}"
            data-value="${item.value}"
          >
            ${item.label}
          </a>`
        : `<span>${item.label}</span>`
    }
    </small>
  </li>`;

const renderBreadcrumb = (renderOptions, isFirstRender) => {
  const { items, refine, createURL, widgetParams } = renderOptions;

  widgetParams.container.innerHTML = `      
      <li class="breadcrumb-item">
        <small>
          <a href="#" data-value="">Όλα τα καταστήματα</a>
        </small>
      </li>
      ${items
        .map(item =>
          renderBreadcrumbItem({
            item,
            createURL,
          })
        )
        .join('')}
    </ul>
  `;

  [...widgetParams.container.querySelectorAll('a')].forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      refine(event.currentTarget.dataset.value);
    });
  });
};

// Create the custom widget
const customBreadcrumb = instantsearch.connectors.connectBreadcrumb(
  renderBreadcrumb
);

// Instantiate the custom widget
search.addWidgets([
  customBreadcrumb({
    container: document.querySelector('#algoliaBreadcrumb'),
    attributes: [
      'categories.lvl0',
      'categories.lvl1'
    ]
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '.typeahead__container',
    placeholder: 'Αναζήτηση καταστημάτων',
    showSubmit: false,
    cssClasses: {
    root: 'gangsta'
    }
  }),
  instantsearch.widgets.hits({
    container: document.querySelector('#hits'),
    cssClasses: {
      list: 'card-deck',
      item: 'card shadow-sm mb-4 minWidth20rem',
    },
    templates: {
      empty: '<div class="col"><p class="mb-5 pb-5">Δεν βρέθηκαν αποτελέσματα. <a href="javascript:void(0);" data-toggle="modal" data-target="#ask4Eshop" title="Πάτησε εδώ για να επικοινωνήσεις μαζί μας και να προτείνεις το κατάστημα που θέλεις.">Πρότεινε ένα e-shop</a>.</p></div>',
      item(hit) {
        return `
            
              <div class="card-img-top img-fluid charity-logo-causes" style="
                background-image: linear-gradient(to bottom, rgba(215, 215, 215, 0.9) 0%, rgba(255, 255, 255, 0.33) 95%), url('');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;">

                    <div class="col-12 px-0">

                        <div class="row-fluid">
                          <div class="container">
                            
                            <div class="row position-absolute px-2 w-100" style="top: 24px; left: 24px;">
                             
                              <div class="col-4 bg-white border text-center" style="height: 120px; max-width: 120px;">
                                <div class="d-flex align-content-center flex-wrap h-100 justify-content-center">
                                <a href="${hit.url}" title='${hit.name}' target="_blank">
                                  <img src="${hit.logo}" class="mx-auto img-fluid" style="max-height: 50px; height: 100%;">
                                </a>
                                </div>
                              </div>
                              
                              <div class="col-8">

                                  `+getHostName(hit.original_url, hit.url)+`

                                  `+printNumberOfVisits(hit.number_of_visits)+`

                                  `+printNumberOfShoppers(hit.number_of_shoppers)+`

                                  `+printTotalDonation(hit.total_donation)+`                                  

                                  <p class="mb-0">
                                    <span title="Ποσοστό δωρεάς" class="smaller-2 text-truncate"><i class="fas fa-shopping-bag mr-1"></i>${hit.reward} δωρεά
                                    </span>
                                  </p>
                              
                              </div>
                            </div>
                           
                          </div>

                        </div>

                    </div>
                </div>

                <div class="card-body our_description">

                  <h2 class="bigger-1"><strong>${instantsearch.highlight({ attribute: 'name', hit })}</strong> `+printArea(hit.area)+` </h2>
                  <p class="card-text smaller-1">${instantsearch.highlight({ attribute: 'our_description', hit })}</p>

                </div>
                
                <div class="card-footer py-0 bg-white border-0">
                <p style="z-index: 777;position: relative; background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 45%);background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 45%); background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgb(255, 255, 255) 45%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#001e5799\', endColorstr=\'#ffffff\',GradientType=0 );" class="readMoreContainer mt-n5 pt-5 mb-1""></p>
                    <p class="text-truncate">
                      <a href="${hit.url}" class="btn btn-success mr-2 px-3 font-weight-bold ctaShadow" title="Επίσκεψη στην σελίδα του καταστήματος">Επίσκεψη</a>
                      <a href="${hit.local_url}" target="_blank" class="btn-link smaller-1" title="Ανοίγει νέα σελίδα με πληροφορίες για το κατάστημα">Προβολή σελίδας</a>
                    </p>                   
                </div>
        `;
      }
    }
  })
]);

/*<p class="mb-0"> `+printCategories(hit.parentcategory)+printCategories(hit.subcategory)+`</p>*/

// Create the render function
const createDataAttribtues = refinement =>
  Object.keys(refinement)
    .map(key => `data-${key}="${refinement[key]}"`)
    .join(' ');

const renderListItem = item => `
  ${item.refinements
    .map(
      refinement =>
        `<div class="ais-ClearRefinements">
          <button class="ais-ClearRefinements-button" ${createDataAttribtues(refinement)} style="border: 0;">
            <a href="javascript:void(0);" class="badge badge-primary">${refinement.label} (${refinement.count})<i class="fas fa-times ml-2"></i>
            </a>
          </button>
        </div>`
    )
    .join('')}
`;

const renderCurrentRefinements = (renderOptions, isFirstRender) => {
  const { items, refine, widgetParams } = renderOptions;

  widgetParams.container.innerHTML = `
    ${items.map(renderListItem).join('')}
  `;

  [...widgetParams.container.querySelectorAll('button')].forEach(element => {
    element.addEventListener('click', event => {
      const item = Object.keys(event.currentTarget.dataset).reduce(
        (acc, key) => ({
          ...acc,
          [key]: event.currentTarget.dataset[key],
        }),
        {}
      );

      refine(item);
    });
  });
};

// Create the custom widget
const customCurrentRefinements = instantsearch.connectors.connectCurrentRefinements(
  renderCurrentRefinements
);

// Instantiate the custom widget
search.addWidgets([
  customCurrentRefinements({
    container: document.querySelector('#current-refinements')
  })
]);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    includedAttributes: ["query","categories.lvl0"],
    templates: {
      resetLabel: '<a href="javascript:void(0);" class="badge badge-primary">Καθαρισμός αναζήτησης<i class="fas fa-times ml-2"></i></a>'
    }
  })
);
  
search.addWidget(
  instantsearch.widgets.stats({
   container: '#stats',
   cssClasses: {
    text: 'text-secondary smaller-2',
    },
    templates: {
      text: `
        <p class="mb-0">
          {{#hasNoResults}}{{/hasNoResults}}
          {{#hasOneResult}}1 αποτέλεσμα για την αναζήτηση «{{query}}» βρέθηκαν σε {{processingTimeMS}}ms. <span class="float-right">
            <a href="https://www.algolia.com" target="_blank" title="Search powered by Algolia."><i class="fab fa-algolia mr-1"></i></a>
          </span>{{/hasOneResult}}
          {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} αποτελέσματα βρέθηκαν σε {{processingTimeMS}}ms. <span class="float-right">
            <a href="https://www.algolia.com" target="_blank" title="Search powered by Algolia."><i class="fab fa-algolia mr-1"></i></a>
          </span> {{/hasManyResults}}
        </p>
      `,
    },
  })
);



search.start();



// loading section
 $(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});

