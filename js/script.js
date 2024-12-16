document.addEventListener('DOMContentLoaded', function () {
    var composeButton = document.getElementById('composeButton');
    var confirmClearButton = document.getElementById('confirmClearButton'); // Added confirm clear button
    var codeInput = document.getElementById('codeInput');
    var noteInput = document.getElementById('noteInput');
    var entryList = document.getElementById('entryList');
    var sunIcon = document.getElementById('sunIcon');
    var moonIcon = document.getElementById('moonIcon');

    composeButton.addEventListener('click', function () {
        var code = codeInput.value.trim();
        var note = noteInput.value.trim();
        if (code || note) {
            var timestamp = new Date().toLocaleString('en-US', { // Improved timestamp formatting
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            saveEntry(code, note, timestamp);
            codeInput.value = ''; // Clear the textarea after submission
            noteInput.value = ''; // Clear the textarea after submission
            addEntryToDOM(code, note, timestamp);
        } else {
            alert("Please write code or notes before submitting."); // Alert for empty entry
        }
    });

    confirmClearButton.addEventListener('click', function () { // Clear all entries functionality
        localStorage.removeItem('journalEntries');
        entryList.innerHTML = ''; // Clear the displayed entries
        $('#clearModal').modal('hide'); // Hide the modal after clearing entries
    });

    sunIcon.addEventListener('mouseover', function () {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    });

    moonIcon.addEventListener('mouseover', function () {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    });

    function saveEntry(code, note, timestamp) {
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push({ code: code, note: note, timestamp: timestamp });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        entryList.innerHTML = ''; // Clear the list before loading entries
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.forEach(function (entryData) {
            addEntryToDOM(entryData.code, entryData.note, entryData.timestamp);
        });
    }

    function addEntryToDOM(code, note, timestamp) {
        var div = document.createElement('div');
        div.className = 'card mb-3';
        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Entry</h5>
                <pre><code>${escapeHTML(code)}</code></pre>
                <p class="card-text">${escapeHTML(note)}</p>
                <p class="card-text"><small class="text-muted">${timestamp}</small></p>
            </div>`;
        entryList.appendChild(div);
    }

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    // Load entries when the page loads
    loadEntries();
});