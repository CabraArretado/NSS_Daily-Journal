import API from "./data.js"
import "./entriesDOM.js"
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

// Selecting entryLog Article
let entryLog = document.getElementById("entryLog")
// Function to add 
document.querySelector("#buttonSubmit").addEventListener("click", () => {
    event.preventDefault();
    let date = document.querySelector("#dateForm").value;
    let concepts = document.querySelector("#cenceptsForm").value;
    let content = document.querySelector("#contentForm").value;
    let mood = document.querySelector("#moodForm").value;

    // console.log(!!date, !!concepts, !!content, !!mood)

    // Garantee that the object has all values
    if (!!date && !!concepts && !!content && !!mood){
        API.postNewEntry(entryFactory(date, concepts, content, mood))
        .then(data => {
        console.log(data)
        date = ""
        concepts = ''
        content = ""
        mood = ""
        API.getJournalEntries()
        .then(data => renderJournalEntries(data))
        }
        )
    } else {
        alert("Please compelte the entry in order to submit")
    }

});
