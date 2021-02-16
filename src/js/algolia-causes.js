/* global instantsearch algoliasearch */

var width = $(window).width();
var height = $(document).height();
var url = window.location.href;

$(document).ready(function() {

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

const encodedKathgories = {
  filanthropikoi: 'Για τον άνθρωπο',
  perivallontiki: 'Για το περιβάλλον',
  filozoiki: 'Για τους καλούς μας φίλους'
}

const encodedYpokathgories = {
  agria_fisi: 'Άγρια φύση',
  atoma_me_anapiria: 'Άτομα με Αναπηρία',
  adespota: 'Αδέσποτα',
  anakiklosi: 'Ανακύκλωση',
  anthropistiki_voithia: 'Ανθρωπιστική βοήθεια',
  astegia: 'Αστεγία',
  perivallontiki: 'Για το περιβάλλον',
  filanthropikoi: 'Για τον άνθρωπο',
  filozoiki: 'Για τους καλούς μας φίλους',
  ekpaideusi: 'Εκπαίδευση',
  koinonia: 'Κοινωνία',
  koinonikh_allhleggii: 'Κοινωνική Αλληλεγγύη',
  koinoonikh_epanedaksi: 'Κοινωνική Επανένταξη',
  paidia_neoi: 'Παιδιά και νέοι',
  perivallon: 'Περιβάλλον',
  texnes: 'Τέχνες',
  trith_ilikia: 'Τρίτη ηλικία',
  ygeia: 'Υγεία',
  zoa: 'Ζώα',
  ygeia_pronia: 'Υγεία & Πρόνοια'
}

const encodedTopothesies = {
  athina: 'Αθήνα',
  elliniko: 'Ελληνικό',
  metaxourgio : 'Μεταξουργείο',
  votanikos : 'Votanikos',
  agios_ioannhs_renti: 'Άγιος Ιωάννης Ρέντη',
  ano_patisia: 'Άνω Πατήσια',
  galatas: 'Γαλατάς',
  dafni: 'Δάφνη',
  drama: 'Δράμα',
  thessaloniki_athina: 'Θεσσαλονίκη & Αθήνα',
  kato_patisia: 'Κάτω Πατήσια',
  kallithea: 'Καλλιθέα',
  katerini: 'Κατερίνη',
  kifisia: 'Κηφισιά',
  larisa: 'Λάρισα',
  mosxato: 'ΜΟΣΧΑΤΟ',
  nea_makri: 'ΝΕΑ ΜΑΚΡΗ',
  nikaia: 'Νίκαια',
  pagkrati: 'Παγκράτι',
  abelokipi: 'Αμπελόκηποι',
  grevena: 'ΓΡΕΒΕΝΑ',
  irakleio: 'ΗΡΑΚΛΕΙΟ',
  irakleio_kritis: 'Ηράκλειο, Κρήτης',
  limani_fix: 'Λιμανι, ΦΙΞ',
  argos: 'Άργος',
  aleksandria: 'Αλεξάνδρεια',
  alifanta: 'Αλυφαντά',
  peristeri: 'Περιστέρι'
}

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
    windowTitle({ kathgoria, query }) {
      const queryTitle = query ? `Αποτελέσματα για "${query}" - YouBeHero` : 'Όλες οι οργανώσεις';

      if (kathgoria) {
        return `${kathgoria} - ${queryTitle}`;
      }

      return queryTitle;

    },

    createURL({ qsModule, routeState, location }) {
      const urlParts = location.href.match(/^(.*?)\/causes.html/);
      const baseUrl = `${urlParts ? urlParts[1] : ''}/`;
      //console.log(baseUrl)
      
      const categoryPath = routeState.category
      ? routeState.kathgoria
            .map((kathgoria) => getCategorySlug(kathgoria))
            .join('/') + '/'
        : '';

      let queryParameters = {};

      if (routeState.query) {
        queryParameters.query = encodeURIComponent(routeState.query);
      }
      if (routeState.page !== 1) {
        queryParameters.page = routeState.page;
      }

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
            kathgoriesurl = kathgoriesrest.join("&");
            kathgoriesurl = "&"+ kathgoriesurl;  
          } else {
            kathgoriesurl = "&"+ kathgoriesrest[0];
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
            ypokathgoriesurl = ypokathgoriesrest.join("&");
            ypokathgoriesurl = "&"+ ypokathgoriesurl;  
          } else {
            ypokathgoriesurl = "&"+ ypokathgoriesrest[0];
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
            topothesiaurl = topothesiarest.join("&");
            topothesiaurl = "&"+ topothesiaurl;  
          } else {
            topothesiaurl = "&"+ topothesiarest[0];
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
      
      if (kathgoriastring=="" && ypokathgoriastring=="" && topothesiastring==""){
          
          queryString = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: 'repeat'
        });
      }else {
        queryString =  kathgoriastring + ypokathgoriastring + topothesiastring
      }
      
      return `${baseUrl}causes.html${queryString}`;
    },

    parseURL({ qsModule, location }) {

      const { query = '', kathgoria = [], ypokathgoria=[], topothesia= [] } = qsModule.parse(
        location.search.slice(1)
      );
      
      neakathgoria=[]

      if (!Array.isArray(kathgoria)){
        if (kathgoria.includes('&')){
          allkathgoria = kathgoria.split('&')
          allkathgoria.forEach(allkathgoria =>
          neakathgoria.push([allkathgoria].filter(Boolean).map((allkathgoria)=> getKathgoriaName(allkathgoria))))
        }else {
          kathgoria_array = [kathgoria].filter(Boolean);
          neakathgoria = kathgoria_array.map((kathgoria_array)=> getKathgoriaName(kathgoria_array))
        }
      }

      //ypokathgoria_array = [kathgoria].filter(Boolean);
      neaypokathgoria = []

      if (!Array.isArray(ypokathgoria)){
        if (ypokathgoria.includes('&')){
          allypokathgoria = ypokathgoria.split('&')
          allypokathgoria.forEach(allypokathgoria =>
          neaypokathgoria.push( [allypokathgoria].filter(Boolean).map((allypokathgoria)=> getYpokathgoriaName(allypokathgoria))))
        }else {
          ypokathgoria_array = [ypokathgoria].filter(Boolean);
          neaypokathgoria = ypokathgoria_array.map((ypokathgoria_array)=> getYpokathgoriaName(ypokathgoria_array))
        }
      }

    
      neatopothesia = []

      if (!Array.isArray(topothesia)){
        if (topothesia.includes('&')){
          alltopothesia = topothesia.split('&')
          alltopothesia.forEach(alltopothesia => 
          neatopothesia.push( [alltopothesia].filter(Boolean).map((alltopothesia)=> getTopothesiaName(alltopothesia))))
        }else {
          topothesia_array = [topothesia].filter(Boolean);
          neatopothesia = topothesia_array.map((topothesia_array)=> getTopothesiaName(topothesia_array))
        }
      }

      console.log('neakathgoria', neakathgoria);
      console.log('neaypokathgoria', neaypokathgoria);
      console.log('neatopothesia', neatopothesia);
      //console.log('query', query);
        
      return {
        query: decodeURIComponent(query),
        kathgoria : neakathgoria.map(decodeURIComponent),
        ypokathgoria : neaypokathgoria.map(decodeURIComponent),
        topothesia: neatopothesia.map(decodeURIComponent)
      };
        
    }
  }),

  stateMapping: {
    stateToRoute(uiState) {
      console.log('etreksa1');
      const indexUiState = uiState[indexName] || {};        
      return {
        query: indexUiState.query,
        page: indexUiState.page,
        kathgoria: indexUiState.refinementList 
        && indexUiState.refinementList['category_parent'],
        ypokathgoria: indexUiState.refinementList 
        && indexUiState.refinementList['category'],
        topothesia: indexUiState.refinementList 
        && indexUiState.refinementList['location']
      };
    },

    routeToState(routeState) {
      console.log('etreksa', routeState)
      return {
        indexName: {
          query: routeState.query,
          page: routeState.page,
          refinementList: {
            'category_parent': routeState.kathgoria
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


let indexName = 'causes-registration'
const search = instantsearch({
  indexName: indexName,
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

search.start();