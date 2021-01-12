/* global instantsearch algoliasearch */

var width = $(window).width();
var height = $(document).height();
var url = window.location.href;

$(document).ready(function() {

  /* setTimeout(function() {
    $('#charityPreviewModal').modal('show');
  }, 1000);*/

  filtersCheck();

});


$(window).resize(function() {
    filtersCheck();
});

function filtersCheck() {
  if ($(window).width() < 992) {
    $('.left-panel').appendTo('#causeFiltersModal .modal-body')
  } else {
    $('.left-panel').appendTo('.returnToBase')
  }
}

var pctScrolled;

function amountscrolled(){
    var winheight = $(window).height()
    var docheight = $(document).height()
    var scrollTop = $(window).scrollTop()
    var trackLength = docheight - winheight
    pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
    //console.log(pctScrolled + '% scrolled')
}
 
$(window).on("scroll", function(){
    amountscrolled();
    if (pctScrolled > 50) {
      $('.ais-InfiniteHits-loadMore').click();
    }
})


//Read more button trigger
$(document).on('click', '.readMore', function() {
    $('#charityPreviewModal .description_container').css('max-height', '100%').css('overlow', 'visible');
    $('.readMoreContainer').remove();
});
//End of read more trigger 

$('#charityPreviewModal').on('hidden.bs.modal', function (e) {

  setTimeout(function() {
    $('#quickViewCauseModalBody').html('');
    $('#quickViewModalLoading').css('display','flex');
  }, 100);
  
  $('#charityPreviewModal .description_container').css('max-height', '540px').css('overlow', 'hidden');
  
  if (!$('.readMoreContainer').length) {

    $('#charityPreviewModal .charity-description').append('<p style="z-index: 777;position: relative; background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 45%);background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 45%); background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgb(255, 255, 255) 45%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#001e5799\', endColorstr=\'#ffffff\',GradientType=0 );" class="readMoreContainer mt-n5 pt-5 pb-3"><a href="javascript:void(0);" title="Πάτησε εδώ για να διαβάσεις την πλήρη περιγραφή της οργάνωσης" class="readMore">+ Περισσότερα...</a></p>');
  }
})

const searchClient = algoliasearch(
  'Y9NV6194MT',
  'd3191a6f8232cbedb18b93ba922b71af'
);

const encodedCategories = {
  anthrwpo: 'Για τον άνθρωπο'
}

const encodedKathgories = {
  anthrwpos: 'Για τον άνθρωπο',
  perivallon: 'Για το περιβάλλον',
  zwa: 'Για τους καλούς μας φίλους'
}

const encodedYpokathgories = {
  agriafush: 'Άγρια φύση',
  atoma_me_anapiria: 'Άτομα με Αναπηρία',
  adespota: 'Αδέσποτα',
  anakuklwsh: 'Ανακύκλωση',
  anthrwpistikh_voitheia: 'Ανθρωπιστική βοήθεια',
  astegia: 'Αστεγία',
  giaperivallon: 'Για το περιβάλλον',
  anthrwpos: 'Για τον άνθρωπο',
  zwa: 'Για τους καλούς μας φίλους',
  ekpaideusi: 'Εκπαίδευση',
  koinwnia: 'Κοινωνία',
  koinwnikh_allhlegguh: 'Κοινωνική Αλληλεγγύη',
  koinwnikh_epanedaxh: 'Κοινωνική Επανένταξη',
  paidia_neoi: 'Παιδιά και νέοι',
  perivallon: 'Περιβάλλον',
  texnes: 'Τέχνες',
  trith_hlikia: 'Τρίτη ηλικία',
  ygeia: 'Υγεία',
  ygeia_proneia: 'Υγεία & Πρόνοια'

}

