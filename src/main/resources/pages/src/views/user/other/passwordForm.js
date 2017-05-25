var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = require('../../widget/other/form');

module.exports = React.createClass({
	_return: function(event) {
		UcsmyIndex.closeChildrenPage();
	},
	init: function(data) {
		this.refs.passwordForm.setValues(data);
	},
	_save: function(event) {
		var me = this;
        _addButtonDisabled('save');
		$.post("user/updateUserPassword", this.refs.passwordForm.getValues(), function(data) {
            _removeButtonDisabled('save');
			if(data.retcode == 0) {
				UcsmyIndex.alert("成功", "密码修改成功");
				me._return();
			} else {
				UcsmyIndex.alert("失败", data.msg);
			}
		}, "json").error(function(xhr, errorText, errorType){
            _removeButtonDisabled('save');
			UcsmyIndex.alert("失败", "网络异常");
	    });
	},
	render: function() {
		return (
			<div>
				<div className="panel">
	                <div className="panel-title fc-red">修改密码</div>
	                <div className="panel-content">
		                <Form config={[{
	                    	panelType: Input,
	                    	hidden: true,
	                    	name: "userId"
	                    }, {
	                    	itemText: "登录名",
	                    	itemClassName: "col-xs-11",
	                    	panelType: Input,
	                    	name: "account",
	                    	disabled: true,
	                    	valueMap: "userAccount.account"
	                    }, {
	                    	itemText: "新密码",
	                    	itemClassName: "col-xs-11",
	                    	panelType: Input,
	                    	name: "password",
	                    	type: "password"
	                    }, {
	                    	itemText: "确认新密码",
	                    	itemClassName: "col-xs-11",
	                    	panelType: Input,
	                    	name: "newPassword",
	                    	type: "password"
	                    }]} ref="passwordForm" />
	                </div>
	            </div>
	            <div className="btn-panel">
		            <Button id="save" buttonType="bidnow" onClick={this._save}>修改密码</Button>
		            <Button buttonType="cancel" onClick={this._return}>取消</Button>
		        </div>
	        </div>
		);
	}
});