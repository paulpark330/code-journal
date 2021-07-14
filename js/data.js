/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataModel = localStorage.getItem('dataModel');

if (previousDataModel !== null) {
  data = JSON.parse(previousDataModel);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('dataModel', dataJSON);
});
