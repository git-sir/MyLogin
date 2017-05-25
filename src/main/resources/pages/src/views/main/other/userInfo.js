var Form = require('../../widget/other/form');

var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
module.exports = React.createClass({
	_update: function() {
        _addButtonDisabled('save');
		$.post("user/updateUserPassword", this.refs.passwordForm.getValues(), function(data) {
            _removeButtonDisabled('save');
			if(data.retcode == 0) {
				UcsmyIndex.alert("更新成功", data.msg);
			} else {
				UcsmyIndex.alert("失败", data.msg);
			}
		}, "json").error(function() {
            _removeButtonDisabled('save');
			UcsmyIndex.alert("失败", "网络异常");
	    });
	},
	render: function(){
		return (
			<div>
				<div className="panel">
					<div className="panel-title fc-red">个人信息</div>
					<div className="panel-content">
						<FormItem label="登录帐号：" className="col-xs-11">
			            	<span>{myUser.userName}</span>
			            </FormItem>
			            <FormItem label="用户姓名：" className="col-xs-11">
			            	<span>{myUser.name}</span>
			            </FormItem>
			            <FormItem label="联系方式：" className="col-xs-11">
			            	<span>{myUser.mobilephone}</span>
			            </FormItem>
			            <FormItem label="电子邮箱：" className="col-xs-11">
			            	<span>{myUser.email}</span>
			            </FormItem>
					</div>
				</div>
				<div className="panel">
					<div className="panel-title fc-red">密码修改</div>
					<div className="panel-content">
						<Form data={{userId: myUser.userId}}  config={[{
		                	itemText: "原密码",
		                	itemClassName: "col-xs-11",
		                	panelType: Input,
		                	name: "oldPassword",
		                	type: "password"
		                }, {
							itemText: "用户名",
		                	itemClassName: "col-xs-11",
		                	panelType: Input,
		                	name: "userId",
							hidden:true
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
		            <Button id="save" buttonType="bidnow" onClick={this._update}>修改密码</Button>
		        </div>
			</div>
	    );
	 }
});