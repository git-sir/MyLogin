var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;

var configFormData = {

	    "name": [
	        {type: "required", msg: "菜单名称不能为空"},
	        {type : "maxlength", maxlength : 32, msg : "菜单名称长度不能大于32"}
	    ],
		"url": [
			{type : "maxlength", maxlength : 245, msg : "响应地址长度不能大于245"}
		],
	    "priority": [
	        {type: "required", msg: "优先级不能为空"},
	        {type: "fn", validator: function(value){
                var m = /^\d+$/;
                return m.test(value);
	        }, msg: '优先级必须为大于等于0的整数'
	        },
            {type : "maxlength", maxlength : 9, msg : "优先级长度不能大于9"}
	    ],
	    "description": [
		        {type : "maxlength", maxlength : 256, msg : "描述长度不能大于256"}
		    ],
	   "image": [
		{type : "maxlength", maxlength : 64, msg : "图标长度不能大于64"}
	]

	};

module.exports = React.createClass({
    getInitialState: function() {
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
            "name", "url", "priority","description","image"
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
			$.post(me.state.url, $('#saveForm').serialize(), function(data) {
                _removeButtonDisabled('save');
				if(data.retcode=='0') {
					UcsmyIndex.alert("成功", data.retmsg);
					me.state.successFn();
					me._return();
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
                    <input type="hidden" name="id" value={this.state.data.id}/>
                    <input type="hidden" name="parentId" value={this.state.data.parentId}/>
                    <FormItem label="菜单名称"><Input name="name" value={this.state.data.name}/></FormItem>
                    <FormItem label="描述"><Input name="description" value={this.state.data.description}/></FormItem>
                    <FormItem label="优先级"><Input name="priority" value={this.state.data.priority}/></FormItem>
                    <FormItem label="响应地址"><Input name="url" value={this.state.data.url}/></FormItem>
		           <FormItem label="指定图标"><Input name="image" value={this.state.data.image}/></FormItem>
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