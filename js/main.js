/* global data */
/* exported data */
var $photo = document.querySelector('img');
var $photoInput = document.querySelector('#photo-url');
var $submitForm = document.querySelector('form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $views = document.querySelectorAll('.view');
var $ul = document.querySelector('ul');

function previewImg(event) {
  $photo.setAttribute('src', event.target.value);
}

function submitForm(event) {
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
  $ul.prepend(renderEntry($entry));
  switchView('entries');
}

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
  var divIconTitle = document.createElement('div');
  divIconTitle.setAttribute(
    'class',
    'display-flex justify-between align-center'
  );
  divColHalf2.appendChild(divIconTitle);
  var title = document.createElement('h2');
  title.textContent = entry.title;
  divIconTitle.appendChild(title);
  var icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-pencil-alt');
  divIconTitle.appendChild(icon);
  var notes = document.createElement('p');
  notes.textContent = entry.notes;
  divColHalf2.appendChild(notes);
  return list;
}

function switchView(string) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === string) {
      $views[i].setAttribute('class', 'view');
    } else {
      $views[i].setAttribute('class', 'view hidden');
    }
  }
  data.view = string;
}

function journalEntryLoop(event) {
  for (let i = data.entries.length - 1; i >= 0; i--) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
}

$photoInput.addEventListener('input', previewImg);

window.addEventListener('DOMContentLoaded', journalEntryLoop);

window.addEventListener('click', function (event) {
  if (event.target.matches('.switch-view')) {
    switchView(event.target.getAttribute('data-view'));
  }
});

$submitForm.addEventListener('submit', submitForm);

switchView(data.view);
