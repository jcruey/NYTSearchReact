// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// NYTimes API
var authKey = "8f2a45ea5128489a94834b44f4c7ec93"

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to searchNYT. 
	runQuery: function(searchTerm, startYear, endYear){

		console.log(searchTerm);

		//Figure out the geolocation

		var authKey = "8f2a45ea5128489a94834b44f4c7ec93"
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm.searchTerm + "&begin_date=" + searchTerm.startYear + "&end_date=" + searchTerm.endYear + "&api-key=" + authKey;
		console.log(queryURL);
		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response.data.results[0].formatted;
		})

	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(location){

		return axios.post('/api', {location: location})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;