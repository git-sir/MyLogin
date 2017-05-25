var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;

var roleFormData = {

    "name": [
        {type: "required", msg: "角色名不能为空"},
        {type : "maxlength", maxlength : 36, msg : "参数名称长度不能超过36"}
    ],
    "description": [
        {type: "required", msg: "描述不能为空"},
        {type : "maxlength", maxlength : 255, msg : "参数值长度不能超过255"}
    ]

};

module.exports = React.createClass({
	getInitialState: function(){
		return {
			url: '',
			title: 'title',
			successFn: function() {},
            role: {}
		}
	},
	_validate: function (callback) {
        var status = false;
        var validateField = [
            "name", "description"
        ];
		var fn = function (result) {
			if(result) {
				callback();
			}
		};

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },
	init: function(title, url, data, successFn) {
		this.setState({
			title: title,
			url: url,
			successFn: successFn,
            role: data
		});
		//this.refs.saveForm.setValues(data);
	},
	_return: function(event) {
		UcsmyIndex.closeChildrenPage();
	},
	_save: function(event) {

		var me = this;
		this._validate(function(){
            _addButtonDisabled('save');
			$.post(me.state.url,
				$('#form').serialize(),
				function(data) {
				_removeButtonDisabled('save');
				if(data.retcode == "0") {
					UcsmyIndex.alert("成功", data.retmsg);
					me.state.successFn();
					me._return();
				} else {
					UcsmyIndex.alert("失败", data.retmsg);
				}
			}, "json").error(function(xhr, errorText, errorType){
                _removeButtonDisabled('save');
				UcsmyIndex.alert("失败", "网络异常");
			});
		});
	},
	render: function() {
		return (
			<div>
				<div className="panel">
	                <div className="panel-title fc-red">{this.state.title}</div>
	                <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={roleFormData}>
                            <input type="hidden" name="roleId" value={this.state.role.roleId} />
                            <FormItem label="角色名"><Input name="name" value={this.state.role.name}/></FormItem>
                            <FormItem label="描述"><Input name="description" value={this.state.role.description} /></FormItem>
                        </Form>
	                </div>
	            </div>
	            <div className="btn-panel">
		            <Button id="save" buttonType="bidnow" onClick={this._save}>保存</Button>
		            <Button buttonType="cancel" onClick={this._return}>取消</Button>
		        </div>
	        </div>
		);
	}
});