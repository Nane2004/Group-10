<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wikidata Query</title>
</head>
<body>

<h2>Data from Wikidata</h2>
<p id="wikidata">Brain Part: <span id="brainPartLabel">Loading...</span></p>
<p>Description: <span id="description">Loading...</span></p>

<script>
// Function to fetch data from Wikidata
async function fetchWikidata() {
    const endpointUrl = "https://query.wikidata.org/sparql";
    
    // SPARQL query to retrieve the label and description of the item Q186033 (hippocampus)
    const sparqlQuery = `
        SELECT ?brainPartLabel ?description
        WHERE {
            wd:Q186033 rdfs:label ?brainPartLabel;
                       schema:description ?description.
            FILTER (lang(?brainPartLabel) = "en")
            FILTER (lang(?description) = "en")
        }
    `;
    
    const fullUrl = endpointUrl + "?query=" + encodeURIComponent(sparqlQuery);
    
    try {
        const response = await fetch(fullUrl, {
            headers: { 'Accept': 'application/sparql-results+json' }
        });
        const data = await response.json();
        
        // Process and display the result
        const result = data.results.bindings[0];
        document.getElementById('brainPartLabel').innerText = result.brainPartLabel.value;
        document.getElementById('description').innerText = result.description.value;
    } catch (error) {
        console.error("Error fetching data from Wikidata:", error);
        document.getElementById('brainPartLabel').innerText = "Failed to load data.";
        document.getElementById('description').innerText = "Failed to load data.";
    }
}

// Call the fetchWikidata function when the page loads
fetchWikidata();
</script>

</body>
</html>
