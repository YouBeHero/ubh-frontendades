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


const search = instantsearch({
  indexName: 'causes-registration',
  searchClient,
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
                      <a href="/gr/select_cause/${hit.id}" class="btn btn-primary smaller-1">Επιλογή οργάνωσης</a>
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
<<<<<<< HEAD



// loading section

$(() => {

	const box = $('.box'),
        ph = $('.box-placeholder');
        
  let toggleEffect = () => {
  	box.hide();
    ph.show();
    
    setTimeout(() => {
	    ph.hide();
      box.show();
    }, 2e3);
  };

	toggleEffect();
  
	// setInterval(toggleEffect, 4e3);

});

// loading section
$(() => {
	const box = $('.box1'),
        ph = $('.box-placeholder1');
        
  let toggleEffect = () => {
  	box.hide();
    ph.show();
    
    setTimeout(() => {
	    ph.hide();
      box.show();
    }, 2e3);
  };

	toggleEffect();
  
	// setInterval(toggleEffect, 4e3);

});
=======
>>>>>>> murtaza
