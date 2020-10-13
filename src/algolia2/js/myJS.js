//global vars
var changesSaved = "";
var width = $(window).width();
var browser = '';
var browserVersion = 0;
var last, diff;

$(document).ready(function() {

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    //start counting the stats
    setTimeout(function() {
        startCountingStats();
    }, 300);
    
    //Apparently
    checkiftooltip();


    //Detect if extension is installed
    var isInstalled = document.documentElement.getAttribute('ubh-extension-installed');

    if (isInstalled) {
        $('.pluginBox').remove();
    } else {
        if (width > 992) {
            if (browser == "Chrome" || browser == "Firefox") {
                if(readCookie("pluginPopupCookieExpires") == null) {
                    if ((localStorage['disabledPluginNotification'] == null)) {
                        setTimeout(function() {
                            $('#downloadPluginDialog').modal('show');
                            $('#disableNotification').prop('checked' , false);
                        }, 300);
                    }
                }
            }
        }
    }

    ///////////////////////////////////////



    //This is for the image lightbox function
    if ($('.galleryContainer').length) {
        $('.galleryContainer').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            closeOnContentClick: false,
            gallery: {
                enabled: true,
                tPrev: 'Προηγούμενη εικόνα (Αριστερό βελάκι στο πληκτρολόγιο)', // title for left button
                tNext: 'Επόμενη εικόνα (Δεξί βελάκι στο πληκτρολόγιο)', // title for right button
                tCounter: '<span class="mfp-counter">%curr% από %total%</span>' // markup of counter
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
    };

    //As implied by its name
    $.cookieBar({
        fixed: true
    });



    if (width > 768) {
        if ($('.visit-button').length) {
            $('.this-fixed-bottom').removeClass('fixed-bottom').remove('.visit-button');
        }
    } else {
        if ($('.this-fixed-bottom').length) {
            $(".this-fixed-bottom").clone().appendTo("body").addClass('fixed-bottom visit-button');
            $(".visit-button button").removeClass('smaller-1').addClass('vertical').addClass('font-weight-bold').addClass('bigger-4');
        }
    }

     //Read more button for eshops
    if (width < 992) {
        if ($('.eshop-page').length) {
            if ($('#plirofories p').length > 6) {
                $('#plirofories').append('<p style="z-index: 777;position: relative; background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 45%);background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 45%); background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgb(255, 255, 255) 45%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#001e5799\', endColorstr=\'#ffffff\',GradientType=0 );" class="readMoreContainer mt-n5 pt-5 pb-3 pl-3"><a href="javascript:void(0);" title="Πάτησε εδώ για να διαβάσεις την πλήρη περιγραφή του καταστήματος" class="readMore">Μάθε περισσότερα...</a></p>');
                }
        }
    }

});
//end of ready


//about us page
if ($('.aboutus-page').length) {
    $(document).on('click', '.card', function() {

      $('#myModal .modal-title').html($(this).closest('.card').find('.cardtitle').html());
      $('#myModal .modal-body').html($(this).closest('.card').find('.body-text').html());
      $("#myModal .modal-footer").html($(this).closest('.card').find('.card-footer').html());

      if ($(".modal-footer").html() == "") {
          $('.modal-footer').hide();
      }
      else{
        $('.modal-footer').show();
    }

    });
}


//plugin popup
$(document).on('click', '.submitPluginCheckbox', function() {

    createCookie('pluginPopupCookieExpires', window.location.href, 1);

    if ($('#disableNotification').prop('checked') == true) {
        localStorage.setItem('disabledPluginNotification', 'true' );
    }
});

$('#downloadPluginDialog').on('hidden.bs.modal', function (e) {
  createCookie('pluginPopupCookieExpires', window.location.href, 1);
});


function createCookie(name,value,days) {
   if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
   }
   else var expires = "";
   document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
};


//Read more button trigger
$(document).on('click', '.readMore', function() {
    $('.shopDescription').css('max-height', '100%').css('overlow', 'visible');
    $('.readMoreContainer').remove();
});
//End of read more trigger 



$(window).resize(function() {
    checkiftooltip();
});

function checkiftooltip() {
    if (width > 768) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="tooltip"]').tooltip('enable');
        } else {
            $('[data-toggle="tooltip"]').tooltip('disable');
        }
};

