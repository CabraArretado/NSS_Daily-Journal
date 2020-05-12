const API = {

    // POST
    post(objInput) {
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
    },

    // GET
    get() {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },

    //DELETE
    deleteEntry(num) {
        return fetch(`http://localhost:3000/entries/${num}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
// Export the API obj
export default API