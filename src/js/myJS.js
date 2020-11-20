//global vars
var changesSaved = "";

if ($('.periodpicker').length){
    var start = moment();
    var end = moment();

    //set the language of the date picker
    moment.locale('el');
}

$(document).ready(function() {
    checkiftooltip();
    
    //As implied by its name
    $.cookieBar({
        fixed: true
    }); 

});
//end

/*dynamically change the href on the charity selection button*/
$( function() {
    let causepage = $('.cause-page')

    if (causepage.length) {
        $(document).ready(function() {
            var url = window.location.href;
            if (url.indexOf('?facebook-visitor') > -1) {
                setTimeout(function() {
                    $("a[href='signup.html']").replaceWith("<a href='https://youbehero.com/gr/signup2' style='background: #3B5998;' class='btn btn-primary py-2 mb-3 border-0 btn-block'><i class='fab fa-facebook-square mx-2' aria-hidden='true'> </i> Εγγραφή με Facebook</a>")
                }, 1000);  
            }
        }); 
    };
});
/* ----- End -----*/

$(window).resize(function() {
    checkiftooltip();
});

function checkiftooltip() {
    var width = $(window).width();
    if (width > 768) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="tooltip"]').tooltip('enable');
        } else {
            $('[data-toggle="tooltip"]').tooltip('disable');
        }
};

/*     //Read more button for eshops
    var width = $(window).width();
    if (width < 768) {
        if ($('.eshop-page').length) {
            console.log('eshops');
            $('.shopDescription').append('<p class="read-more"><a href="#" class="button">Read More</a></p>');            
        }
    }*/

//this adds focus to charity name input
$(document).on('click', ".charitylp .scroll", function() {
    console.log('clicked');
    document.getElementById("charityName").focus();
});

//this adds focus to charity name input
$(document).on('click', ".teamlp .scroll", function() {
    console.log('clicked');
    document.getElementById("teamName").focus();
});

$(document).on('change', '#charity-menu-dd', function(){
    var toValue = $("#charity-menu-dd option:selected").val();
    switch (toValue) {
        case "main":
        window.location.href = "charity-dashboard-main.html"
        break;
        case "donations":
        window.location.href = "charity-dashboard-donations.html"
        break;
        case "supporters":
        window.location.href = "charity-dashboard-supporters.html"
        break;
        case "milestones":
        window.location.href = "charity-dashboard-milestones.html"
        break;
        case "newsfeed":
        window.location.href = "charity-dashboard-newsfeed.html"
        break;
        case "gallery":
        window.location.href = "charity-dashboard-gallery.html"
        break;
    }
});


$(document).on('change', '#team-menu-dd', function(){
    var toValue = $("#team-menu-dd option:selected").val();
    switch (toValue) {
        case "main":
        window.location.href = "team-dashboard-main.html"
        break;
        case "donations":
        window.location.href = "team-dashboard-donations.html"
        break;
        case "members":
        window.location.href = "team-dashboard-supporters.html"
        break;
        case "profile":
        window.location.href = "team-dashboard-newsfeed.html"
        break;
    }
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
                            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1&enablejsapi=1" );

                            this.innerHTML = "";
                            this.appendChild( iframe );
                } );    
    };
    
} )();
//end


