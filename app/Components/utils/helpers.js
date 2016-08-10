// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// NYTimes API
var authKey = "8f2a45ea5128489a94834b44f4c7ec93"

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to searchNYT. 
	runQuery: function(searchTerm, startYear, endYear){

		//Figure out the geolocation

		var authKey = "8f2a45ea5128489a94834b44f4c7ec93"
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm.searchTerm + "&begin_date=" + searchTerm.startYear + "&end_date=" + searchTerm.endYear + "&api-key=" + authKey;
		console.log(queryURL);
		return new Promise(function(resolve, reject) {

			axios.get(queryURL)
			.then(function(response){
				console.log(response);
				var results =[];
				for (var i = 0; i < response.data.response.docs.length; i++) {
					results.push({
						Title: response.data.response.docs[i].headline.main, 
						pubDate: response.data.response.docs[i].pub_date, 
						url: response.data.response.docs[i].web_url
					})
				}
					if (results.length != 0) {
						console.log(results);
						resolve(results);
					} else {
						reject(Error("error"));
					}
			});

				
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
	postHistory: function(data){

		return axios.post('/api', {results})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}


};


// We export the helpers function 
module.exports = helpers;