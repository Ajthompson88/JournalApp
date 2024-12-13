document.addEventListener('DOMContentLoaded', function () {
var composeButton = document.getElementById('composeButton');
var clearButton = document.getElementById('clearButton'); 
var entryText1 = document.getElementById('entryText1');
var entryText2 = document.getElementById('entryText2');
var entryList = document.getElementById('entryList');
var openModalButton = document.getElementById('openModalButton');

var closeModalButton = document.getElementById('closeModalButton');
var entriesModal = document.getElementById('entriesModal');

composeButton.addEventListener('click', function () {

var entry = entryText1.value.trim();
var entry2 = entryText2.value.trim();

if ((entry) && (entry2)){
    var timestamp = new Date().toLocaleString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    saveEntry(entry, entry2, timestamp);
    entryText1.value = ''; 
    entryText2.value = ''; 
    addEntryToDOM(entry, entry2, timestamp);
} else {
    alert("Please write an entry before submitting."); 
}
});


clearButton.addEventListener('click', function () { 
localStorage.removeItem('journalEntries');
entryList.innerHTML = ''; 
});

openModalButton1.addEventListener('click', function () {
entriesModal.style.display = 'block';
loadEntries();
});

openModalButton2.addEventListener('click', function () {
entriesModal.style.display = 'block';
loadEntries();
});

closeModalButton.addEventListener('click', function () {
entriesModal.style.display = 'none';
});


window.addEventListener('click', function (event) {
if (event.target == entriesModal) {
    entriesModal.style.display = 'none';
}
});

function saveEntry(entry, timestamp) {
var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
entries.push({ entry: entry, timestamp: timestamp });
localStorage.setItem('journalEntries', JSON.stringify(entries));
}

function loadEntries() {
entryList.innerHTML = ''; 
var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
entries.forEach(function (entryData) {
    addEntryToDOM(entryData.entry, entryData.timestamp);
});
}

function addEntryToDOM(entry, timestamp) {
var div = document.createElement('div');
div.className = 'entry-box';
div.innerHTML = '<p>' + entry + '</p><p class="entry-timestamp">' + timestamp + '</p>';
entryList.appendChild(div);
}
});