//stop video on modal close 
 $('#videoModal').on('hidden.bs.modal', function (e) {
    var videoURL = $('#videoModal iframe').prop('src');
    if ($('#videoModal iframe').length) {
        videoURL = videoURL.replace("&autoplay=1", "");
        $('#videoModal iframe').prop('src','');
        $('#videoModal iframe').prop('src',videoURL);
        console.log('modal closed, stopping video');
    }
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
//end



//charts for charity dashboard
if ($('#donationsoverview').length) {
var ctx = document.getElementById("donationsoverview");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος", "Φεβρουάριος", "Μάρτιος"],
        datasets: [{
            label: 'Δωρεές',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

};

if ($('#supportersoverview').length) {
var ctx = document.getElementById("supportersoverview");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος", "Φεβρουάριος", "Μάρτιος"],
        datasets: [{
            label: 'Υποστηρικτές',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}


if ($('#donationsineuro').length) {
var ctx = document.getElementById("donationsineuro");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος", "Φεβρουάριος", "Μάρτιος"],
        datasets: [{
            label: 'Υποστηρικτές',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}


if ($('#donationsinrecursion').length) {
var ctx = document.getElementById("donationsinrecursion");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος", "Φεβρουάριος", "Μάρτιος"],
        datasets: [{
            label: 'Υποστηρικτές',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}



if ($('#supporterschart').length) {
var ctx = document.getElementById("supporterschart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος", "Φεβρουάριος", "Μάρτιος"],
        datasets: [{
            label: 'Υποστηρικτές',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}


//default date range picker
if ($('.periodpicker').length){
    $(function () {

        var start = moment().subtract(29, 'days');

        $('#periodFrom').daterangepicker({
            startDate: start,
            singleDatePicker: true,
             "format": "DD/MM/YYYY"
        });

        $('#periodTo').daterangepicker({
            endDate: end,
            singleDatePicker: true,
             "format": "DD/MM/YYYY"
        });

    });

    $('#periodFrom').on('apply.daterangepicker', function(ev, picker) {
      console.log('from', picker.startDate.format('DD/MM/YYYY'));
    });

    $('#periodTo').on('apply.daterangepicker', function(ev, picker) {
      console.log('to', picker.startDate.format('DD/MM/YYYY'));
    });


    $(document).on('change', '.custom-select', function() {
        console.log($('.custom-select').val());
        var timeperiodValue = $(".custom-select").val();
        if (timeperiodValue == 'periodlastweek')
        {
            start = moment().subtract(7, 'days');
            end = moment();
            $('#periodFrom').val(start.format('DD/MM/YYYY'));
            $('#periodTo').val(end.format('DD/MM/YYYY'));
            console.log('from', start.format('DD/MM/YYYY'), 'to', end.format('DD/MM/YYYY'))
        }
        else if (timeperiodValue == 'periodlastmonth')
        {
            start = moment().subtract(29, 'days');
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
function undotoast() {
    var changesSaved = "Πατήστε εδώ για αναίρεση";
    $('.toastClub').html(changesSaved);                
    if( $('.toastClub').is(':visible') ) {
        $('.toastClub').fadeOut('fast');
        $('.toastClub').clone().appendTo("body").fadeIn('fast').delay(5000).fadeOut('slow');
    }
    else {
        $('.toastClub').fadeIn().delay(5000).fadeOut('slow');
    }
}




//duplicate newsfeed post
function newpost() {
    var currentdate = moment().local('gr').format("DD/MM/YYYY, h:mm:ss");
    var currentUnixdate = moment().unix();
    $('#newsfeed-template').clone().appendTo(".milestonescontainer").hide().attr('class', 'row-fluid my-3 pt-1 newsfeed d-block').attr('id', 'newsfeed-' + currentUnixdate).fadeIn();
    $('#newsfeed-' + currentUnixdate + ' .newsfeed-post-date').html(currentdate);
}

//remove feed from timeline
$(document).on('click', '.deletepostbtn, .duplicatepostbtn', function(){
    var idprosdelete = $(this).closest('.newsfeed').attr('id');
    $('#idprosdelete').val(idprosdelete);
})

function removethispost() {
    var idprosdelete = $('#idprosdelete').val();
    $('#' + idprosdelete).removeClass('d-block').fadeOut('fast');
    setTimeout(function() {
        undotoast();        
    }, 300);
}
// end of removal process

//undo the removal
$(document).on('click', '.toastClub', function(){
    var idprosdelete = $('#idprosdelete').val();
    $('.toastClub').fadeOut('slow');
    $('#' + idprosdelete).fadeIn('fast');
})

//duplicate newsfeed
function duplicatethispost() {
    setTimeout(function() {
        var idprosdelete = $('#idprosdelete').val();
        var currentUnixdate = moment().unix();
        var currentdate = moment().local('gr').format("DD/MM/YYYY, h:mm:ss");
        $('#' + idprosdelete).clone().appendTo(".milestonescontainer").hide().attr('class', 'row-fluid my-3 pt-1 newsfeed d-block').attr('id', 'newsfeed-' + currentUnixdate).fadeIn();
        $('#newsfeed-' + currentUnixdate + ' .newsfeed-post-date').html(currentdate);
    }, 300);
}



//change causes list view
function changeView(element){
  console.log(element);
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
        if ($(this).scrollTop() > 650) {
            $('#toTop').fadeIn('fast', function() {})
        } else {
            $('#toTop').fadeOut('fast', function() {})
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

/*//This detects whether user has an adblocker installed
if(document.getElementById('sLbPCpwekFOd')){
  // Yay! No ad blocker!
} else {
  $('.adblockWarning').css('display', '').delay(5000).fadeOut(500);
}*/

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
                    $(options.element).append('<div class="row-fluid fixed-bottom"><div class="container pl-md-0"><div class="row"><div id="cookie-bar" class="col-12 col-md-6 col-lg-3 bg-dark mx-auto py-2 text-center text-white">  <p class="mb-0 smaller-1">Χρησιμοποιούμε <a href="termsandconditions.html#item-3" class="text-white under-link">cookies</a><a href="javascript:void(0);" class="cb-enable text-white bigger-3 ml-3 align-middle text-decoration-none">×</a></p></div></div></div></div>');
                }else{
                    $(options.element).prepend('<div class="row-fluid fixed-bottom"><div class="container pl-md-0"><div class="row"><div id="cookie-bar" class="col-12 col-md-6 col-lg-3 bg-dark mx-auto py-2 text-center text-white">  <p class="mb-0 smaller-1">Χρησιμοποιούμε <a href="termsandconditions.html#item-3" class="text-white under-link">cookies</a><a href="javascript:void(0);" class="cb-enable text-white bigger-3 ml-3 align-middle text-decoration-none">×</a></p></div></div></div></div>');
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