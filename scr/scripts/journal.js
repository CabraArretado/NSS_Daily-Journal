// Object representing a new entry
const newEntry = {
    date: "string",
    concepts: "string",
    content: "string",
    mood: "string"
}

// Every entry array
let journalEntries = [{
    date: "string",
    concepts: "string",
    content: "string",
    mood: "string"
}];

// Function to push a new entry in the array
let pushEntry = (entry) => {
    journalEntries.push(entry)
}



let entryLog = document.getElementById("entryLog")
const renderJournalEntries = (entryArray) => {
    for (let entry = 0; entry <entryArray.length; entry++) {
        let entryHTML = document.createElement("div")
        entryHTML.classList.add("renderedEntry")
        entryHTML.innerHTML =
            `<h2>Date: ${entryArray[entry].date}</h2>
    <h2>Concepts: ${entryArray[entry].concepts}</h2>
    <h2>Content: ${entryArray[entry].content}</h2>
    <h2>Mood: ${entryArray[entry].mood}</h2>`
        entryLog.appendChild(entryHTML)
    }

}

// Invoke the render function
renderJournalEntries(journalEntries)