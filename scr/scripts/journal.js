

// // Function to push a new entry in the array
// let pushEntry = (entry) => {
//     journalEntries.push(entry)
// }



let entryLog = document.getElementById("entryLog")
const renderJournalEntries = (entryArray) => {
    for (let entry = 0; entry < entryArray.length; entry++) {
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

// API integration
fetch("http://localhost:3000/entries")
    .then(data => data.json())
    .then(data => {
        console.log(data)
        renderJournalEntries(data)
    }     
    )
