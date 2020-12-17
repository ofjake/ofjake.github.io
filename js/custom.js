/*
Author: JakeRMiller
Version: 3.0
Fade out when clicking links / Reloads page on every visit
*/

$('.fadepage').click(function(e) {
e.preventDefault();
newLocation = this.href;
$('body').fadeOut('slow', newpage);
});

function newpage() {
window.location = newLocation;
}
$(document).ready(function(){
/*! Fades in whole page on load */
$('body').css('display', 'none');
$('body').fadeIn(500);
});

 /*! Reload */
function Reload() {
try {
var headElement = document.getElementsByTagName("head")[0];
if (headElement && headElement.innerHTML)
headElement.innerHTML += "<meta http-equiv=\"refresh\" content=\"1\">";
}
catch (e) {}
}

/*! Reloads on every visit in mobile safari */
if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
window.onpageshow = function(evt) {
if (evt.persisted) {
document.body.style.display = "none";
location.reload();
}
};
}