//this adds focus to charity name input
$(document).on('click', ".charitylp .scroll", function() {
    document.getElementById("charityName").focus();
});

//this adds focus to charity name input
$(document).on('click', ".teamlp .scroll", function() {
    document.getElementById("teamName").focus();
});


//youtube  function
( function() {

    var youtube = document.querySelectorAll( ".youtube" );
    
    for (var i = 0; i < youtube.length; i++) {
        
        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";

        var image = new Image();
                image.src = source;
                image.alt = 'YouTube video thumbnail';
                image.addEventListener( "load", function() {
                    youtube[ i ].appendChild( image );
                }( i ) );
        
                youtube[i].addEventListener( "click", function() {

                    var iframe = document.createElement( "iframe" );

                            iframe.setAttribute( "frameborder", "0" );
                            iframe.setAttribute( "allowfullscreen", "" );
                            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1&enablejsapi=1&cc_load_policy=1" );

                            this.innerHTML = "";
                            this.appendChild( iframe );
                } );    
    };
    
} )();
//end


//start video on modal open 
$('#videoModal').on('shown.bs.modal', function (e) {
    $('#videoModal .play-button').click()

    if ($('video').length) {
        $('video').trigger('pause');
    };

});


//stop video on modal close 
 $('#videoModal').on('hidden.bs.modal', function (e) {
    var videoURL = $('#videoModal iframe').prop('src');
    if ($('#videoModal iframe').length) {
        videoURL = videoURL.replace("&autoplay=1", "");
        $('#videoModal iframe').prop('src','');
        $('#videoModal iframe').prop('src',videoURL);
    }

    if ($('video').length) {
        $('video').trigger('play');
    };    
});


//google maps function
function initMap() {
	if ($('#map').length) {
		var coordinates = {lat: 37.86551, lng: 23.745356};
	    var map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 5,
	      center: coordinates
	    });
	    var marker = new google.maps.Marker({
	      position: coordinates,
	      map: map
	    });
    }
};
//end


//smooth scroll 
$(".scroll").click(function(event){
	event.preventDefault();
	//calculate destination place
	var dest = 0;
	if($(this.hash).offset().top > $(document).height() - $(window).height()){
	  dest = $(document).height() - $(window).height();
	}else{
	  dest = $(this.hash).offset().top;
	}
	//go to destination
	$('html,body').animate({
		scrollTop:dest
	}, 1000,'swing');
});
 //end smoothscroll


//on input click copy content to clipboard
 function copyText() {
 	document.getElementById("copyΤext").select();
    document.execCommand('copy');	   
    $('.toastClub').html('Ο σύνδεσμος έχει αντιγραφεί');
        if( $('.toastClub').is(':visible') ) {
            // it's visible, do nothing
        }
        else {
            $('.toastClub').fadeIn().delay(3000).fadeOut('slow');  
        }
};

//on input click copy content to clipboard
function copy_text(id) {

    document.getElementById(id).select();
    document.execCommand('copy');
    $('.toastClub').html('Ο σύνδεσμος έχει αντιγραφεί');
    if( $('.toastClub').is(':visible') ) {
        // it's visible, do nothing
    }
    else {
        $('.toastClub').fadeIn().delay(3000).fadeOut('slow');
    }
};


//end



//default date range picker

