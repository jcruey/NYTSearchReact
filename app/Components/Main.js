// Include React 
var React = require('react');

// Here we include all of the sub-components
var Search = require('./Children/Search');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			startYear: "",
			endYear: "", 
			results: "",
			saved: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setTerm: function(searchTerm, startYear, endYear){
		this.setState({
			searchTerm: searchTerm,
			startYear: startYear,
			endYear: endYear
		})
		// call the function below in the helpers.js file		
		helpers.runQuery(searchTerm, startYear, endYear)
			.then(function(data) {
				// set the state of nytdata to all the data returned from the ny times api so we can map through it and display it to the screen below
				this.setState({results: data});

		// .bind so we have this refering to the object returned
		}.bind(this));
	},

	// // we will call this function form the component did mount and component did update functions below
	// runQueryFromHelpers: function() {
		
	// 	// access helpers.js to use the getArticles function and access the get route defined in server.js
	// 	helpers.runQuery()
	// 		.then(function(response) {

	// 			// set the state of articles with the articles stored in the database
	// 			this.setState({
	// 				articles: response.data
	// 			})
				
	// 	}.bind(this)); // end helpers.getArticles()

	// }, // end getArticlesFromHelpers()

	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(){

				// this is being called whenever a save article button is pressed in the search.js file
		// this.getArticlesFromHelpers();

	}, // end componentDidUpdate()


	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.saved){
					console.log ("Saved", response.data);

					this.setState({
						saved: response.data
					})
				}
			}.bind(this))
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Search</h2>
						<p className="text-center"><em>Enter a search term to find articles written about that topic (ex: "Olympics").</em></p>
					</div>
				</div>

				<div className="row">

					<div className="col-md-12">
					
						<Search setTerm={this.setTerm}/>

					</div>

				</div>

				<div className="row">

					<div className="col-md-12">
				
						<Results results={this.state.results} />

					</div>

				</div>

				<div className="row">

					<Saved saved={this.state.saved}/> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;