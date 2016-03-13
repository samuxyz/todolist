var options = {	
		thumbnailsData : [
		{	
			title : 'Show Coursers',
			number : 123,
			header : 'Learn React',
			description : 'React is a new library',
			imageUrl : 'http://formatjs.io/img/react.svg'
		},
		{
			title : 'Show Coursers',
			number : 25,
			header : 'Learn Gulp',
			description : 'Gulp speeds up your development flow',
			imageUrl : 'https://avatars0.githubusercontent.com/u/6200624?v=3&s=400'
		}
		]
	};
	
	
	//ask react to render this class, instantiate an object
	var element = React.createElement(ThumbnailList, options);
	
	//tell react where to place the class
	ReactDOM.render(element, document.querySelector('.target'));
//define a reach component class
	var Badge = React.createClass({displayName: "Badge",
		render : function(){
			return React.createElement("button", {className: "btn btn-primary", type: "button"}, 
				this.props.title, " ", React.createElement("span", {className: "badge"}, this.props.number)
				)
		}
	});
var ThumbnailList = React.createClass({displayName: "ThumbnailList",
		render : function(){
			var list = this.props.thumbnailsData.map(function(thumbnailProps){
				return React.createElement(Thumbnail, React.__spread({},  thumbnailProps))
			});
			
			return React.createElement("div", null, list)
				
		}
	});
var Thumbnail = React.createClass({displayName: "Thumbnail",
		render : function(){
			return React.createElement("div", {className: "row"}, 
					  React.createElement("div", {className: "col-sm-6"}, 
						React.createElement("div", {className: "thumbnail"}, 
						  React.createElement("img", {src: this.props.imageUrl}), 
						  React.createElement("div", {className: "caption"}, 
							React.createElement("h3", null, this.props.header), 
							React.createElement("p", null, this.props.description), 
							React.createElement("p", null, 
								React.createElement(Badge, {title: this.props.title, number: this.props.number})
							)
						  )
						)
					  )
					)
		}
	});