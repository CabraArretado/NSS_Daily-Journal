
// Render Journal Entries function
const renderJournalEntries = (entryArray) => {

    // Selecting entryLog Article
    let entryLog = document.getElementById("entryLog")

    // Cleaning entryLog
    entryLog.textContent = ""

    // Creating the fragment to be append 
    let fragment = document.createDocumentFragment()

    for (let entry in entryArray) {

        // Create parent element
        let parentSection = document.createElement("section")
        parentSection.classList.add("renderedEntry", "card", "m-2")

        // Rendering Date h2 
        let rDate = document.createElement("h7")
        rDate.textContent = entryArray[entry].date
        rDate.classList.add("card-header")
        parentSection.appendChild(rDate)

        // Create card body
        let divBody = document.createElement("div")
        divBody.classList.add("card-body")

        // Rendering Concepts h2
        let rConcepts = document.createElement("h5")
        rConcepts.textContent = entryArray[entry].concepts
        rConcepts.classList.add("mb-2", "card-title")
        divBody.appendChild(rConcepts)

        // Rendering Content h2
        let rContent = document.createElement("p")
        rContent.textContent = entryArray[entry].content
        rContent.classList.add("card-text")
        divBody.appendChild(rContent)

        // Rendering Mood h2
        let rMood = document.createElement("p")
        rMood.classList.add("oo")
        if (entryArray[entry].mood == "Excited") {rMood.textContent = "😁 " + entryArray[entry].mood}
        if (entryArray[entry].mood == "Blue") {rMood.textContent = "🤨 " + entryArray[entry].mood}
        if (entryArray[entry].mood == "Tired") {rMood.textContent = "😣 " + entryArray[entry].mood}
        divBody.appendChild(rMood)

        // Appending the entry to the fragment to the fragment
        parentSection.appendChild(divBody)
        fragment.appendChild(parentSection)
    }
    // Appending the fragment with all the entries in the document
    entryLog.appendChild(fragment)
}

// Export
export default renderJournalEntries