/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var entriesJSON = JSON.stringify(data.entries);
  this.localStorage.setItem('entries', entriesJSON);
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('dataModel', dataJSON);
});
