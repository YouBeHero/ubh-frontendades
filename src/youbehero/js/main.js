//
//  *=====================================
//          Footer JS File
//  *=====================================
//
jQuery(document).ready(function($) {
//Get Parammeters from url Start
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
if (getUrlParameter('ybh-user-id')) {
    var tech = getUrlParameter('ybh-user-id');
    //alert(tech)
    window.localStorage
    localStorage.setItem("user-id", tech);
    $('#urlcal').html(tech);
} else {
    $('#urlcal').html('No Parameter was passed');
}
//Get Parammeters from url End
let userId = localStorage.getItem("user-id")
$('#ybh-userid').html('Your User id is: ' + userId);
$('#localstrid').html(userId);
})
