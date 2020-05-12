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
    get(id = null) {
        // Without parameter returns all data
        if (!id) {
            return fetch("http://localhost:3000/entries")
                .then(response => response.json())
        }
        // With id as parameter returns specific entry
        else {
            return fetch(`http://localhost:3000/entries/${id}`)
                .then(response => response.json())
        }
    }
    ,

    //DELETE
    deleteEntry(id) {
        return fetch(`http://localhost:3000/entries/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    },

    //PUT
    put(obj, id) {
        return fetch(`http://localhost:3000/entries/${id}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
    }
}
// Export the API obj
export default API