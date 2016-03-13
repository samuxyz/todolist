var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://resplendent-torch-3414.firebaseio.com/';
var Header = require('./header.jsx');
var List = require('./list.jsx');

var Hello = React.createClass({
	mixins: [ReactFire], //copy methods of an object to another
	getInitialState: function(){
		return {
			items : {},
			loaded: false
		}
	},
	componentWillMount : function(){
		this.fb = new Firebase(rootUrl + 'items/');
		//URL to search for
		//bindAsObject is a reactFire method
		this.bindAsObject(this.fb, 'items'); //this.state.items = {}
		this.fb.on('value', this.handleDataLoaded);
	},
	render : function(){
		console.log(this.state);
		return <div className="row panel panel-default">
			<div className="col-md-8 md-offset-2">
				<h2 className="text-center">To-Do List</h2>
				<Header itemsStore={this.firebaseRefs.items} />
				<hr />
				<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
					<List items={this.state.items}/>
					{this.deleteButton()}
				</div>
			</div>
		</div>
	},
	handleDataLoaded : function(){
		this.setState({loaded : true});
	},
	deleteButton : function(){
		if(!this.state.loaded){
			return 
		}else{
			return <div className="text-center clear-complete">
				<hr />
				<button
					type="button"
					onClick={this.onDeleteDoneClick}
					className="btn btn-default"
				>
					Clear Complete
				</button>
			</div>
		}
	},
	onDeleteDoneClick : function(){
		for(var key in this.state.items){
			if(this.state.items[key].done === true){
				this.fb.child(key).remove();
			}
		}
	}
});
	
//ask react to render this class, instantiate an object
var element = React.createElement(Hello, {});

//tell react where to place the class
ReactDOM.render(element, document.querySelector('.target'));