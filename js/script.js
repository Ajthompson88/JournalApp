document.addEventListener('DOMContentLoaded', function () {
    
    var composeButton = document.getElementById('composeButton');
    var clearButton = document.getElementById('clearButton'); 
    var entryCode = document.getElementById('entryCode');
    var entryText = document.getElementById('entryText');
    var entryList = document.getElementById('entryList');
    var openModalButton = document.getElementById('openModalButton');
    var closeModalButton = document.getElementById('closeModalButton');
    var entriesModal = document.getElementById('entriesModal');

    composeButton.addEventListener('click', function () {
        
        var entryCodeInput = entryCode.value.trim();
        var entryTextInput = entryText.value.trim();

        if (entryCodeInput && entryTextInput) {
            var timestamp = new Date().toLocaleString('en-US', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            saveEntry(entryCodeInput, entryTextInput, timestamp);
            entryCode.value = ''; 
            entryText.value = ''; 
            addEntryToDOM(entryCodeInput, entryTextInput, timestamp);
        } else {
            alert("Please write an entry before submitting."); 
            }
        
        });
    });

    clearButton.addEventListener('click', function () { 
        localStorage.removeItem('journalEntries');
        entryList.innerHTML = ''; 
    });

    openModalButton.addEventListener('click', function () {
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

    function saveEntry(entryCodeInput, entryTextInput, timestamp) {
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push({ entryCodeInput: entryCodeInput, entryTextInput: entryTextInput, timestamp: timestamp });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        entryList.innerHTML = ''; 
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.forEach(function (entryData) {
            addEntryToDOM(entryData.entryCodeInput, entryData.entryTextInput, entryData.timestamp);
        });
    }
    

   

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }
    
    function addEntryToDOM(entryCodeInput, entryTextInput, timestamp) {
        var div = document.createElement('div');
        div.className = 'entry-box';
        div.innerHTML = ` 
           <span class="code-output"> Code Entry: </span><pre><code>${escapeHTML(entryCodeInput)}</code></pre>
            <!--Journal Entry: <pre><code>${escapeHTML(entryTextInput)}</code></pre>  this is in case we want to allow user to enter HTML code in the journal entry portion-->
           <span class="journal-output">  Journal Entry: </span> <p class="entry-text-input">${entryTextInput}</p> 
           <span class="date-time-output"> Entry Date and Time:</span> <p class="timestamp">${timestamp}</p>`;      
        entryList.appendChild(div);
    }
