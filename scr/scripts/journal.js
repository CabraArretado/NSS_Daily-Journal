import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"

// Entry Input Object Factory
let entryFactory = (date, concepts, content, mood) => {
    return {
        date,
        concepts,
        content,
        mood
    }
}

// Function to add entry in the JSON server
document.querySelector("#buttonSubmit").addEventListener("click", () => {

    event.preventDefault();
    let date = document.querySelector("#dateForm").value;
    let concepts = document.querySelector("#cenceptsForm").value;
    let content = document.querySelector("#contentForm").value;
    let mood = document.querySelector("#moodForm").value;

    // Garantee that the object has all values
    if (!!date && !!concepts && !!content && !!mood) {

        // POST the object in the JSON-server
        API.post(entryFactory(date, concepts, content, mood))
            .then(data => {

                // render the new data in the Past Entries
                API.get()
                    .then(data => renderJournalEntries(data))
            }
            )
    } else {
        alert("Please compelte the entry in order to submit")
    }
})

// Detele entry
const entryLoga = document.getElementById("entryLog")
entryLoga.addEventListener("click", event => {
    let entryID = event.target.id.split("--")[2]

    // Pop Up Confirm
    if (confirm("The entry will be permanently deleted. Are you sure?")){
        API.deleteEntry(entryID)
        .then(data => {
            API.get()
            .then(data => renderJournalEntries(data))
        })
    }

})


// Render the Database once the Document is fully loaded 
document.addEventListener("DOMContentLoaded", () => {
    API.get()
        .then(data => renderJournalEntries(data))
})

// Search Section
document.getElementById("searchMood").addEventListener("click", () => {
    const valueC = event.target.value
    if (!!valueC) {
        API.get()
            .then(data => {
                renderJournalEntries(data.filter(e => e["mood"] == valueC))
            })
    }
})
