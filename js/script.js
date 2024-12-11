document.addEventListener('DOMContentLoaded', function () {
    var composeButton = document.getElementById('composeButton');
    var clearButton = document.getElementById('clearButton'); // Added clear button
    var entryText = document.getElementById('entryText');
    var entryList = document.getElementById('entryList');

    composeButton.addEventListener('click', function () {
        var entry = entryText.value.trim();
        if (entry) {
            var timestamp = new Date().toLocaleString('en-US', { // Improved timestamp formatting
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            saveEntry(entry, timestamp);
            entryText.value = ''; // Clear the textarea after submission
            addEntryToDOM(entry, timestamp);
        } else {
            alert("Please write an entry before submitting."); // Alert for empty entry
        }
    });

    clearButton.addEventListener('click', function () { // Clear all entries functionality
        localStorage.removeItem('journalEntries');
        entryList.innerHTML = ''; // Clear the displayed entries
    });

    function saveEntry(entry, timestamp) {
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push({ entry: entry, timestamp: timestamp });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        entryList.innerHTML = ''; // Clear the list before loading entries
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.forEach(function (entryData) {
            addEntryToDOM(entryData.entry, entryData.timestamp);
        });
    }

    function addEntryToDOM(entry, timestamp) {
        var div = document.createElement('div');
        div.className = 'entry-box';
        div.innerHTML = `<p>${entry}</p><div class="entry-timestamp">${timestamp}</div>`;
        entryList.appendChild(div);
    }

    // Load entries when the page loads
    loadEntries();
});