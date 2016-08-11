// Include React 
var React = require('react');

// This is the history component. It will be used to show a log of  recent searches.
var Saved = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<div className="col-md-12">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Saved Articles</h3>
				</div>
				<div className="panel-body text-center">

					{/* Here we use a map function to loop through an array in JSX*/}
					{this.props.saved.map(function(search, i)
						{
							return <p key={i}>{search.title}</p> 
						}
					)}
				</div>
			</div>
		</div>

		)
	}
});



// Export the component back for use in other files
module.exports = Saved;