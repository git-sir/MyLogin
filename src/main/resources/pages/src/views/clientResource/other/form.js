var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;
var SelectDropDown = UcsmyUI.SelectDropDown;

var resourceFormData = {
    "resGroupUuid": [
        {type: "required", msg: "资源组不能为空"}
    ],
    "descRibe": [
        {type: "required", msg: "资源描述不能为空"},
        {type : "maxlength", maxlength : 200, msg : "资源描述长度不能超过200"}
    ],
    "resUri": [
        {type: "required", msg: "资源URI不能为空"},
        {type : "maxlength", maxlength : 200, msg : "资源URI长度不能超过200"}
    ]
};

var commonDropDown = [
	{value: "0",option: "否"},
	{value: "1",option: "是"}
];

//var statusDropDown = [
//	{value: "0",option: "正常"},
//	{value: "1",option: "停用"},
//	{value: "2",option: "删除"}
//];

module.exports = React.createClass({
	getInitialState: function(){
		return {
			url: '',
			title: 'title',
			successFn: function() {},
			resGroupDisabled: true,
            clientResource: {},
            resGroupArray: [],
            resGroupObj: [],
            clientArray: []
		}
	},
	componentDidMount: function() {
        var me = this;
        $.post("resourceGroup/queryAllResourceGroup", {}, function(data) {        	
            if(data.retcode != 0) {
                return;
            }            
            var array = [];
            data.data.map(function(returnData) {
                array.push({
                    option: returnData.groupName,
                    value: returnData.resGroupUuid
                });
            });
            me.setState({
            	resGroupArray: array,
            	resGroupObj: data.data
            });
        }, "json").error(function(xhr, errorText, errorType){
        });
        
        $.post("client_info/query", {pageNum:1,pageSize:99999}, function(data) {        	
            if(data.retcode != 0) {
                return;
            }            
            
            var array = [];
            data.data.resultList.map(function(returnData) {
            	array.push({
                    option: returnData.clientName,
                    value: returnData.clientId
                });
            });            
            me.setState({
            	clientArray: array
            });
        }, "json").error(function(xhr, errorText, errorType){
        });
    },
	_validate: function (callback) {
        var status = false;
        var validateField = [
            "resGroupUuid",
            "descRibe",
            "resUri"
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
            clientResource: data
		});
		//this.refs.saveForm.setValues(data);
	},
	_changeClient: function(event) {    	
    	var array = [];
    	
    	$.each(this.state.resGroupObj,function(){    		
    		if(event == "" || this.clientId == event){
    			array.push({
    				option: this.groupName,
                    value: this.resGroupUuid
    			});
    		}	
    	});
    	this.setState({
    		resGroupArray: array,
    		resGroupDisabled: array.length == 0 ? true : false
    	});
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
                        <Form id="form" ref="saveForm" formData={resourceFormData}>
                            <input type="hidden" name="resUuid" value={this.state.clientResource.resUuid} />
                            <input type="hidden" name="status" value={this.state.clientResource.status} />
                            <FormItem label="应用简称">
			                	<SelectDropDown ref="clientId" defaultText="全部" defaultValue="" value={this.state.clientResource.clientId} option={this.state.clientArray} onChange={this._changeClient} />
			                </FormItem>
                            <FormItem label="资源组">
                            	<SelectDropDown name="resGroupUuid" defaultText="全部" defaultValue="" value={this.state.clientResource.resGroupUuid} option={this.state.resGroupArray} disabled={this.state.resGroupDisabled} />
                            </FormItem>
                            <FormItem label="资源描述"><Input name="descRibe" value={this.state.clientResource.descRibe}/></FormItem>
                            <FormItem label="资源URI"><Input name="resUri" value={this.state.clientResource.resUri} /></FormItem>
                            <FormItem label="涉及用户隐私">
                            	<SelectDropDown name="isPrivacy" value={this.state.clientResource.isPrivacy} option={commonDropDown} />
                            </FormItem>
                            <FormItem label="资源组必须授权">
                            	<SelectDropDown name="isDefault" value={this.state.clientResource.isDefault} option={commonDropDown} />
                            </FormItem>
                            {/*<FormItem label="资源状态">
                            	<SelectDropDown name="status" value={this.state.clientResource.status} option={statusDropDown} />                            
                            </FormItem>*/}
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