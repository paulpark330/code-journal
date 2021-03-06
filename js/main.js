/* global data */
/* exported data */
var $photo = document.querySelector('img');
var $photoInput = document.querySelector('#photo-url');
var $submitForm = document.querySelector('form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $views = document.querySelectorAll('.view');
var $ul = document.querySelector('ul');
var $heading = document.querySelector('.form-heading');
var $deleteEntry = document.querySelector('.delete-entry');
var $modal = document.querySelector('.modal');
var $cancelBtn = document.querySelector('.cancel-btn');
var $confirmDelete = document.querySelector('.confirm-btn');
var $searchBar = document.querySelector('.search-bar');

function previewImg(event) {
  $photo.setAttribute('src', event.target.value);
}

function submitForm(event) {
  event.preventDefault();
  if (data.editing !== null) {
    var newEntry = {
      title: $title.value,
      notes: $notes.value,
      photo: $photoInput.value,
      entryId: data.editing.entryId
    };
    var index = data.entries.findIndex(
      el => el.entryId === data.editing.entryId
    );
    data.entries[index] = newEntry;

    var $li = document.querySelectorAll('li');

    for (let i = 0; i < data.entries.length; i++) {
      if (parseInt($li[i].getAttribute('data-entry-id')) === newEntry.entryId) {
        $li[i].replaceWith(renderEntry(newEntry));
      }
    }

    $submitForm.reset();
    switchView('entries');
    data.editing = null;
  } else {
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
}

function renderEntry(entry) {
  var list = document.createElement('li');
  list.setAttribute('class', 'margin-bottom');
  list.setAttribute('data-entry-id', entry.entryId);
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
  icon.setAttribute('class', 'fas fa-pencil-alt edit');
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
  data.editing = null;
  data.view = string;
  $deleteEntry.className = 'delete-entry hidden';
}

function journalEntryLoop(event) {
  for (let i = data.entries.length - 1; i >= 0; i--) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
}

function editEntry(event) {
  if (event.target.matches('.edit')) {
    switchView('form');
    $heading.textContent = 'Edit Entry';
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryId ===
        parseInt(event.target.closest('li').getAttribute('data-entry-id'))
      ) {
        data.editing = data.entries[i];
      }
    }
    $photo.setAttribute('src', data.editing.photo);
    $title.value = data.editing.title;
    $photoInput.value = data.editing.photo;
    $notes.value = data.editing.notes;
  }
  $deleteEntry.className = 'delete-entry';
}

function deleteEntry(event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      var $li = document.querySelectorAll('li');
      for (let i = 0; i < $li.length; i++) {
        if (parseInt($li[i].getAttribute('data-entry-id')) === data.editing.entryId) {
          $li[i].remove();
        }
      }
      $modal.className = 'modal display-none';
      switchView('entries');
    }
  }
}

function modalOn(event) {
  event.preventDefault();
  $modal.className = 'modal';
}

function modalOff(event) {
  $modal.className = 'modal display-none';
}

function searchEntries(event) {
  var $entryTitle = document.querySelectorAll('h2');
  var $li = document.querySelectorAll('li');
  for (let i = 0; i < $entryTitle.length; i++) {
    $li[i].className += ' hidden';
    if (event.target.value.toLowerCase() === $entryTitle[i].textContent.toLowerCase()) {
      $li[i].className = 'margin-bottom';
    }
  }
  if (event.target.value.toLowerCase() === '') {
    for (let i = 0; i < $entryTitle.length; i++) {
      $li[i].className = 'margin-bottom';
    }
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

$ul.addEventListener('click', editEntry);

$deleteEntry.addEventListener('click', modalOn);

$cancelBtn.addEventListener('click', modalOff);

$confirmDelete.addEventListener('click', deleteEntry);

$searchBar.addEventListener('input', searchEntries);

switchView(data.view);
