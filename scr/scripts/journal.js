import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"


/* +++++++++++++++++++++++++ Event listener funcitons ++++++++++++++++++++++++++++++++++++++ */

// Render the Database once the Document is fully loaded 
document.addEventListener("DOMContentLoaded", () => {
    renderUpTodate()
})


// Function to add entry in the JSON server
document.querySelector("#buttonSubmit").addEventListener("click", () => {
    
    event.preventDefault();
    let date = document.querySelector("#dateForm").value;
    let concepts = document.querySelector("#cenceptsForm").value;
    let content = document.querySelector("#contentForm").value;
    let mood = document.querySelector("#moodForm").value;
    let idEdit = document.querySelector("#recipeId"); // Not .value, but the element itself
    
    const objeto = entryFactory(date, concepts, content, mood)
    
    // Garantee that the object has all values
    if (!!date && !!concepts && !!content && !!mood) {
        
        // POST the object in the JSON-server
        if(!idEdit.value){
            API.post(objeto)
            .then(data => renderUpTodate())
        }
        
        // Edit the object in the JSON-server
        else {
            // PUT
            API.put(objeto, idEdit.value)
            .then(a => {
                //Reset the idEdit.value
                idEdit.value = ""
                
                // render the updated database
                alert("Entry edited sucessfuly!")
                renderUpTodate()
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
            .then(data => renderUpTodate())
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


// Search Section by mood
document.getElementById("searchMood").addEventListener("click", () => {
    const valueC = event.target.value
    if (!!valueC) {
        API.get()
        .then(data => {
            renderJournalEntries(data.filter(e => e["mood"] == valueC))
        })
    }
})

//  Search Section by word
document.getElementById("searchText").addEventListener("keydown", (event) => {
    let input = document.getElementById("searchText").value;
    API.search(input)
    .then(data => renderJournalEntries(data))
})


/* +++++++++++++++++++++++++ END Event listener funcitons ++++++++++++++++++++++++++++++++++++++ */

/* +++++++++++++++++++++++++ START Acessory funcitons ++++++++++++++++++++++++++++++++++++++ */

// get and render up to date database function
let renderUpTodate = async () => {
    let gotData = await API.get()
    renderJournalEntries(gotData)
}

// Update/Clean Form Fields
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
    else {
        date.value = ""
        concepts.value = ""
        content.value = ""
        mood.value = ""
        idEdit.value = ""
    }
}

// Entry Object Factory
let entryFactory = (date, concepts, content, mood) => {
    return {
        date,
        concepts,
        content,
        mood
    }
}

/* +++++++++++++++++++++++++ END Acessory funcitons ++++++++++++++++++++++++++++++++++++++ */