const encodedTopothesies = {
  athina: 'Αθήνα',
  ellhniko: 'Ελληνικό',
  metaxourgeio : 'Μεταξουργείο',
  votanikos : 'Votanikos',
  agios_iwannhs_renth: 'Άγιος Ιωάννης Ρέντη',
  anw_pathsia: 'Άνω Πατήσια',
  anw_pathsia_athina: 'Άνω Πατήσια, Αθήνα',
  galatas: 'Γαλατάς',
  dafni: 'Δάφνη',
  drama: 'Δράμα',
  thessaloniki_athina: 'Θεσσαλονίκη & Αθήνα',
  katw_patisia: 'Κάτω Πατήσια',
  kallithea: 'Καλλιθέα',
  katerinh: 'Κατερίνη',
  kifisia: 'Κηφισιά',
  larisa: 'Λάρισα',
  mosxato: 'ΜΟΣΧΑΤΟ',
  neamakri: 'ΝΕΑ ΜΑΚΡΗ',
  nikaia: 'Νίκαια',
  pagkrati: 'Παγκράτι'
}

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
  const newKey = encodedCategories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

const decodedKathgories = Object.keys(encodedKathgories).reduce((acc, key) => {
  const newKey = encodedKathgories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

const decodedYpokathgories = Object.keys(encodedYpokathgories).reduce((acc, key) => {
  const newKey = encodedYpokathgories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

const decodedTopothesies = Object.keys(encodedTopothesies).reduce((acc, key) => {
  const newKey = encodedTopothesies[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});



function getKathgoriaSlug(name) {
  const encodedName = decodedKathgories[name] || name;

  return encodedName
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

function getKathgoriaName(slug) {
  const decodedSlug = encodedKathgories[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

function getYpokathgoriaSlug(name) {
  const encodedName = decodedYpokathgories[name] || name;

  return encodedName
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

function getYpokathgoriaName(slug) {
  const decodedSlug = encodedYpokathgories[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

function getTopothesiaSlug(name) {
  const encodedName = decodedTopothesies[name] || name;

  return encodedName
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

function getTopothesiaName(slug) {
  const decodedSlug = encodedTopothesies[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}


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
  const decodedSlug = encodedTopothesies[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}


const routing = {
  router: instantsearch.routers.history({
    windowTitle({ category, query }) {
      const queryTitle = query ? `Αποτελέσματα για "${query}" - YouBeHero` : 'Όλες οι οργανώσεις - YouBeHero';

      if (category) {
        return `${category} - ${queryTitle}`;
      }

      return queryTitle;

    },

    createURL({ qsModule, routeState, location }) {
      // const urlParts = location.href.match(/^(.*?)\/gr\/cause-category\/filanthropikoi/);
      const urlParts = location.href.match(/^(.*?)\/causes.html/);
      const baseUrl = `${urlParts ? urlParts[1] : ''}/`;
      
      const categoryPath = routeState.category
      ? routeState.category
            .map((category) => getCategorySlug(category))
            .join('/') + '/'
        : '';

      // const queryParameters = {};
      let queryParameters = {};

      if (routeState.query) {
        queryParameters.query = encodeURIComponent(routeState.query);
      }
      if (routeState.page !== 1) {
        queryParameters.page = routeState.page;
      }

      // if (routeState.kathgoria) {
      //   queryParameters.kathgoria = routeState.kathgoria.map(encodeURIComponent);
      // }

            // if (routeState.topothesia) {
      //   queryParameters.topothesia = routeState.topothesia.map(encodeURIComponent);
      // }

      // if (routeState.ypokathgoria) {
      //   queryParameters.ypokathgoria = routeState.ypokathgoria.map(encodeURIComponent);
      // }
      let queryString = '';
      let kathgoriesrest = []; 
      let kathgoriesurl = '';
      let kathgoriastring='';

      if (routeState.kathgoria) {
        queryParameters.kathgoria = routeState.kathgoria ? routeState.kathgoria.map((kathgoria)=> getKathgoriaSlug(kathgoria)): '';
        
        let kathgorialen= queryParameters.kathgoria.length;
        if (kathgorialen>1){
          for (i=0; i<kathgorialen-1; i++) {
            kathgoriesrest.push( queryParameters.kathgoria.pop());
          }
          kathgoriesrest.reverse();
          if (kathgoriesrest.length >1){
            kathgoriesurl = kathgoriesrest.join("-");
            kathgoriesurl = "-"+ kathgoriesurl;  
          } else {
            kathgoriesurl = "-"+ kathgoriesrest[0];
          }
          
        }
        kathgoriastring = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: 'repeat'
        });
        if (kathgoriesurl){
          kathgoriastring = kathgoriastring + kathgoriesurl;
        }
        queryParameters.kathgoria.pop()
      }
      
      let ypokathgoriesrest = []; 
      let ypokathgoriesurl = '';
      let ypokathgoriastring='';

      if (routeState.ypokathgoria) {
        queryParameters.ypokathgoria = routeState.ypokathgoria ? routeState.ypokathgoria.map((ypokathgoria)=> getYpokathgoriaSlug(ypokathgoria)): '';

        let ypokathgorialen= queryParameters.ypokathgoria.length;
        if (ypokathgorialen>1){
          for (i=0; i<ypokathgorialen-1; i++) {
            ypokathgoriesrest.push( queryParameters.ypokathgoria.pop());
          }
          ypokathgoriesrest.reverse();
          if (ypokathgoriesrest.length >1){
            ypokathgoriesurl = ypokathgoriesrest.join("-");
            ypokathgoriesurl = "-"+ ypokathgoriesurl;  
          } else {
            ypokathgoriesurl = "-"+ ypokathgoriesrest[0];
          }
          
        }
        ypokathgoriastring = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: 'repeat'
        });
        if (ypokathgoriesurl){
          ypokathgoriastring = ypokathgoriastring + ypokathgoriesurl;
        }
        queryParameters.ypokathgoria.pop()
      }

      let topothesiarest = []; 
      let topothesiaurl = '';
      let topothesiastring='';
      
      if (routeState.topothesia) {
        queryParameters.topothesia = routeState.topothesia ? routeState.topothesia.map((topothesia)=> getTopothesiaSlug(topothesia)): '';

        let topothesialen= queryParameters.topothesia.length;
        if (topothesialen>1){
          for (i=0; i<topothesialen-1; i++) {
            topothesiarest.push( queryParameters.topothesia.pop());
          }
          topothesiarest.reverse();
          if (topothesiarest.length >1){
            topothesiaurl = topothesiarest.join("-");
            topothesiaurl = "-"+ topothesiaurl;  
          } else {
            topothesiaurl = "-"+ topothesiarest[0];
          }
          
        }
        topothesiastring = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: 'repeat'
        });
        if (topothesiaurl){
          topothesiastring = topothesiastring + topothesiaurl;
        }
        queryParameters.topothesia.pop()
      }

      queryString=  kathgoriastring + ypokathgoriastring + topothesiastring
      // const queryString = qsModule.stringify(queryParameters, {
      //   addQueryPrefix: true,
      //   arrayFormat: 'repeat'
      // });

      // return `${baseUrl}gr/cause-category/filanthropikoi/${categoryPath}${queryString}`;
      return `${baseUrl}causes.html${categoryPath}${queryString}`;
    },

    parseURL({ qsModule, location }) {
      // const pathnameMatches = location.href.match(/^(.*?)\/gr\/cause-category\/filanthropikoi/);
      const pathnameMatches = location.href.match(/^(.*?)\/causes.html\/(.*?)\/?$/);
      const category = ((pathnameMatches && pathnameMatches[1]) || '')
        .split('/')
        .map((path) => getCategoryName(path));

      const { query = '', page  } = qsModule.parse(
        location.search.slice(1)
      );

      
      const kathgoria = ((pathnameMatches && pathnameMatches[1]) || '')
      .split('/')
      .map((path) => getKathgoriaName(path));

      const ypokathgoria = ((pathnameMatches && pathnameMatches[1]) || '')
      .split('/')
      .map((path) => getYpokathgoriaName(path));

      const topothesia = ((pathnameMatches && pathnameMatches[1]) || '')
      .split('/')
      .map((path) => getTopothesiaName(path));

      // const { query = '', page , kathgoria=[] ,  ypokathgoria = [], topothesia = [] } = qsModule.parse(
      //   location.search.slice(1)
      // );
      // `qs` does not return an array when there's a single value.
      // const allkathgoria = Array.isArray(kathgoria)
      // ? kathgoria
      // : [kathgoria].filter(Boolean);

      // const allypokathgoria = Array.isArray(ypokathgoria)
      // ? ypokathgoria
      // : [ypokathgoria].filter(Boolean);

      // const alltopothesia = Array.isArray(topothesia)
      //   ? topothesia
      //   : [topothesia].filter(Boolean);

        
      return {
        query: decodeURIComponent(query),
        page,
        // kathgoria : allkathgoria.map(decodeURIComponent),
        // ypokathgoria : allypokathgoria.map(decodeURIComponent),
        // topothesia: alltopothesia.map(decodeURIComponent),
        kathgoria,
        ypokathgoria,
        topothesia,
        category,
      };
    },
  }),

  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState['causes-registration'] || {};

      return {
        query: indexUiState.query,
        page: indexUiState.page,
        kathgoria: indexUiState.refinementList 
        && indexUiState.refinementList['category_parent'],
        ypokathgoria: indexUiState.refinementList 
        && indexUiState.refinementList['category'],
        topothesia: indexUiState.refinementList 
        && indexUiState.refinementList['location'],
        category: indexUiState.menu && indexUiState.menu.categories
      };
    },

    routeToState(routeState) {
      return {
        causes_registration: {
          query: routeState.query,
          page: routeState.page,
          menu: {
            categories: routeState.category
          },
          refinementList: {
            'category_parent': routeState.ykathgoria
          },
          refinementList: {
            'category': routeState.ypokathgoria
          },
          refinementList: {
            'location': routeState.topothesia
          },
        },
      };
    },
  },
};

const search = instantsearch({
  indexName: 'causes-registration',
  searchClient,
  routing
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Αναζήτηση οργανώσεων'
  })
]);
  

function printAvatars(pinakas) {
  var kenoString = '';

  for (var i = 0; i < pinakas.length; i++) {
      var imgURL = pinakas[i] == null ? 'uploads/avatars/default-avatar.jpg' : pinakas[i];
      kenoString += '<img src="https://youbehero.com/'+ imgURL +'" alt="logo" class="float-left bg-white shadow-sm d-inline-block border border-white ml-n2" style="border-radius: 100px; width: 30px; height: 30px;"/>'
   } 

   return kenoString;
}

search.addWidgets([
  instantsearch.widgets.infiniteHits({
    container: document.querySelector('#hits'),
    cssClasses: {
      list: 'card-deck',
      item: 'card shadow-sm mb-4 causeCardMinMaxWidth',
      loadMore: 'btn btn-outline-primary ml-3'
    },
    templates: {
      empty: '<div class="col-12">Δεν βρέθηκαν αποτελέσματα για την αναζήτηση <strong>{{ query }}</strong></div>',
      showMoreText: 'Περισσότερα αποτελέσματα',
      item(hit) {
        return `
            
              <div class="card-img-top img-fluid charity-logo-causes" style="
                background-image: linear-gradient(to bottom, rgba(0, 0, 0, .9) 0%, rgba(0, 0, 0, .33) 95%), url('${hit.head_image}');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;">

                    <div class="col-12 px-0">
                        <div class="progress rounded-0" style="height: 1rem;">
                            <div class="bg-success py-2" role="progressbar" style="width: ${hit.percentage_completed}%;" aria-valuenow="${hit.percentage_completed}" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>

                        <div class="row-fluid mt-3">
                          <div class="container">
                            
                            <div class="row position-absolute px-2 w-100" style="top: 40px; left: 30px;">
                             
                              <div class="col-3 bg-white text-center" style="height: 100px; max-width: 100px;">
                                <div class="d-flex align-content-center flex-wrap h-100 justify-content-center">
                                <a href="${hit.url}" title='${hit.name}' target="_blank">
                                  <img src="${hit.logo}" class="mx-auto img-fluid" style="max-height: 60px; max-width: 90px">
                                </a>
                                </div>
                              </div>
                              
                              <div class="col-8">
                                
                                  <span class="bg-white rounded py-1 mb-1 px-2 smaller-2 text-primary text-truncate"><i class="far fa-clock mr-1"></i>${hit.percentage_completed}% Ολοκληρωμένος
                                  </span>

                                  <p class="smaller-2 text-white text-truncate pt-2 mb-0">${hit.raised_overall}€ συνολικές δωρεές</p>

                                  <div class="smaller-2 text-white d-flex pl-2 align-items-center" style="height: 50px">
                                    `+printAvatars(hit.supporter_avatars)+`
                                    <span class="text-truncate ml-1">${hit.supporters} υποστηρικτές</span>
                                  </div>                   
                              
                              </div>
                              </div>
                           
                          </div>

                        </div>

                    </div>
                </div>


                <div class="card-body">
                    <h2 class="font-weight-bold bigger-2">${instantsearch.highlight({ attribute: 'name', hit })}</h2>

                    <p class="card-text">${instantsearch.highlight({ attribute: 'description', hit })}
                    </p>
                </div>

                
                <div class="card-footer bg-white border-0 pt-2">
                    <p class="mb-0 text-truncate mb-2">
                      <a href="signup.html" class="btn btn-primary smaller-1">Επιλογή οργάνωσης</a>
                    </p>
                    <p class="mb-0 text-truncate mb-2">
                      <button onclick="getQuickViewCause(${hit.id})" data-toggle="modal" data-target="#charityPreviewModal" class="btn btn-link smaller-1 p-0">Προεπισκόπηση οργάνωσης</button>
                    </p>
                </div>
            
        `;
      }
    }
  })
]);




search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    includedAttributes: ["query","category_parent","category","location","percentage_completed"],
    templates: {
      resetLabel: 'Καθαρισμός όλων των φίλτρων'
    }
  })
);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements2',
    includedAttributes: ["category_parent"],
    templates: {
      resetLabel: 'Καθαρισμός φίλτρων κατηγορίας'
    }
  })
);
search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements3',
    includedAttributes: ["category"],
    templates: {
      resetLabel: 'Καθαρισμός φίλτρων υποκατηγορίας'
    }
  })
);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements4',
    includedAttributes: ["location"],
    templates: {
      resetLabel: 'Καθαρισμός φίλτρων περιοχής'
    }
  })
);

