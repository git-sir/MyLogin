var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;

var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;

var configFormData = {

	    "name": [
	        {type: "required", msg: "权限名称不能为空"},
	        {type : "maxlength", maxlength : 32, msg : "权限长度不能大于32"}
	    ],
	    "urlAction": [
	        {type: "required", msg: "URL不能为空"},
	        {type : "maxlength", maxlength : 256, msg : "资源URL长度不能大于256"}
	    ],
	    "sn": [
	        {type : "maxlength", maxlength : 36, msg : "判断标识长度不能大于36"}
	    ],
	    "description": [
		        {type : "maxlength", maxlength : 256, msg : "描述长度不能大于256"}
		    ]

	};

module.exports = React.createClass({
    getInitialState:function(){
    	return {
			url: '',
			title: 'layerTitle',
			data:{}
		};
    },
    open: function(title, url, data, successFn) {
		this.setState({
			title: title,
			url: url,
			successFn: successFn,
			data:data
		});
	},


	_validate: function (callback) {
        var validateField = [
            "name", "urlAction", "sn","description"
        ];

		var fn = function (result) {
			if(result) {
				callback();
			}
		};

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },
	
	
	_saveData: function() {
		var me = this;
		

		this._validate(function(){
            _addButtonDisabled('save');
			$.post(me.state.url,  $('#saveForm').serialize(), function(data) {
                _removeButtonDisabled('save');
				if(data.retcode == '0') {
					UcsmyIndex.closeChildrenPage();
					UcsmyIndex.alert("成功", data.retmsg);
					me.state.successFn();
				} else {
					UcsmyIndex.alert("失败", data.retmsg);
				}
			}, "json").error(function(){
                _removeButtonDisabled('save');
				UcsmyIndex.alert("失败", "网络异常");
			});
		});
	},
	_return: function() {
		UcsmyIndex.closeChildrenPage();
	},
    render:function(){
    	return(
			<div>
				<div className="panel">
	                <div className="panel-title fc-red">{this.state.title}</div>
	                <div className="panel-content">
	                
	                
                    <Form ref="saveForm" formData={configFormData} id="saveForm">
	                    <input type="hidden" name="permissionId" value={this.state.data.permissionId}/>
	                    <input type="hidden" name="moduleId" value={this.state.data.moduleId}/>
	                    <FormItem label="权限名称"><Input name="name" value={this.state.data.name}/></FormItem>
	                    <FormItem label="描述"><Input name="description" value={this.state.data.description}/></FormItem>
	                    <FormItem label="判断标识"><Input name="sn" value={this.state.data.sn}/></FormItem>
	                    <FormItem label="资源URL"><Input name="urlAction" value={this.state.data.urlAction}/></FormItem>
                   </Form>
	                
	                </div>
	            </div>
	            <div className="btn-panel">
		            <Button id="save" buttonType="bidnow" onClick={this._saveData}>保存</Button>
		            <Button buttonType="cancel" onClick={this._return}>取消</Button>
		        </div>
	        </div>
		)
    }

});