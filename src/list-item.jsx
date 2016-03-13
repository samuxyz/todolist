var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://resplendent-torch-3414.firebaseio.com/';
module.exports = React.createClass({
	getInitialState: function(){
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChange: false
		}	
	},
	componentWillMount: function(){
		this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
	},
	render : function(){
		console.log(this.props.item);
		return <div className="input-group">
			<span className="input-group-addon">
				<input 
					onChange={this.handleDoneChange}
					checked={this.state.done}
					type="checkbox" 
				/>
			</span>
			<input
				type="text"
				onChange={this.handleTextChange}
				disabled={this.state.done}
				className="form-control"
				value={this.state.text} // set to state to have controlled form component
			/>
			
			<span className="input-group-btn">
				{this.changeButtons()}
				<button 
					className="btn btn-default"
					onClick={this.handleDeleteClick}
				>
					Delete
				</button>
			</span>
		</div>
	},
	changeButtons: function(){
		if(!this.state.textChanged){
			return null
		}else{
			return [
					<button 
						className="btn btn-default"
						onClick={this.handleSaveClick}
					>Save</button>,
					<button 
						className="btn btn-default"
						onClick={this.handleUndoClick}
					>Undo</button>
			]			
		}
	},
	handleDoneChange: function(event){
		var update = {done: event.target.checked}
		this.setState(update);
		this.fb.update(update);
	},
	handleDeleteClick: function(){
		this.fb.remove(); 
	},
	handleTextChange: function(event){
		this.setState({
			text: event.target.value,
			textChanged: true
		});
	},
	handleUndoClick: function(){
		this.setState({
			text : this.props.item.text,
			textChanged : false
		});
	},
	handleSaveClick: function(){
		this.fb.update({text : this.state.text});
		this.setState({textChanged : false});
	}

});