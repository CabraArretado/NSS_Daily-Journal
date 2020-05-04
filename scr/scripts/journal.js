import API from "./data.js"
import renderDOM from "./entriesDOM.js"

// Entry Input Object Factory
let entryFactory = (date, concepts, content, mood) => {
    return {
        date,
        concepts,
        content,
        mood
    }
}

// Selecting entryLog Article
let entryLog = document.getElementById("entryLog")
// Function to add 
document.querySelector("form").preventDefault;
document.querySelector("#buttonSubmit").addEventListener("click", () => {
    event.preventDefault;
    let date = document.querySelector("#dateForm").value;
    let concepts = document.querySelector("#cenceptsForm").value;
    let content = document.querySelector("#contentForm").value;
    let mood = document.querySelector("#moodForm").value;
    if (!!date && !!concepts && !!content && !!mood) {

        // create new obj and post it
        API.postNewEntry(entryFactory(date, concepts, content, mood))
        .then(data => {
            date = ""
            concepts = ""
            content = ""
            mood = "Excited"
            renderDOM.renderJournalEntries(data)
        })
    }
});
