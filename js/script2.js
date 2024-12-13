document.addEventListener('DOMContentLoaded', function () {
    console.log("I am here in document add event listener");
    var composeButton = document.getElementById('composeButton');
    var clearButton = document.getElementById('clearButton'); // Added clear button
    var entryText = document.getElementById('entryText');
    var entryCode = document.getElementById('entryCode'); // Added entry code
    var entryList = document.getElementById('entryList');
    var openModalButton = document.getElementById('openModalButton');
    var closeModalButton = document.getElementById('closeModalButton');
    var entriesModal = document.getElementById('entriesModal');

    composeButton.addEventListener('click', function () {
        var entry = entryText.value.trim();
        var entry2 = entryCode.value.trim(); // Added entry code
        if ((entry) && (entry2)) { // Added entry code
            var timestamp = new Date().toLocaleString('en-US', { // Improved timestamp formatting
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            saveEntry(entry, entry2, timestamp);
            entryText.value = ''; // Clear the textarea after submission
            entryCode.value = ''; // Clear the textarea after submission

            addEntryToDOM(entry, entry2, timestamp);
        } else {
            alert("Please write an entry before submitting."); // Alert for empty entry
        }
    });
    clearButton.addEventListener('click', function () { // Clear all entries functionality
        localStorage.removeItem('journalEntries');
        entryList.innerHTML = ''; // Clear the displayed entries
    });

    openModalButton.addEventListener('click', function () {
        entriesModal.style.display = 'block';
        loadEntries();
    });

    closeModalButton.addEventListener('click', function () {
        entriesModal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target == entriesModal) {
            entriesModal.style.display = 'none';
        }
    });

    function saveEntry(entry, entry2, timestamp) {
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push({ entry: entry, entry2: entry2, timestamp: timestamp });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        entryList.innerHTML = ''; // Clear the list before loading entries
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.forEach(function (entryData) {
            addEntryToDOM(entryData.entry, entryData.entry2, entryData.timestamp);
        });
    }

    function addEntryToDOM(entry, entry2, timestamp) {
        var div = document.createElement('div');
        div.className = 'entry-box';
        div.innerHTML = '<p>' + entry + '</p><p>' + entry2 + '</p><p class="entry-timestamp">' + timestamp + '</p>';
        entryList.appendChild(div);
    }
});