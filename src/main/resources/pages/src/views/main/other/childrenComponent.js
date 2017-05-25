
var ChildrenComponent = React.createClass({
	open: function(panel, fn) {
		
	},
	close: function() {
		
	},
	componentDidMount: function() {
		this.props.successFn(this.refs.panel);
	},
	render: function(){
		return (
			<div>
				<this.props.panel ref="panel" />
			</div>   
	    );
	 }
});

module.exports = ChildrenComponent;