if ($('.periodpicker').length){

    var end = moment();
    var start = moment();

    var max_start = $('#periodTo').val();

    //set the language of the date picker
    moment.locale('el');

    $(function () {

        $('#periodFrom').daterangepicker({
            singleDatePicker: true,
            maxDate:max_start,
             "format": "DD/MM/YYYY"
        });

        $('#periodTo').daterangepicker({
            singleDatePicker: true,
            maxDate:end,
             "format": "DD/MM/YYYY"
        });

    });

    $('#periodFrom').on('apply.daterangepicker', function(ev, picker) {

      //console.log('from', picker.startDate.format('DD/MM/YYYY'));

      $(".custom-select").val("custom");
    });

    $('#periodTo').on('apply.daterangepicker', function(ev, picker) {
      //console.log('to', picker.startDate.format('DD/MM/YYYY'));

       var new_max_end =  $('#periodTo').val();

        $('#periodFrom').daterangepicker({
            singleDatePicker: true,
            maxDate:new_max_end,
        });

      $(".custom-select").val("custom");
    });


    $(document).on('change', '.custom-select', function() {

        //console.log($(this).val());

        var timeperiodValue = $(this).val();

        if (timeperiodValue == 'periodlastweek')
        {

            start = moment().subtract(1, 'week');
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
            //console.log('from', start.format('DD/MM/YYYY'), 'to', end.format('DD/MM/YYYY'))
        }
        else if (timeperiodValue == 'periodlastmonth')
        {
            start = moment().subtract(1, 'month');
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
        }
        else if (timeperiodValue == 'periodlastquarter')
        {
            start = moment().subtract(3, 'months');
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
        }
        else if (timeperiodValue == 'periodlastsixmonths')
        {
            start = moment().subtract(6, 'months');
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
        }
        else if (timeperiodValue == 'periodlastyear')
        {
            start = moment().subtract(1, 'year');
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
        }
        else if (timeperiodValue == 'today')
        {
            start = moment();
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
        }

        });

}
//post selected dates
function getSelectedDates() {



    alert('from ' + $('#periodFrom').val() + ' to ' + $('#periodTo').val())
}

//show toaster
function undotoast(id) {
    var changesSaved = "Πατήστε εδώ για αναίρεση";
    $('.toastClub').html(changesSaved);

    if( $('.toastClub').is(':visible') ) {
        $('.toastClub').fadeOut('fast');
        $('.toastClub').clone().appendTo("body").fadeIn('fast').delay(5000).fadeOut('slow',function(){

            if(id !== null && undo_delete === 0)
                delete_announcement(id);

        });
    }
    else {
        $('.toastClub').fadeIn().delay(5000).fadeOut('slow',function(){

            if(id !== null && undo_delete === 0)
                delete_announcement(id);


        });
    }
}

function delete_announcement(id){

    var url = '/'+country_code+'/charity-dashboard/news-feed/delete_announcement';

    $.post(url, {_token: token,announcement_id:id})
        .done(function (data) {
        })
        .fail(function (xhr, status, error) {
            //console.log(xhr);
        });
}

//duplicate newsfeed post
function newpost() {
    if(is_currently_creating === false) {

        is_currently_creating = true;

        $(".duplicatepostbtn").hide();
        $(".create_new_announcement_button_container").hide();


        var currentdate = moment().local('gr').format("DD/MM/YYYY, h:mm:ss");
        var currentUnixdate = moment().unix();
        $('#newsfeed-template').clone().appendTo(".milestonescontainer").hide().attr('class', 'row-fluid my-3 pt-1 newsfeed d-block').attr('id', 'newsfeed-' + currentUnixdate).fadeIn();
        $('#newsfeed-' + currentUnixdate + ' .newsfeed-post-date').html(currentdate);


        $(".news_feed_title").val("");
        $(".news_feed_description").val("");
        $(".news_feed_image_element").attr('src',"");

        $('textarea.cckeditor_new').ckeditor({
        });


    }
}

//remove feed from timeline
$(document).on('click', '.deletepostbtn, .duplicatepostbtn', function(){
    var idprosdelete = $(this).closest('.newsfeed').attr('id');
    $('#idprosdelete').val(idprosdelete);
})

function removethispost() {

    var idprosdelete = $('#idprosdelete').val();

    var splited_id_to_array = idprosdelete.split("-");



    $('#' + idprosdelete).removeClass('d-block').fadeOut('fast');
    setTimeout(function() {

        if(splited_id_to_array[1] === "saved")
        {
            undotoast(splited_id_to_array[2]);
        }else{
            is_currently_creating = false;
            $(".duplicatepostbtn").show();
            $(".create_new_announcement_button_container").show();
            undotoast(null);
        }

    }, 300);
}
// end of removal process

//undo the removal
$(document).on('click', '.toastClub', function(){
    var idprosdelete = $('#idprosdelete').val();
    $('.toastClub').fadeOut('slow');
    $('#' + idprosdelete).fadeIn('fast');

    var splited_id_to_array = idprosdelete.split("-");

    if(splited_id_to_array[1] === "saved")
    {
        undo_delete = 1;
    }else {
        is_currently_creating = true;
        $(".duplicatepostbtn").hide();
        $(".create_new_announcement_button_container").hide();
    }

});

