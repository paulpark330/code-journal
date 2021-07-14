/* global data */
/* exported data */
var $photo = document.querySelector('img');
var $photoInput = document.querySelector('#photo-url');
var $submitForm = document.querySelector('form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $navEntries = document.querySelector('.nav-entries');
var $viewEntries = document.querySelector('.view-entries');
var $viewForm = document.querySelector('.view-form');
var $newButton = document.querySelector('#new-btn');

$photoInput.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

$submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var $entry = {};
  $entry.title = $title.value;
  $entry.notes = $notes.value;
  $entry.photo = $photoInput.value;
  $entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push($entry);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submitForm.reset();
  $viewForm.setAttribute('class', 'view-form hidden');
  $viewEntries.setAttribute('class', 'view-entries');
});

function renderEntry(entry) {

  var list = document.createElement('li');
  list.setAttribute('class', 'margin-bottom');
  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');
  list.appendChild(divRow);
  var divColHalf1 = document.createElement('div');
  divColHalf1.setAttribute('class', 'col-half');
  divRow.appendChild(divColHalf1);
  divRow.append(divColHalf1);
  var divImageContainer = document.createElement('div');
  divImageContainer.setAttribute('class', 'image-container');
  divColHalf1.appendChild(divImageContainer);
  var image = document.createElement('img');
  image.setAttribute('src', entry.photo);
  divImageContainer.appendChild(image);
  var divColHalf2 = document.createElement('div');
  divColHalf2.setAttribute('class', 'col-half');
  divRow.appendChild(divColHalf2);
  var title = document.createElement('h2');
  title.textContent = entry.title;
  divColHalf2.appendChild(title);
  var notes = document.createElement('p');
  notes.textContent = entry.notes;
  divColHalf2.appendChild(notes);
  return list;
}

var $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (let i = data.entries.length - 1; i >= 0; i--) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});

$navEntries.addEventListener('click', function (event) {
  event.preventDefault();
  $viewForm.setAttribute('class', 'view-form hidden');
  $viewEntries.setAttribute('class', 'view-entries');
});

$newButton.addEventListener('click', function (event) {
  event.preventDefault();
  $viewForm.setAttribute('class', 'view-form');
  $viewEntries.setAttribute('class', 'view-entries hidden');
});
