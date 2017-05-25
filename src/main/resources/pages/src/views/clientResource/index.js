var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var SelectDropDown = UcsmyUI.SelectDropDown;
var Grid = require('../widget/other/grid');
var Form = require('./other/form');
var ShowView = require('./other/show');
var PermissionLink = require('../widget/other/permissionLink');

//var statusArray = [
//	{value:"0",option:"正常"},
//	{value:"1",option:"停用"}
//];

myPanel = React.createClass({
	getInitialState: function() {
        return {            
//            resGroup: {},
        	resGroupDisabled: true,
            resGroupArray: [],
            resGroupObj: [],
            clientArray: [],
            clientRepo: []
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
//            	resGroup: map,
            	resGroupArray: array,
            	resGroupObj: data.data
            });
        }, "json").error(function(){
			UcsmyIndex.alert("失败", "网络异常");
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
            	clientArray: array,
            	clientRepo: array
            });
        }, "json").error(function(){
			UcsmyIndex.alert("失败", "网络异常");
        });
    },
	/*_changeGroup: function(event) {		
    	this.refs.grid.load({
    		status: this.refs.status.getValue(),
    		resGroupUuid: event
    	});
    },
    _changeStatus: function(event) {		
    	this.refs.grid.load({
    		status: event,
    		resGroupUuid: this.refs.resGroupUuid.getValue()
    	});
    },*/
    _query: function() {
    	this.refs.grid.load({
//    		status: this.refs.status.getValue(),
    		resGroupUuid: this.refs.resGroupUuid.getValue(),
    		clientId: this.refs.clientId.getValue()
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
    _searchChangeClient: function(event) {    	
    	var array = [];
    	var value = event.target.value
    	
    	if(value == ""){
    		array = this.state.clientRepo;
    	}else{	
	    	$.each(this.state.clientRepo,function(){
	    		if(this.option.indexOf(value) != -1){
	    			array.push(this);
	    		}	
	    	});
    	}
    	this.setState({
    		clientArray: array
    	});
    },
    _add: function() {
    	var me = this;
    	UcsmyIndex.openChildrenPage(Form, function(refPanel) {
    		refPanel.init('新增资源', 'clientResource/addResource', {}, function(){
    			me.refs.grid.load();
    		});
    	});
    },
    _updateClick: function(column) {
    	var me = this;
    	UcsmyIndex.openChildrenPage(Form, function(refPanel) {
    		refPanel.init('修改资源', 'clientResource/editResource', column, function(){
    			me.refs.grid.load();
    		});
    	});
	},
	_showClick: function(column) {
    	var me = this;
    	UcsmyIndex.openChildrenPage(ShowView, function(refPanel) {
    		refPanel.init('查看资源', 'clientResource/showResource', column, function(){
    			me.refs.grid.load();
    		});
    	});
	},
	_deleteClick: function(column) {
		var me = this;
		UcsmyIndex.confirm("确定", "是否确定删除该资源？", function() {
			$.post("clientResource/deleteResource", {"resUuid":column.resUuid}, function(data) {
				if(data.retcode == "0") {
					UcsmyIndex.alert("成功", data.retmsg);
					me.refs.grid.load();
				} else {
					UcsmyIndex.alert("失败", data.retmsg);
				}
			}, "json").error(function(){
				UcsmyIndex.alert("失败", "网络异常");
		    });
		});
	},
	_unbindClick:function(column){		
    	UcsmyIndex.openChildrenPage(RoleUser, function(refPanel) {
    		refPanel.init("unbind", column);
    	});	
	},
	_bindClick: function(column) {
    	UcsmyIndex.openChildrenPage(RoleUser, function(refPanel) {
    		refPanel.init("bind", column);
    	});		
	},
	_bindPermClick: function(column){
    	UcsmyIndex.openChildrenPage(BindPermissionPanel, function(refPanel) {
    		refPanel.load(column.roleId,column.name);
    	});
	},
	render:function() {
		var me = this;
		return (				
			<div>
				<h2 className="content-title">应用资源管理</h2>
	            <div className="panel">
	                <div className="panel-title">查询条件</div>
	                <div className="panel-content">
		                <FormItem label="应用简称">
		                	<SelectDropDown type="search" ref="clientId" defaultText="全部" defaultValue="" option={this.state.clientArray} onChange={this._changeClient} searchChange={this._searchChangeClient} />
		                </FormItem>
	                    <FormItem label="资源组">
	                    	<SelectDropDown ref="resGroupUuid" defaultText="全部" defaultValue="" option={this.state.resGroupArray} disabled={this.state.resGroupDisabled} />
	                    </FormItem>
	                    {/*<FormItem label="资源状态">
	                    	<SelectDropDown ref="status" defaultText="全部" defaultValue="" option={statusArray} />
	                    </FormItem>*/}	
	                </div>
	            </div>
	            <div className="btn-panel">
	                <Button buttonType="bidnow" onClick={this._query}>查询</Button>
	                <Button buttonType="bidnow" onClick={this._add}>新增</Button>
	            </div>
				<div className="table-panel">
		            <Grid url="clientResource/queryResource" ref = "grid" isTextOverflowHidden={true}
		                columns={[ {
          						name:'groupName', header: '资源组'
          					}, {
          						name: 'descRibe', header: '资源描述',width: 250
          					}, {
          						name: 'resUri', header: '资源URI',width: 250
          					}/*, {
          						name: 'isPrivacy', header: '涉及用户隐私', content: function (item) {
                                    var statusText = '否';
                                    if (item.isPrivacy == 1) {
                                        statusText = '是';
                                    }
                                    return (
                                        <span>
                                            {statusText}
                                        </span>
                                    )
          						}
          					}, {
          						name: 'isDefault', header: '资源组必须授权', content: function (item) {
                                    var statusText = '否';
                                    if (item.isDefault == 1) {
                                        statusText = '是';
                                    }
                                    return (
                                        <span>
                                            {statusText}
                                        </span>
                                    )
          						}
          					}, {
          						name: 'status', header: '资源状态', content: function (item) {
                                    var statusText = '正常';
                                    if (item.status == 1) {
                                        statusText = '停用';
                                    }else if (item.status == 2) {
                                        statusText = '已删除';
                                    }
                                    return (
                                        <span>
                                            {statusText}
                                        </span>
                                    )
          						}
          					}*/, {
          						name: 'modifyDate', header: '修改时间', content: function (item) {
                                    var dateText = new Date(item.modifyDate).format("yyyy-MM-dd hh:mm:ss");                                    
                                    return (
                                        <span>
                                            {dateText}
                                        </span>
                                    )
          						}
          					}, {
          						name: 'oper', header: '操作',
          						content: function(column) {
          							return (
      									<div>
      										<PermissionLink permissionName="resource_show" href="javascript:void(0);" onClick={me._showClick.bind(this,column)} >&nbsp;&nbsp;查看详情&nbsp;&nbsp;</PermissionLink>
      										<PermissionLink permissionName="resource_update" href="javascript:void(0);" onClick={me._updateClick.bind(this,column)} >&nbsp;&nbsp;修改&nbsp;&nbsp;</PermissionLink>
	    	                    		  	<PermissionLink permissionName="resource_delete" href="javascript:void(0);" onClick={me._deleteClick.bind(this,column)} >&nbsp;&nbsp;删除&nbsp;&nbsp;</PermissionLink>	    	                    		  	
    	                    		  	</div>
      								)
          			    	 	}
          					}
          				]}
		            />
		            <div className="clearfix"></div>
		        </div>
			</div>
		);
	}
});