//duplicate newsfeed
function duplicatethispost(id) {
    setTimeout(function() {

        if(is_currently_creating === false) {

            is_currently_creating = true;

            $(".duplicatepostbtn").hide();
            $(".create_new_announcement_button_container").hide();


            if(id === null){

                var idprosdelete = '#' + $('#idprosdelete').val();

                var currentUnixdate = moment().unix();
                var currentdate = moment().local('gr').format("DD/MM/YYYY, h:mm:ss");
                $(idprosdelete).clone().appendTo(".milestonescontainer").hide().attr('class', 'row-fluid my-3 pt-1 newsfeed d-block').attr('id', 'newsfeed-' + currentUnixdate).fadeIn();
                $('#newsfeed-' + currentUnixdate + ' .newsfeed-post-date').html(currentdate);
            }
            else
            {
                var idprosdelete = '#' + 'newsfeed-saved-'+id;
                var currentdate = moment().local('gr').format("DD/MM/YYYY, h:mm:ss");
                var currentUnixdate = moment().unix();

                $('#newsfeed-template').clone().appendTo(".milestonescontainer").hide().attr('class', 'row-fluid my-3 pt-1 newsfeed d-block').attr('id', 'newsfeed-' + currentUnixdate).fadeIn();
                $('#newsfeed-' + currentUnixdate + ' .newsfeed-post-date').html(currentdate);



                $(".news_feed_title").val($("#newsfeedTitle-"+id).val());
                $(".news_feed_description").val($("#newsfeedDescription-"+id).val());
                $(".news_feed_image_element").attr('src',$("#imageElement-"+id).attr('src'));
                $(".news_feed_current_image_input").val($("#currentImageInput-"+id).val());


                $('textarea.cckeditor_new').ckeditor({
                });

            }
        }

    }, 300);
}



//change causes list view
function changeView(element){
  //console.log(element);
  if (element == 'grid'){
    $('.grid-container').show();
    $('.list-container').hide();
  } else {
    $('.list-container').show();
    $('.grid-container').hide();
  }
}

//This slides in smoothly the sharing buttons
    setTimeout(function(){
        $('.socialShare').css('right', '0px');
    }, 500);

//This is responsible to toggle scroll to tops visibility state
    $(window).scroll(function() {
        if (width > 768) {
            if ($(this).scrollTop() > 3800) {
                $('#toTop').fadeIn('fast', function() {})
            } else {
                $('#toTop').fadeOut('fast', function() {})
            }
        }
    });
////////////////////////////////////////////////////

//As implied by its name
    $('#toTop').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
////////////////////////////////////////////////////////


//This detects whether user has an adblocker installed
$.ajax({
    url: "/js/showads.js", // this is just an empty js file
    dataType: "script"
}).fail(function () {
    $('.adblockWarning').css('display', '').delay(10000).fadeOut(500);
});

