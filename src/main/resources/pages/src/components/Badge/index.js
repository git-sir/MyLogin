
var Badge = React.createClass({
	getDefaultProps:function (){
		return {
			count:"",
			id:"",
			name:""
		}	
	},
	render:function (){
		return (
			<span id={this.props.id} name={this.props.name} className="ucs-badge">
				<sup className="ucs-badge-number" ref="ucsBadgeNumber">{this.props.count}</sup>
			</span>
			)		
	},
	componentDidMount:function(){
 		this.props.count==""?(this.refs.ucsBadgeNumber.className=this.refs.ucsBadgeNumber.className+" ucs-badge-dot"):null;
	}
});

module.exports = Badge;



