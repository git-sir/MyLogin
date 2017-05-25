var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Checkbox = UcsmyUI.Checkbox;
var SelectDropDown = UcsmyUI.SelectDropDown;
var Grid = require('../../widget/other/grid');
var Layer=UcsmyUI.Layer;
var Form = UcsmyUI.Form;

var configFormData = {

	"maxTimes": [
		{type:"maxlength", maxlength:9, msg : "使用次数长度不能超过9"},
		{type: "fn", validator: function(value){
			if(""!=value) {

				var m =/^[1-9]*[1-9][0-9]*$/;

				return m.test(value);
			}else return true;
		}, msg: '使用次数只能为正整数'
		}
	],
	"expiryTime": [
		{type:"maxlength", maxlength:9, msg : "有效时间长度不能超过9"},
		{type: "fn", validator: function(value){
			if(""!=value) {
				var m =/^[1-9]*[1-9][0-9]*$/;

				return m.test(value);
			}else return true;
		}, msg: '有效时间只能为正整数'
		}
	]

};

module.exports = React.createClass({
	getInitialState: function() {
        return{
        	gridUrl: '',
			saveUrl: '',
			title: '',
			sign: '',
			data: {},
			resGroupDisabled: true,
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
//            var map = {};
            var array = [];
            data.data.map(function(returnData) {            	
//            	map[returnData.resGroupUuid] = returnData.groupName;
            	array.push({
                    option: returnData.groupName,
                    value: returnData.resGroupUuid
                });
            });            
            me.setState({
//            	resGroup: map,
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
    init: function(sign, data, successFn) {// sign: bind or unbind
    	var title, gridUrl, saveUrl;
    	if(sign == "bind") {
    		title = "授权资源组";
    		gridUrl = "clientResgrRel/queryUnbindResgrRel?filteringClientId=" + data.clientId;
    		saveUrl = "clientResgrRel/addResgrRel";
    	} else {
    		title = "取消授权资源组";
    		gridUrl = "clientResgrRel/queryResgrRel?clientId=" + data.clientId;
    		saveUrl = "clientResgrRel/deleteResgrRel";
    	}
    	this.setState({
    		gridUrl: gridUrl,
    		saveUrl: saveUrl,
    		title: title,
    		data: data,
    		sign: sign
    	},()=>{
    		this.refs.grid.load();
    	});
    },
//	componentDidUpdate: function() {
//		this.refs.grid.load();
//	},
	_query: function(event) {		
    	this.refs.grid.load({
    		resGroupUuid: this.refs.resGroupUuid.getValue(),
    		searchClientId: this.refs.clientId.getValue()
    	});
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
	_onClick: function(event) {
		var me = this;
		var ids = [];
		var obj = document.getElementsByName("resGroupUuid");
		for(var i = 0; i < obj.length; i++) {
			if(obj[i].checked)
				ids.push(obj[i].value);
		}
		if (ids.length == 0){
			UcsmyIndex.alert("异常消息", "请选择要操作的资源组");
			return;
		}


		if(me.state.sign == "bind") {
			this.refs.layer4.layerOpen();
		}else
		{
			me._bindResour('unBindResour');
		}

	},
	_close: function()
	{
		this.refs.layer4.layerClose();
	},
	_validate: function (callback) {
		var status = false;
		var validateField = [
			"maxTimes", "expiryTime"
		];
		var fn = function (result) {
			if(result) {
				callback();
			}
		};

		this.refs.saveForm.validate(fn, validateField);

		return status;
	},
	_bindResour:function(btnId)
	{

         var me = this;
		var ids = [];
		var obj = document.getElementsByName("resGroupUuid");
		for(var i = 0; i < obj.length; i++) {
			if(obj[i].checked)
				ids.push(obj[i].value);
		}


		this._validate(function(){
			_addButtonDisabled(btnId);
			var maxTimes = me.refs.maxTimes.state.value;
			var expiryTime = me.refs.expiryTime.state.value;
			var d;
			if(me.state.sign == "bind") {
				d = {"clientId": me.state.data.clientId, "resGroupUuid": ids.join(",")};
				if(maxTimes!=null && maxTimes!='')
					d["maxTimes"]=maxTimes;
				if(expiryTime!=null && expiryTime!='')
					d["expiryTime"]=expiryTime;
			} else {
				d = {"uuid": ids.join(",")};
			}

			$.post(me.state.saveUrl, d, function(data){
				_removeButtonDisabled(btnId);
				if(data.retcode == "0"){
					UcsmyIndex.alert("成功", data.retmsg);
					me._return();
				} else{
					UcsmyIndex.alert("失败", data.retmsg);
				}
				me._close();
			}, "json").error(function(xhr, errorText, errorType){
				_removeButtonDisabled(btnId);
				UcsmyIndex.alert("失败", "网络异常");
				me._close();
			});
		});


{/*		UcsmyIndex.confirm("确定", "是否确定操作选中的资源组？", function(){
			 $.post(me.state.saveUrl, d, function(data){
			 if(data.retcode == "0"){
			      UcsmyIndex.alert("成功", data.retmsg);
			      me._return();
			 } else{
			     UcsmyIndex.alert("失败", data.retmsg);
			 }
			 }, "json").error(function(xhr, errorText, errorType){
			     UcsmyIndex.alert("失败", "网络异常");
			 });
		 });*/}
	},
	render: function() {
		return (					
			<div>
			<Form ref="saveForm" formData={configFormData} id="saveForm">
               <Layer ref="layer4" title="设置属性" width= "450">
                  <div className="ucs-form-group">
			        <FormItem label="最大调用次数"><Input name="maxTimes" ref="maxTimes" placeholder="默认为空"/>次</FormItem>
			     </div>
			    <div className="ucs-form-group">
			       <FormItem label="有效时间"><Input name="expiryTime" ref="expiryTime" placeholder="默认36000"/>秒</FormItem>
			    </div>
				<div className="ucs-layer-footer">
			         <Button id="bindResour" buttonType="bidnow" onClick={this._bindResour.bind(this,'bindResour')}>确定</Button>
		             <Button buttonType="bidnow" onClick={this._close}>取消</Button>
			    </div>
			   </Layer>
             </Form>
	            <div className="panel">
	                <div className="panel-title">查询条件</div>
	                <div className="panel-content">
		                <FormItem label="应用简称">
		                	<SelectDropDown ref="clientId" defaultText="全部" defaultValue="" option={this.state.clientArray} onChange={this._changeClient} />
		                </FormItem>
	                    <FormItem label="资源组">
	                    	<SelectDropDown ref="resGroupUuid" defaultText="全部" defaultValue="" option={this.state.resGroupArray} disabled={this.state.resGroupDisabled} />
	                    </FormItem>
	                </div>
	            </div>
	            
	            <div className="panel">
		            <div className="panel-content">
			            <div className="ucs-form-group">
							<span>{this.state.sign == "bind" ? "被授权应用ID：" : "被取消授权应用ID："}</span>
							<span>{this.state.data.clientId}</span>
						</div>
			            <div className="ucs-form-group">
							<span>{this.state.sign == "bind" ? "被授权应用简称：" : "被取消授权应用简称："}</span>
							<span>{this.state.data.clientName}</span>
						</div>
		            </div>
	            </div>
	            
	            <div className="btn-panel">
	            <Button buttonType="bidnow" onClick={this._query}>查询</Button>
	                <Button id="unBindResour"  buttonType="bidnow" onClick={this._onClick}>{this.state.title}</Button>
	                <Button buttonType="cancel" onClick={this._return}>返回</Button>
	            </div>
				<div className="table-panel">
		            <Grid
		            	url={this.state.gridUrl} ref="grid"
		                columns={[ {
							 name:'clientId',
							 header: "",
							 content: function(column) {
								 return (
									 <Checkbox value={this.state.sign == "bind" ? column.resGroupUuid : column.uuid} name="resGroupUuid" eventId={this.state.eventId} />
								 );
							 }.bind(this)
						}, {
      						name: 'clientName', header: '应用简称'
      					},{
      						name: 'groupName', header: '资源组'
      					}, {
      						name: 'descRibe', header: '资源组描述'
      					}
		               ]}
		            />
		            <div className="clearfix"></div>
		        </div>
			</div>
		);
	}
});