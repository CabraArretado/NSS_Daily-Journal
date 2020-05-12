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
    let idEdit = document.querySelector("#recipeId").value;

    const objeto = entryFactory(date, concepts, content, mood)

    // Garantee that the object has all values
    if (!!date && !!concepts && !!content && !!mood) {

        // POST the object in the JSON-server
        if(!idEdit){
        API.post(objeto)
            .then(data => {

                // render the updated database
                API.get().then(data => renderJournalEntries(data))
            }
            )
        }

        // Edit the object in the JSON-server
        else {
            // PUT
            API.put(objeto, idEdit)
            .then(a => {
                //Reset the idEdit.value
                idEdit.value = ""

                // render the updated database
                alert("Entry edited sucessfuly!")
                API.get().then(data => renderJournalEntries(data))
            })
        }
    } else {
        alert("Please compelte the entry in order to submit")
    }
})

// Detele / Edit  entry
const entryLoga = document.getElementById("entryLog")
entryLoga.addEventListener("click", event => {
    let idArray = event.target.id.split("--")
    let entryID = idArray[2]

    // DELETE entry
    if (idArray[0] == "delete") {
        // Pop Up Confirm
        if (confirm("The entry will be permanently deleted. Are you sure?")) {
            API.deleteEntry(entryID)
                .then(data => {
                    API.get()
                        .then(data => renderJournalEntries(data))
                })
        }
    }
    // EDIT entry
    else if (idArray[0] == "edit") {
        API.get(entryID)
        .then(data => {
            updateFormFields(data)
        })
    }
})

// Update Form Fields
const updateFormFields = (data = null) => {
    let date = document.querySelector("#dateForm");
    let concepts = document.querySelector("#cenceptsForm");
    let content = document.querySelector("#contentForm");
    let mood = document.querySelector("#moodForm");
    let idEdit = document.querySelector("#recipeId");
    if (!!data) {
        date.value = data["date"]
        concepts.value = data["concepts"]
        content.value = data["content"]
        mood.value = data["mood"]
        idEdit.value = data["id"]
    }
}

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
