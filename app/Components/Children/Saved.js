// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js')

// This is the history component. It will be used to show a log of  recent searches.
var Saved = React.createClass({

	getInitialState: function() {
		
		return {
			article_delete: ''
		}

	}, // end getInitialState()

	clickHandler: function(event) {
		
		event.preventDefault();

		// set the id of the article to delete to the article_id variable
		var article_id = event.target.parentElement.children[0].id;

		// set the state of the article_id we're deleting
		this.setState({
			article_delete: {
				article_id: article_id
			}
		// callback function so the state can update before we do anyting this that data
		}, function() {
			
			// call the deleteArticle function and pass the article
			helpers.deleteArticle(this.state.article_delete);

			// this needs to be called in the callback or this function will run before deleteArticle and the screen won't remove the most recently deleted article without refreshing or clicking on another article to delete
			// need to call the deleteArticles function in main.js so that the newly deleted article from the database automatically dissapears in the saved section
			this.props.setDeleteArticles(this.state.article_delete);

		});	// end setState()

	}, // end clickHandler()

	render: function() {
		
		return (

			<div className="col-md-12">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Saved Articles</h3>
				</div>
					<div className="panel-body text-center" onClick={this.clickHandler}>
						{/* using map to loop through the array being returned from the db with the articles it holds */}
								{this.props.saved.map(function(search, i) {
									return <p key={i}><a href="" className="btn btn-danger" id={search._id} >Delete</a> <a href={search.url}>{search.Title}</a> <span>{search.pub_date}</span></p>
								})}
				</div>
			</div>
		</div>

		)
	}
});



// Export the component back for use in other files
module.exports = Saved;