/*search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements5',
    includedAttributes: ["percentage_completed"],
  })
);*/

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#Category_parent_title',
    attribute: 'category_parent',
  })
);
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#Category_title',
    attribute: 'category',
    showMore: true,
    sortBy: ['name:asc'],
    templates: {
      showMoreText: `
        {{#isShowingMore}}
          - Λιγότερα
        {{/isShowingMore}}
        {{^isShowingMore}}
          + Περισσότερα
        {{/isShowingMore}}
        `,
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#location_title',
    attribute: 'location',
    showMore: true,
    templates: {
      showMoreText: `
        {{#isShowingMore}}
          - Λιγότερα
        {{/isShowingMore}}
        {{^isShowingMore}}
          + Περισσότερα
        {{/isShowingMore}}
        `,
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

const createDataAttribtues = refinement =>
  Object.keys(refinement)
    .map(key => `data-${key}="${refinement[key]}"`)
    .join(' ');

const renderListItem = item => `
  ${item.refinements
    .map(
      refinement =>
        `<div class="ais-ClearRefinements" style="display:inline">
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
    container: '#clear-refinements-new',
    includedAttributes: ["query","category_parent","category","location"],
    templates: {
      resetLabel: '<a href="javascript:void(0);" class="badge badge-primary">Καθαρισμός αναζήτησης<i class="fas fa-times ml-2"></i></a>'
    }
  })
);

// https://www.algolia.com/doc/api-reference/widgets/range-slider/js/#widget-param-cssclasses
/*search.addWidget(
instantsearch.widgets.rangeSlider({
  container: '#range-slider',
  attribute: 'percentage_completed',
})
);*/

search.start();
setTimeout(function() {
  checkCategorySelection();
  $('.ais-SearchBox-input').focus();
}, 1200);

function checkCategorySelection() {
  if(url.indexOf('filanthropikoi') > -1) {
       setTimeout(function() {
         $('#Category_parent_title ul li:first-child input').click();
       }, 100);
  } else if(url.indexOf('filozoiki') > -1) {
      setTimeout(function() {
         $('#Category_parent_title ul li:nth-child(3) input').click();
       }, 100);
  } else if(url.indexOf('perivallontiki') > -1) {
      setTimeout(function() {
        $('#Category_parent_title ul li:nth-child(2) input').click();
      }, 100);
  }  
}
