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


	// This function posts new searches to our database.
	saveArticle: function(article){

		return axios.post('/api', article)
			.then(function(results){

				console.log("Posted to MongoDB");
				// return(results);
			})
	},

	// get all the articles in the db
	getArticles: function() {
		
		// using axios to access the get route defined in server.js and will return all the articles in our db
		return axios.get('/api')
			.then(function(response) {

				// return response so we have access to it in main.js, which will then set the state and send it to saved.js
				return response;

		}); // end axios.get()

	}, // end getArticles()

	// delete the article from the db
	deleteArticle: function(article_id) {
		
		// use axios to access the api/delete route. Needed to make this one different from the others as I couldn't get .delete to work so needed to use .post to remove from mongodb
		return axios.post('/api/delete/', article_id)
			.then(function(response) {

				return response;

			}); // end axios.post()

	} // end deleteArticle()



};


// We export the helpers function 
module.exports = helpers;