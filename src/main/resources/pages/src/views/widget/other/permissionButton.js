var Button = UcsmyUI.Button;

var PermissionButton = React.createClass({
    render : function() {
		if(!this.props.permissionName || myRoles[this.props.permissionName] == true) {
			return (
				<Button {...this.props}>{this.props.children}</Button>
			);
    	} else {
    		return (
				<span></span>
			);
    	}
    }
});
module.exports = PermissionButton;