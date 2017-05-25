
var Content = React.createClass({
    getInitialState: function(){
		return{
            className: this.props.className ? 'content '+this.props.className : 'content'
		}
    },
	componentDidMount:function () {
    },
	onchange:function (e) {
    },
    onClick: function (e) {

    },
    render:function(){
    	return(
			<div {...this.props} className={this.state.className}>
				{this.props.children}
			</div>
		)
    }
})
module.exports = Content;