/*COOKIES WARNING*/
(function($){
    $.cookieBar = function(options,val){
        if(options=='cookies'){
            var doReturn = 'cookies';
        }else if(options=='set'){
            var doReturn = 'set';
        }else{
            var doReturn = false;
        }
        var defaults = {
            message: 'We’re using cookies, hope that’s cool. By scrolling this page you accept our terms and conditions.', //Message displayed on bar
            acceptButton: true, //Set to true to show accept/enable button
            acceptText: 'I Understand', //Text on accept/enable button
            acceptFunction: function(cookieValue){if(cookieValue!='enabled' && cookieValue!='accepted') window.location = window.location.href;}, //Function to run after accept
            declineButton: false, //Set to true to show decline/disable button
            declineText: 'Disable Cookies', //Text on decline/disable button
            declineFunction: function(cookieValue){if(cookieValue=='enabled' || cookieValue=='accepted') window.location = window.location.href;}, //Function to run after decline
            policyButton: false, //Set to true to show Privacy Policy button
            policyText: 'Privacy Policy', //Text on Privacy Policy button
            policyURL: '/privacy-policy/', //URL of Privacy Policy
            autoEnable: true, //Set to true for cookies to be accepted automatically. Banner still shows
            acceptOnContinue: false, //Set to true to accept cookies when visitor moves to another page
            acceptOnScroll: false, //Set to true to accept cookies when visitor scrolls X pixels up or down
            acceptAnyClick: false, //Set to true to accept cookies when visitor clicks anywhere on the page
            expireDays: 365, //Number of days for cookieBar cookie to be stored for
            renewOnVisit: false, //Renew the cookie upon revisit to website
            forceShow: false, //Force cookieBar to show regardless of user cookie preference
            effect: 'slide', //Options: slide, fade, hide
            element: 'body', //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
            append: false, //Set to true for cookieBar HTML to be placed at base of website. Actual position may change according to CSS
            fixed: true, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
            bottom: false, //Force CSS when fixed, so bar appears at bottom of website
            zindex: '', //Can be set in CSS, although some may prefer to set here
            domain: String(window.location.hostname), //Location of privacy policy
            referrer: String(document.referrer) //Where visitor has come from
        };
        var options = $.extend(defaults,options);
        
        //Sets expiration date for cookie
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime()+(options.expireDays*86400000));
        expireDate = expireDate.toGMTString();
        
        var cookieEntry = 'cb-enabled={value}; expires='+expireDate+'; path=/';
        
        //Retrieves current cookie preference
        var i,cookieValue='',aCookie,aCookies=document.cookie.split('; ');
        for (i=0;i<aCookies.length;i++){
            aCookie = aCookies[i].split('=');
            if(aCookie[0]=='cb-enabled'){
                cookieValue = aCookie[1];
            }
        }
        //Sets up default cookie preference if not already set
        if(cookieValue=='' && doReturn!='cookies' && options.autoEnable){
            cookieValue = 'enabled';
            document.cookie = cookieEntry.replace('{value}','enabled');
        }else if((cookieValue=='accepted' || cookieValue=='declined') && doReturn!='cookies' && options.renewOnVisit){
            document.cookie = cookieEntry.replace('{value}',cookieValue);
        }
        if(options.acceptOnContinue){
            if(options.referrer.indexOf(options.domain)>=0 && String(window.location.href).indexOf(options.policyURL)==-1 && doReturn!='cookies' && doReturn!='set' && cookieValue!='accepted' && cookieValue!='declined'){
                doReturn = 'set';
                val = 'accepted';
            }
        }
        if(doReturn=='cookies'){
            //Returns true if cookies are enabled, false otherwise
            if(cookieValue=='enabled' || cookieValue=='accepted'){
                return true;
            }else{
                return false;
            }
        }else if(doReturn=='set' && (val=='accepted' || val=='declined')){
            //Sets value of cookie to 'accepted' or 'declined'
            document.cookie = cookieEntry.replace('{value}',val);
            if(val=='accepted'){
                return true;
            }else{
                return false;
            }
        }else{
            //Sets up enable/accept button if required
            var message = options.message.replace('{policy_url}',options.policyURL);
            
            if(options.acceptButton){
                var acceptButton = '<a href="" class="cb-enable ">'+options.acceptText+'</a>';
            }else{
                var acceptButton = '';
            }            
            //Displays the cookie bar if arguments met
            if(options.forceShow || cookieValue=='enabled' || cookieValue==''){
                if(options.append){
                    $(options.element).append('<div class="row-fluid fixed-bottom pb-md-2"><div class="container pl-md-0"><div class="row"><div id="cookie-bar" class="col-12 col-md-5 col-lg-4 col-xl-3 bg-light mx-auto py-2 text-center rounded shadow">  <p class="mb-0 smaller-2">Χρησιμοποιούμε <a href="/gr/terms#item-3" class="under-link">cookies</a><a href="javascript:void(0);" class="cb-enable ml-3 btn btn-primary btn-sm smaller-3">OK</a></p></div></div></div></div>');
                }else{
                    $(options.element).prepend('<div class="row-fluid fixed-bottom pb-md-2"><div class="container pl-md-0"><div class="row"><div id="cookie-bar" class="col-12 col-md-5 col-lg-4 col-xl-3 bg-light mx-auto py-2 text-center rounded shadow">  <p class="mb-0 smaller-2">Χρησιμοποιούμε <a href="/gr/terms#item-3" class="under-link">cookies</a><a href="javascript:void(0);" class="cb-enable ml-3 btn btn-primary btn-sm smaller-3">OK</a></p></div></div></div></div>');
                }
            }
            var removeBar = function(func){
                if(options.acceptOnScroll) $(document).off('scroll');
                if(typeof(func)==='function') func(cookieValue);
                if(options.effect=='slide'){
                    $('#cookie-bar').slideUp(300,function(){$('#cookie-bar').remove();});
                }else if(options.effect=='fade'){
                    $('#cookie-bar').fadeOut(300,function(){$('#cookie-bar').remove();});
                }else{
                    $('#cookie-bar').hide(0,function(){$('#cookie-bar').remove();});
                }
                $(document).unbind('click',anyClick);
            };
            var cookieAccept = function(){
                document.cookie = cookieEntry.replace('{value}','accepted');
                removeBar(options.acceptFunction);
            };
            var anyClick = function(e){
                if(!$(e.target).hasClass('cb-policy')) cookieAccept();
            };            
            $('#cookie-bar .cb-enable').click(function(){cookieAccept();return false;});
            $('#cookie-bar .cb-disable').click(function(){cookieDecline();return false;});
            if(options.acceptOnScroll){
                var scrollStart = $(document).scrollTop(),scrollNew,scrollDiff;
                $(document).on('scroll',function(){
                    scrollNew = $(document).scrollTop();
                    if(scrollNew>scrollStart){
                        scrollDiff = scrollNew - scrollStart;
                    }else{
                        scrollDiff = scrollStart - scrollNew;
                    }
                    if(scrollDiff>=Math.round(options.acceptOnScroll)) cookieAccept();
                });
            }
            if(options.acceptAnyClick){
                $(document).bind('click',anyClick);
            }
        }
    };
})(jQuery);
/*END OF COOKIES*/

