const API = {
    // fetch to GET data
    getJournalEntries() {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },

    // Fetch to POST data
    postNewEntry(objInput) {
        return fetch("http://localhost:3000/entries",
            {
                method: "POST",
                body: JSON.stringify(objInput),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response.json())
    }
}


// Export the API obj
export default API