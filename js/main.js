/* global data */
/* exported data */
var $photo = document.querySelector('img');
var $photoInput = document.querySelector('#photo-url');
var $submitForm = document.querySelector('form');
var $title = document.querySelector('#title')
var $notes = document.querySelector('#notes')

$photoInput.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

$submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var $entry = {};
  $entry.title = $title.value;
  $entry.notes = $notes.value;
  $entry.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push($entry);
  $photo.setAttribute("src", "images/placeholder-image-square.jpg");
  $submitForm.reset();
  console.log(data);
})
