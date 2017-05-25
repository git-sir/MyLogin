var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var UserForm = require('./other/userForm');
var PasswordForm = require('./other/passwordForms');
var PermissionLink = require('../widget/other/permissionLink');
var PermissionButton = require('../widget/other/permissionButton');
var Form = require('../widget/other/form');

myPanel = React.createClass({
	getInitialState:function () {
        return{
        }
    },
    _query: function() {
    	this.refs.grid.load(this.refs.queryForm.getValues());
    },
    _add: function() {
    	var me = this;
    	UcsmyIndex.openChildrenPage(UserForm, function(refPanel) {
    		refPanel.init('新增用户', 'user/add', {gender: "1"}, function(){
    			me.refs.grid.load();
    		});
    	});
    },
    _update: function(column) {
    	var me = this;
    	UcsmyIndex.openChildrenPage(UserForm, function(refPanel) {
    		refPanel.init('修改用户', 'user/update', column, function(){
    			me.refs.grid.load();
    		}, true);
    	});
    },
    _updatePassword: function(column) {
    	UcsmyIndex.openChildrenPage(PasswordForm, function(refPanel) {
    		refPanel.init(column);
    	});
    },
    _delete: function(column) {
    	var me = this;
		UcsmyIndex.confirm("确定", "你真的要删除该用户数据吗？", function() {
			$.post("user/delete", {userId: column.userId}, function(data) {
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
	render: function() {
		var me = this;
		return (
			<div>
				<h2 className="content-title">用户管理</h2>
	            <div className="panel">
	                <div className="panel-title">查询条件</div>
	                <div className="panel-content">
	                    <Form ref="queryForm" config={[{
	                    	itemText: "用户姓名",
	                    	panelType: Input,
	                    	name: "name"
	                    }]}/>
	                </div>
	            </div>
	            <div className="btn-panel">
	                <Button buttonType="bidnow" onClick={this._query}>查询</Button>
	                <PermissionButton permissionName="user_add" buttonType="bidnow" onClick={this._add}>新增</PermissionButton>
	            </div>
				<div className="table-panel">
		            <Grid
		            	retDataProperty="data.resultList"
	            		retTotalProperty="data.totalCount"
	            		retCurrentProperty="data.pageNo"
		            	url="user/query" ref = "grid"
		                columns={[ 
         				    {
          						name: 'account', header: '登录名', content:function(column){
          				    		 return <span>{column.userAccount.account}</span>;
          				    	}
          					}, {
          						name: 'name', header: '用户姓名'
          					}, {
          						name: 'telephone', header: '固定电话'
          					}, {
          						name: 'mobilephone', header: '手机'
          					}, {
          						name: 'email', header: '邮箱'
          					}, {
          						name: 'gender', header: '性别', content:function(column){
          				    		 return (<span>
          				    		 	{column.gender == '1' ? '男' : '女'}
          				    		 </span>)
          						}
          					}, {
          						name: 'roleName', header: '角色', content:function(column){
         				    		 return (<span>
        				    		 	{column.role == null ? '' : column.role.name}
        				    		 </span>)
        						}
          					}, {
          						name: 'cz',
          						header: '操作',
          						permissionName: 'user_update,user_delete',
          						content:function(column){
          							return (<span>
      				    		 		<PermissionLink permissionName="user_update" href="Javascript:void(0);" onClick={me._update.bind(this, column)}>修改&nbsp;&nbsp;&nbsp;</PermissionLink>
      				    		 		<PermissionLink permissionName="user_update_password" href="Javascript:void(0);" onClick={me._updatePassword.bind(this, column)}>密码修改&nbsp;&nbsp;&nbsp;</PermissionLink>
      				    		 		<PermissionLink permissionName="user_delete" href="Javascript:void(0);" onClick={me._delete.bind(this, column)}>删除</PermissionLink>
      				    		 	</span>)
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