//make transparency numbers count
function startCountingStats() {
    if ($('.transparencyStats').length) {
        $('.countThisYo').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).attr('data-value')
        }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });

        $('.totalAmountYo').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).attr('data-value')
        }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    //$(this).text(Math.ceil(now));
                    $(this).text(now.toFixed(2));
                    //$(this).text(this.Counter.toFixed(2));
                }
            });
        });
    }
}
//end of transparency numbers

// Detect the browser and if user is on IE9 > show the whatever
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browser = 'Opera';
    } else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        browser = 'MSIE';
    } else if (/Navigator[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browser = 'Netscape';
    } else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browser = 'Chrome';
    } else if (/Edge/.test(navigator.userAgent)) {
        browser = 'Edge';
    } else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browser = 'Safari';
        /Version[\/\s](\d+\.\d+)/.test(navigator.userAgent);
        browserVersion = new Number(RegExp.$1);
    } else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browser = 'Firefox';
    }
    if(browserVersion === 0){
        browserVersion = parseFloat(new Number(RegExp.$1));
    }

   
    //This is responsible for the plugin page
    //var firefoxUrl = "https://addons.mozilla.org/en-US/firefox/addon/youbeherogr/"
    var firefoxUrl = "/plugin/firefox/youbehero_self_hosted-1.93-fx.xpi"
    var chromeUrl = "https://chrome.google.com/webstore/detail/%CE%B7%CF%81%CF%89%CE%B9%CE%BA%CF%8C%CF%82-%CE%B5%CE%BD%CE%B8%CF%85%CE%BC%CE%B7%CF%84%CE%AE%CF%82/ghdpppfcdcmehbhnidhckipjdogdaoia"

    if ($('.pluginInstall').length){
        if(browser === "Safari" || browser === "MSIE") {
            if ($('.pluginBox').length){
                $('.pluginBox').hide();
            };
            $('.pluginInstall').text('Μη διαθέσιμο για Safari');
            $('.article').hide();
        } else if(browser === "Chrome") {
            $('.pluginInstall').html('<i class="fab fa-chrome mr-3"></i>Εγκατάσταση στον Chrome');
            $('.browserName').text('Chrome');
            $('.pluginInstall').attr('href', chromeUrl);
            $('.pluginInstall').attr('target', "_blank");
            $('.pluginInstall').attr('data-toggle', "tooltip");
            $('.pluginInstall').attr('data-placement', "right");
            $('.pluginInstall').attr('title', "Ανοίγει νέο παράθυρο.");
        } else if(browser === "Firefox") {
            $('.pluginInstall').html('<i class="fab fa-firefox mr-3"></i>Εγκατάσταση στον Firefox');
            $('.browserName').text('Firefox');
            $('.pluginInstall').attr('href', firefoxUrl);
            //$('.pluginInstall').attr('target', "_blank");
            $('.pluginInstall').attr('data-toggle', "tooltip");
            $('.pluginInstall').attr('data-placement', "right");
            //$('.pluginInstall').attr('title', "Ανοίγει νέο παράθυρο.");
        } else if(browser === "Edge") {
            $('.pluginInstall').text('Παράλειψη εγκατάστασης');
            $('.article').hide();
        } else if(browser === "MSIE") {
            $('.pluginInstall').text('Παράλειψη εγκατάστασης');
            $('.article').hide();
        }

    }

    $(document).on('click', ".pluginInstall", function() {
        if ($('.skipStep').length){
            setTimeout(function() {
                    window.location.href = "skip_extension"
            }, 2000);
        }
    });
            
