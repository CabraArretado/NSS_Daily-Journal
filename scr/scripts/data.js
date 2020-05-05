const API = {

    // Fetch to GET or POST data. Without parameters GET, with a obj and the second parameter POST.
    request(objInput = {}, method = "GET") {
        if (method == "POST") {
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
        } else if (method == "GET") {
            return fetch("http://localhost:3000/entries")
                .then(response => response.json())
        } else {
            console.log(`Method parameter invalid`)
        }
    }
}

// Export the API obj
export default API