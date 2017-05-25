var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;


var configFormData = {

	"emailAccount": [
		{type: "required", msg: "邮箱帐号不能为空"},
		{type: "mail", msg: "邮箱地址不对"}
	]

};

module.exports = React.createClass({
	getInitialState: function () {
		return {
			title: '',
			callback: function(){},
			ucasAccount: {}
		}
	},
	_validate: function (callback) {
		var status = false;
		var validateField = [
			"emailAccount"
		];
		var fn = function (result) {
			if(result) {
				callback();
			}
		};

		this.refs.saveForm.validate(fn, validateField);

		return status;
	},
	_saveOrUpdate: function () {

		var me = this;
		this._validate(function(){
			_addButtonDisabled('save');
			$.post("account/upEmail",
				$('#saveForm').serialize(),
				function (result) {
					if (result && result.retcode && result.retcode === "0") {
						UcsmyIndex.alert("提示", result.retmsg);
						UcsmyIndex.closeChildrenPage();
						me.state.callback();
					} else {
						UcsmyIndex.alert("提示",result.retmsg);
					}
					_removeButtonDisabled('save');
				}).error(function(){
				UcsmyIndex.alert("失败", "网络异常");
				_removeButtonDisabled('save');
			});
		});
	},
	init: function (data,callback) {

		this.setState({
			title: '邮箱账号修改',
			ucasAccount: data,
			callback: callback,
		});

	},
	_return: function () {
		UcsmyIndex.closeChildrenPage();
	},
	render: function () {
		return (
			<div>
			<div className="panel">
			<div className="panel-title fc-red">{this.state.title}</div>
				<div className="ucs-form-group">
					<span className="label">网金帐号：</span>
					<span>{this.state.ucasAccount.ucasAccount}</span>
				</div>
		<div className="panel-content">
			<Form ref="saveForm" formData={configFormData} id="saveForm">
			<input type="hidden" name="ucasAccount" value={this.state.ucasAccount.ucasAccount}/>
		<FormItem label="旧邮箱帐号"><Input  disabled="true" value={this.state.ucasAccount.emailAccount}/></FormItem>
		<FormItem label="新邮箱帐号"><Input name="emailAccount"  /></FormItem>
		</Form>
		</div>
		</div>
		<div className="btn-panel">
			<Button buttonType="bidnow" id="save" onClick={this._saveOrUpdate}>保存</Button>
		<Button buttonType="cancel" onClick={this._return}>取消</Button>
		</div>
		</div>
		)
	}
});