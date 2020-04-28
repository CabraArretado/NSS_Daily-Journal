

// // Function to push a new entry in the array
// let pushEntry = (entry) => {
//     journalEntries.push(entry)
// }

// Selecting entryLog Article
let entryLog = document.getElementById("entryLog")

// Creating the fragment to be append 
let fragment = document.createDocumentFragment()
const renderJournalEntries = (entryArray) => {
    for (let entry = 0; entry < entryArray.length; entry++) {
        
        // Create parent element
        let parentSection = document.createElement("section")
        parentSection.classList.add("renderedEntry")
        
        // Rendering Date h2 
        let rDate = document.createElement("h2")
        rDate.textContent = entryArray[entry].date
        parentSection.appendChild(rDate)

        // Rendering Concepts h2
        let rConcepts = document.createElement("h2")
        rConcepts.textContent = entryArray[entry].concepts
        parentSection.appendChild(rConcepts)
        
        // Rendering Content h2
        let rContent = document.createElement("h2")
        rContent.textContent = entryArray[entry].content
        parentSection.appendChild(rContent)
        
        // Rendering Content h2
        let rMood = document.createElement("h2")
        rMood.textContent = entryArray[entry].mood
        parentSection.appendChild(rMood)

        // Appending the entry to the fragment to the fragment
        fragment.appendChild(parentSection)
    }
    // Appending the fragment with all the entries in the document
    entryLog.appendChild(fragment)
}


// API integration
fetch("http://localhost:3000/entries")
    .then(data => data.json())
    .then(data => {
        console.log(data)
        renderJournalEntries(data)
    }
    )