/////////////////////////////////////////////////////////////////




//homepage video modal function
if ($('video').length) {
    $('#myModal').on('shown.bs.modal', function (e) {
        $('video').trigger('pause');
    });

    $('#myModal').on('hidden.bs.modal', function (e) {
        $('video').trigger('play');
    });
}
//end of video modal function


//Cool percentage bar text thingy
function barWidth() {
    var barWidth = $('.progress-bar').width();
    $('.progress-fill-text').css('width',barWidth);
}
barWidth();
window.onresize = function() {
    barWidth();
}
// end of Cool percentage bar text thingy

//starting typeahead
if ($('.js-typeahead').length) {
    $.typeahead({
        input: '.js-typeahead',
        minLength: 3,
        maxItem: 15,
        order: "asc",
        hint: true,
        group: {
            template: "{{group}}"
        },
        dynamic: true,
        cancelButton: true,
        maxItemPerGroup: 5,
        emptyTemplate: 'Αναζήτηση για "{{query}}"',
        templateValue: "{{name}}",
        template: "{{name}}",
        display: ["name", "local_alias"],
        cache: false,
        ttl: 86400000, // 1 day
        compression: true,
        source: {
            "Οργανώσεις": {
                ajax: {
                    url: "/api/global_search?term={{query}}",
                    path: "causes",
                },
                href: "{{url}}"
            },
            "Καταστήματα": {
                ajax: {
                    url: "/api/global_search?term={{query}}",
                    path: "shops",
                },
                href: "{{url}}"
            },
            "Κατηγορίες καταστημάτων": {

                ajax: {
                    url: "/api/global_search?term={{query}}",
                    path: "shop_categories",
                },
                href: "{{url}}"
            },
            "Προσφορές": {
                ajax: {
                    url: "/api/global_search?term={{query}}",
                    path: "offers",
                },
                href: "{{url}}"
            },
            "Ετικέτες": {
                ajax: {
                    url: "/api/global_search?term={{query}}",
                    path: "tags",
                },
                href: "{{url}}"
            }
        },
        callback: {
            onClickAfter: function (node, a, item, event) {

                event.preventDefault;

                // href key gets added inside item from options.href configuration
                

            }

        },
        //debug: true
    });
};
// ending typeahead


//homepage owl logo carousel
$('.charity-logos .owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});
//end of homepage owl logo carousel 

//homepage owl logo carousel
$('.testimonials .owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        800: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});
//end of homepage owl logo carousel 

//homepage owl logo carousel
$('.featured-shops .owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 3
        },
        400: {
            items: 5
        }
    }
});
//end of homepage owl logo carousel

//homepage owl logo carousel
$('.press-logos .owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 2
        },
        800: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});
//end of homepage owl logo carousel

