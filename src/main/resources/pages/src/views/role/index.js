var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var Form = require('./other/form');
var RoleUser = require('./other/role_user');
var BindPermissionPanel = require('./other/bind_permission');
var PermissionLink = require('../widget/other/permissionLink');

myPanel = React.createClass({
    _query: function() {
    	this.refs.grid.load({
    		name: this.refs.name.getValue()
    	});
    },
    _add: function() {
    	var me = this;
    	UcsmyIndex.openChildrenPage(Form, function(refPanel) {
    		refPanel.init('新增角色', 'role/addRole', {}, function(){
    			me.refs.grid.load();
    		});
    	});
    },
    _updateClick: function(column) {
    	var me = this;
    	UcsmyIndex.openChildrenPage(Form, function(refPanel) {
    		refPanel.init('修改角色', 'role/updateRole', column, function(){
    			me.refs.grid.load();
    		});
    	});
	},
	_deleteClick: function(column) {
		var me = this;
		UcsmyIndex.confirm("确定", "是否确定删除该角色？", function() {
			$.post("role/deleteRole", {"roleId":column.roleId}, function(data) {
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
				<h2 className="content-title">角色管理</h2>
	            <div className="panel">
	                <div className="panel-title">查询条件</div>
	                <div className="panel-content">
	                    <FormItem label="用户名"><Input ref="name"/></FormItem>
	                </div>
	            </div>
	            <div className="btn-panel">
	                <Button buttonType="bidnow" onClick={this._query}>查询</Button>
	                <Button buttonType="bidnow" onClick={this._add}>新增</Button>
	            </div>
				<div className="table-panel">
		            <Grid url="role/queryRoleList" ref = "grid" isTextOverflowHidden={true}
		                columns={[ {
          						name: 'name', header: '角色名'
          					}, {
          						name: 'description', header: '说明',width:500
          					}, {
          						name: 'oper', header: '操作',
          						content: function(column) {
          							return (
      									<div>
      										<PermissionLink permissionName="role_update" href="javascript:void(0);" onClick={me._updateClick.bind(this,column)} >&nbsp;&nbsp;修改&nbsp;&nbsp;</PermissionLink>
	    	                    		  	<PermissionLink permissionName="role_delete" href="javascript:void(0);" onClick={me._deleteClick.bind(this,column)} >&nbsp;&nbsp;删除&nbsp;&nbsp;</PermissionLink>
	    	                    		  	<PermissionLink permissionName="role_bind_user"  href="javascript:void(0);" onClick={me._bindClick.bind(this,column)} >&nbsp;&nbsp;绑定用户&nbsp;&nbsp;</PermissionLink>
	    	                    		  	<PermissionLink permissionName="role_unbind_user"  href="javascript:void(0);" onClick={me._unbindClick.bind(this,column)} >&nbsp;&nbsp;解绑用户&nbsp;&nbsp;</PermissionLink>
	    	                    		  	<PermissionLink permissionName="role_bind_permission" href="javascript:void(0);" onClick={me._bindPermClick.bind(this,column)} >&nbsp;&nbsp;绑定权限&nbsp;&nbsp;</PermissionLink>
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