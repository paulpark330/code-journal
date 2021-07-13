/* global data */
/* exported data */
var $photo = document.querySelector('img');

var $photoInput = document.querySelector('#photo-url');

$photoInput.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});
