// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js')

// This is the results component
var Results = React.createClass({

	getInitialState: function() {

		return {
			search_topic: '',
			start_year: '',
			end_year: '',
			nytdata: []
		}
		
	}, // end getInitialState()

	changedData: function(event) {
		
		// resetting the state each time the user changes something in any of the inputs by setting the id of the inputs to be the same as the key in the returned state object
		this.setState({[event.target.id]: event.target.value});

	}, // end changedData

	clickHandler: function(event) {
		console.log(event.target);
		// set the state of the article we're saving
		this.setState({
			article: {
				Title: event.target.getAttribute('data-title'),
				pub_date: event.target.getAttribute('data-date'),
				url: event.target.getAttribute('data-url')
			}
		// callback function so the state can update before we do anyting this that data
		}, function() {
			console.log(this.state.article);
			// call the postArticle function and pass the article
			helpers.saveArticle(this.state.article);

			// need to call the setArticles function in main.js so that the newly saved articles to the database automatically show up in the saved section
			// this.props.setArticles({
			// 	article: {
			// 		Title: this.state.article.Title
			// 	}
			// });

		});	// end setState()
	
	}, // end clickHandler()


	// Here we render the function
	render: function(){
		var NYTdata = this.props.results || [];
		
		return(

			<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title text-center">Results</h3>
							</div>
				
							<div className="panel-body" onClick={this.clickHandler}>

								{/* loop through the articles returned and display to screen with a save button */}
								{NYTdata.map(function(article, i) {
									return <p key={i}><a href={article.url}>{article.Title}</a> <span>{article.pubDate}</span><a className="btn btn-primary" data-title={article.Title} data-index={i} data-date={article.pubDate} data-url={article.url}>Save</a></p>

								})}

							</div>
						</div>
					</div>
			</div>

							
						
				
			


		) // end return()

	} // end render()

}); // end Search

// Export the component back for use in other files
module.exports = Results;