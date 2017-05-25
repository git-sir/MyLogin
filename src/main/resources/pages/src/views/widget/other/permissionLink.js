var PermissionLink = React.createClass({
    render : function() {
		if(!this.props.permissionName || myRoles[this.props.permissionName] == true) {
			return (
				<a {...this.props}>{this.props.children}</a>
			);
    	} else {
    		return (
				<a></a>
			);
    	}
    }
});
module.exports = PermissionLink;