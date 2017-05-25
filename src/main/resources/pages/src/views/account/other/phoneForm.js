var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;


var configFormData = {

	"mobileAccount": [
		{type: "required", msg: "手机帐号号不能为空"},
		{type: "mobile", msg: "手机号码不对"}
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
			"mobileAccount"
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
			$.post("account/upPhone",
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
			title: '手机帐号修改',
			ucasAccount: data,
			callback: callback
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
		<FormItem label="旧手机帐号"><Input  disabled="true" value={this.state.ucasAccount.mobileAccount}/></FormItem>
		<FormItem label="新手机帐号"><Input name="mobileAccount"  /></FormItem>
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