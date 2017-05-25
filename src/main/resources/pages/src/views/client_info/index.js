var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var ClientInfoForm = require('./other/clientInfoForm');
var ClientResgrRelForm = require('./other/clientResgrRel');
var ViewClientInfo = require('./other/viewClientInfo');
var AddResGroup = require('./other/addResGroup');
var PermissionLink = require('../widget/other/permissionLink');
var PermissionButton = require('../widget/other/permissionButton');
var SelectDropDown = UcsmyUI.SelectDropDown;
myPanel = React.createClass({
	getDefaultProps: function(){
		return {
			STATUS_OPTION: [
				{option: '可用', value: '0'},
				{option: '停用', value: '1'}
			],
			GRANT_TYPE_OPTION: [
				{option : 'authorization_code', value: 'authorization_code'},
				{option : 'password', value: 'password'},
				{option : 'client_credentials', value: 'client_credentials'},
				{option : 'proxy_authorization_code', value: 'proxy_authorization_code'}
			]
		}
	},
	getInitialState:function () {
        return{
        }
    },
    _query: function() {
		this.refs.grid.load({
			clientName: this.refs.clientName.getValue(),
			clientId: this.refs.clientId.getValue(),
			clientGroupName: this.refs.clientGroupName.getValue(),
			status: this.refs.status.getValue(),
			grantType: this.refs.grantType.getValue()
		});
    },
    _add: function() {
    	var me = this;
    	UcsmyIndex.openChildrenPage(ClientInfoForm, function(refPanel) {
    		refPanel.init('新增应用', 'client_info/add', {}, function(){
    			me.refs.grid.load();
    		});
    	});
    },
    _update: function(column) {
    	var me = this;
    	UcsmyIndex.openChildrenPage(ClientInfoForm, function(refPanel) {
    		refPanel.init('修改应用', 'client_info/update', column, function(){
    			me.refs.grid.load();
    		}, true);
    	});
    },
    _bindResgr: function(column) {
    	UcsmyIndex.openChildrenPage(ClientResgrRelForm, function(refPanel) {
    		refPanel.init("bind", column);
    	});
    },
    _unbindResgr: function(column) {
    	UcsmyIndex.openChildrenPage(ClientResgrRelForm, function(refPanel) {
    		refPanel.init("unbind", column);
    	});
    },
    _delete: function(column) {
    	var me = this;
		UcsmyIndex.confirm("确定", "你真的要删除该应用数据吗？", function() {
			$.post("client_info/delete", {clientId: column.clientId}, function(data) {
				if(data.retcode == 0) {
					UcsmyIndex.alert("成功", data.retmsg);
					me.refs.grid.reload();
				} else {
					UcsmyIndex.alert("失败", data.retmsg);
				}
			}, "json").error(function(){
				UcsmyIndex.alert("失败", "网络异常");
		    });
		});
    },
	_view: function(column) {
		UcsmyIndex.openChildrenPage(ViewClientInfo, function(refPanel) {
			refPanel.init(column);
		});
	},

    _addResgr: function (column) {
        UcsmyIndex.openChildrenPage(AddResGroup, function(refPanel) {
            refPanel.init(column, "resourceGroup/queryResourceGroupByClient");
        });
    },
	formatDate: function(date,fmt) {
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	render: function() {
		var me = this;
		return (
			<div>
				<h2 className="content-title">应用管理</h2>
	            <div className="panel">
	                <div className="panel-title">查询条件</div>
					<div className="panel-content">
						<FormItem label="应用简称"><Input ref="clientName"/></FormItem>
						<FormItem label="应用ID"><Input ref="clientId"/></FormItem>
						<FormItem label="应用组名称"><Input ref="clientGroupName"/></FormItem>
						<FormItem label="状态" className="col-xs-5">
							<SelectDropDown
								ref="status"
								option={me.props.STATUS_OPTION}
							/>
						</FormItem>
						<FormItem label="授权类型" className="col-xs-5">
							<SelectDropDown
								ref="grantType"
								defaultText="请选择" defaultValue=""
								option={me.props.GRANT_TYPE_OPTION} searchPlaceholder="请选择"
							/>
						</FormItem>
					</div>
	            </div>
	            <div className="btn-panel">
	                <Button buttonType="bidnow" onClick={this._query}>查询</Button>
	                <PermissionButton permissionName="client_info_add" buttonType="bidnow" onClick={this._add}>新增</PermissionButton>
	            </div>
				<div className="table-panel">
		            <Grid
		            	retDataProperty="data.resultList"
	            		retTotalProperty="data.totalCount"
	            		retCurrentProperty="data.pageNo"
		            	url="client_info/query" ref = "grid"
						isTextOverflowHidden={true}
		                columns={[ 
         				    {
          						name: 'clientName', header: '应用简称',
          						width: 100
          					}, /*{
          						name: 'descRibe', header: '应用描述',
          						width: 200
          					}, {
          						name: 'clientId', header: '应用ID',
          						width: 260
          					}, {
          						name: 'clientSecret', header: '应用密钥',
          						width: 150
          					},*/ {
          						name: 'grantType', header: '授权类型',
          						width: 200
          					}, {
          						name: 'ucasClientGroup', header: '应用组名称', width: 100, content:function(column){
         				    		 return (<span>
        				    		 	{column.ucasClientGroup == null ? '' : column.ucasClientGroup.groupName}
        				    		 </span>)
        						}
          					}, {
          						name: 'status', header: '状态', width: 50, content:function(column){
          				    		 return (<span>
          				    		 	{column.status == '0' ? '可用' : '停用'}
          				    		 </span>)
          						}
          					}, {
          						name: 'modifyDate', header: '最近修改时间', width: 160, content:function(column){
          				    		 return (<span>
          				    		 	{me.formatDate(new Date(column.modifyDate),"yyyy-MM-dd hh:mm:ss")}
          				    		 </span>)
          						}
          					}, {
          						name: 'cz',
          						header: '操作',
          						permissionName: 'client_info_view,client_info_update,client_info_delete,client_info_bindResgr,client_info_unbindResgr',
          						content:function(column){
          							if(column.status == 0){
										return (<span>
											<PermissionLink permissionName="client_info_view" href="Javascript:void(0);" onClick={me._view.bind(this, column)}>查看&nbsp;&nbsp;&nbsp;</PermissionLink>
											<PermissionLink permissionName="client_info_update" href="Javascript:void(0);" onClick={me._update.bind(this, column)}>修改&nbsp;&nbsp;&nbsp;</PermissionLink>
											<PermissionLink permissionName="client_info_delete" href="Javascript:void(0);" onClick={me._delete.bind(this, column)}>删除&nbsp;&nbsp;&nbsp;</PermissionLink>
                                            <PermissionLink permissionName="client_info_addResgr" href="Javascript:void(0);" onClick={me._addResgr.bind(this, column)}>添加资源组&nbsp;&nbsp;&nbsp;</PermissionLink>
											<PermissionLink permissionName="client_info_bindResgr" href="Javascript:void(0);" onClick={me._bindResgr.bind(this, column)}>授权资源组&nbsp;&nbsp;&nbsp;</PermissionLink>
											<PermissionLink permissionName="client_info_unbindResgr" href="Javascript:void(0);" onClick={me._unbindResgr.bind(this, column)}>取消授权资源组</PermissionLink>
										</span>)
          							}else{
          								return (<span>无</span>)
          							}
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