//homepage bodymovin animation
if ($('#anim').length) {
        var animation = bodymovin.loadAnimation({
        container: document.getElementById('anim'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/js/data.json'
    });
}
//end of homepage bodymovin animation


//ouibounce -> https://github.com/carlsednaoui/ouibounce
!function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):e.ouibounce=n()}(this,function(e,n,o){return function(e,n){"use strict";function o(e,n){return"undefined"==typeof e?n:e}function i(e){var n=24*e*60*60*1e3,o=new Date;return o.setTime(o.getTime()+n),"; expires="+o.toUTCString()}function t(){s()||(L.addEventListener("mouseleave",u),L.addEventListener("mouseenter",r),L.addEventListener("keydown",c))}function u(e){e.clientY>k||(D=setTimeout(m,y))}function r(){D&&(clearTimeout(D),D=null)}function c(e){g||e.metaKey&&76===e.keyCode&&(g=!0,D=setTimeout(m,y))}function d(e,n){return a()[e]===n}function a(){for(var e=document.cookie.split("; "),n={},o=e.length-1;o>=0;o--){var i=e[o].split("=");n[i[0]]=i[1]}return n}function s(){return d(T,"true")&&!v}function m(){s()||(e&&(e.style.display="block"),E(),f())}function f(e){var n=e||{};"undefined"!=typeof n.cookieExpire&&(b=i(n.cookieExpire)),n.sitewide===!0&&(w=";path=/"),"undefined"!=typeof n.cookieDomain&&(x=";domain="+n.cookieDomain),"undefined"!=typeof n.cookieName&&(T=n.cookieName),document.cookie=T+"=true"+b+x+w,L.removeEventListener("mouseleave",u),L.removeEventListener("mouseenter",r),L.removeEventListener("keydown",c)}var l=n||{},v=l.aggressive||!1,k=o(l.sensitivity,20),p=o(l.timer,1e3),y=o(l.delay,0),E=l.callback||function(){},b=i(l.cookieExpire)||"",x=l.cookieDomain?";domain="+l.cookieDomain:"",T=l.cookieName?l.cookieName:"viewedOuibounceModal",w=l.sitewide===!0?";path=/":"",D=null,L=document.documentElement;setTimeout(t,p);var g=!1;return{fire:m,disable:f,isDisabled:s}}});


//Ouibounce modal begin
var _ouibounce = ouibounce(document.getElementById('ouiBounceDialog'), {
    aggressive: false,
    timer: 0,
    callback: function() { 
        $('#ouiBounceDialog').modal('show');
    }
});
//Ouibounce modal end


//pushy menu
!function(a){function b(){g.hasClass(k)?h.toggleClass(l):h.toggleClass(m),q&&g.one("transitionend",function(){q.focus()})}function c(){g.hasClass(k)?h.removeClass(l):h.removeClass(m)}function d(){g.hasClass(k)?(h.addClass(l),g.animate({left:"0px"},r),i.animate({left:s},r),j.animate({left:s},r)):(h.addClass(m),g.animate({right:"0px"},r),i.animate({right:s},r),j.animate({right:s},r)),q&&q.focus()}function e(){g.hasClass(k)?(h.removeClass(l),g.animate({left:"-"+s},r),i.animate({left:"0px"},r),j.animate({left:"0px"},r)):(h.removeClass(m),g.animate({right:"-"+s},r),i.animate({right:"0px"},r),j.animate({right:"0px"},r))}function f(){a(t).addClass(v),a(t).on("click",function(b){var c=a(this);c.hasClass(v)?(c.siblings(t).addClass(v).removeClass(u),c.removeClass(v).addClass(u)):c.addClass(v).removeClass(u),b.stopPropagation()})}var g=a(".pushy"),h=a("body"),i=a("#container"),j=a(".push"),k="pushy-left",l="pushy-open-left",m="pushy-open-right",n=a(".site-overlay"),o=a(".menu-btn, .pushy-link"),p=a(".menu-btn"),q=a(g.data("focus")),r=200,s=g.width()+"px",t=".pushy-submenu",u="pushy-submenu-open",v="pushy-submenu-closed";a(t);a(document).keyup(function(a){27==a.keyCode&&(h.hasClass(l)||h.hasClass(m))&&(w?c():(e(),x=!1),p&&p.focus())});var w=function(){var a=document.createElement("p"),b=!1,c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};if(null!==document.body){document.body.insertBefore(a,null);for(var d in c)void 0!==a.style[d]&&(a.style[d]="translate3d(1px,1px,1px)",b=window.getComputedStyle(a).getPropertyValue(c[d]));return document.body.removeChild(a),void 0!==b&&b.length>0&&"none"!==b}return!1}();if(w)f(),o.on("click",function(){b()}),n.on("click",function(){b()});else{h.addClass("no-csstransforms3d"),g.hasClass(k)?g.css({left:"-"+s}):g.css({right:"-"+s}),i.css({"overflow-x":"hidden"});var x=!1;f(),o.on("click",function(){x?(e(),x=!1):(d(),x=!0)}),n.on("click",function(){x?(e(),x=!1):(d(),x=!0)})}}(jQuery);