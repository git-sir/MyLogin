var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var UserForm = require('./other/userForm');
var UserDetailForm = require('./other/userDetailForm');
var PasswordForm = require('./other/passwordForm');
var EmailForm = require('./other/emailForm');
var PhoneForm = require('./other/phoneForm');
var PermissionLink = require('../widget/other/permissionLink');
var PermissionButton = require('../widget/other/permissionButton');
var Form = require('../widget/other/form');
var UpdateuserDetailForm = require('./other/updateuserDetailForm');
var Radio = UcsmyUI.Radio;
var RadioGroup = Radio.RadioGroup;
var SelectDropDown = UcsmyUI.SelectDropDown;

var option = [
	{option: '正常', value: '0'},
	{option: '冻结', value: '1'}
];

myPanel = React.createClass({
	getInitialState:function () {
        return{
			urgentFlag:'',
			data:{},
        }
    },
	componentDidMount: function() {
		var me = this;
		$.post("accountGroup/getAll", {}, function(data) {
			if(data.retmsg != 'success') {
				return;
			}

			me.setState({
				data: data.data,
				urgentFlag:data.data
			});
		}, "json").error(function(){
			UcsmyIndex.alert("失败","系统异常");
		});
	},
    _query: function() {

		this.refs.grid.load({
			ucasAccount: this.refs.ucasAccount.getValue(),
			emailAccount: this.refs.emailAccount.getValue(),
			mobileAccount: this.refs.mobileAccount.getValue(),
			realName: this.refs.realName.getValue(),
			status: this.refs.sta.getValue(),
			accgUuid: this.refs.accgUuid.getValue()
		});

    },
    _add: function() {
    	var me = this;
    	UcsmyIndex.openChildrenPage(UserForm, function(refPanel) {
    		refPanel.init('account/addUser','新增帐号',  {gender: "1"}, function(){
    			me.refs.grid.load();
    		});
    	});

    },
	_freeze:function(column)
	{
		var me = this;
		UcsmyIndex.confirm("确定", "你真的要冻结该用户吗？", function() {
			$.post("account/freeze", {ucasAccount: column.ucasAccount}, function(data) {
				if(data.retcode === '0') {
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
	_unfreeze:function(column)
	{
		var me = this;
		UcsmyIndex.confirm("确定", "你真的要解冻该用户吗？", function() {
			$.post("account/unfreeze", {ucasAccount: column.ucasAccount}, function(data) {
				if(data.retcode === '0') {
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
	_mod_email:function(column)
	{
		var me = this;
		UcsmyIndex.openChildrenPage(EmailForm, function(refPanel) {
			refPanel.init(column,function(){
				me.refs.grid.load();
			});
		});
	},
	_mod_mobile:function(column)
	{
		var me = this;
		UcsmyIndex.openChildrenPage(PhoneForm, function(refPanel) {
			refPanel.init(column,function(){
				me.refs.grid.load();
			});
		});
	},
    _update: function(column) {
		var me = this;
		UcsmyIndex.openChildrenPage(UpdateuserDetailForm, function(refPanel) {
			refPanel.init('account/upInfo','修改基本信息',  column, function(){
				me.refs.grid.reload();
			});
		});
    },
    _updatePassword: function(column) {
    	UcsmyIndex.openChildrenPage(PasswordForm, function(refPanel) {
    		refPanel.init(column);
    	});
    },
	_detail:function(column) //基本信息
	{
		var me = this;
		UcsmyIndex.openChildrenPage(UserDetailForm, function(refPanel) {
			refPanel.init('account/upInfo','修改基本信息',  column, function(){
				me.refs.grid.reload();
			});
		});
	},
    _delete: function(column) {
    	var me = this;
		UcsmyIndex.confirm("确定", "你真的要删除该用户吗？", function() {
			$.post("account/delete", {ucasAccount: column.ucasAccount}, function(data) {
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
			     <h2 className="content-title">帐号管理</h2>
			    <div className="panel">
			            <div className="panel-title">查询条件</div>
						<div className="panel-content">
						     <FormItem label="网金帐号"><Input ref="ucasAccount"/></FormItem>
			                 <FormItem label="邮箱帐号"><Input ref="emailAccount"/></FormItem>
			                 <FormItem label="手机帐号"><Input ref="mobileAccount"/></FormItem>
			                 <FormItem label="用户名称"><Input ref="realName"/></FormItem>
						    <FormItem label="状态">
							  <SelectDropDown ref="sta" defaultText="请选择" defaultValue="" option={option} searchPlaceholder="请选择" />
							</FormItem>
							<FormItem label="用户组">
								<SelectDropDown ref="accgUuid" defaultText="请选择" defaultValue="" option={me.state.urgentFlag} />

							</FormItem>
					    </div>
		        </div>
	            <div className="btn-panel">
	                <Button buttonType="bidnow" onClick={this._query}>查询</Button>
	                <PermissionButton permissionName="user_add" buttonType="bidnow" onClick={this._add}>新增</PermissionButton>
	            </div>
				<div className="table-panel">
		            <Grid
		            	url="account/queryUsers" ref = "grid"
		                isTextOverflowHidden={true}
		                columns={[ 
         				    {
          						name: 'realName', header: '用户名称',width: 80
          					},
							{
							name: 'ucasAccount', header: '网金帐号',width: 80
							},
		                   {
          						name: 'emailAccount', header: '邮箱帐号',width: 100
          					}, {
          						name: 'mobileAccount', header: '手机帐号',width: 120
          					}, {
          						name: 'orgName', header: '组织名称',width: 60
          					}
		                  , {
			                    name: 'groupName', header: '用户组',width: 100
		                    }, {
			                    name: 'modifyDate', header: '最近修改时间',width: 150
		                      }
		                     , {
          						name: 'status', header: '状态',width: 30, content:function(column){
         				    		 return (<span>
        				    		 	{column.status === '0' ? '正常' : '冻结'}
        				    		 </span>)
        						}
          					}, {
          						name: 'cz',
          						header: '操作',
          						permissionName: 'account_update,account_delete,account_freeze,account_unfreeze,account_mod_email,account_mod_mobile,account_update_password,account_detail',
          						content:function(column){
          							return (<span>
				                        <PermissionLink permissionName="account_update" href="Javascript:void(0);" onClick={me._update.bind(this, column)}>修改&nbsp;&nbsp;&nbsp;</PermissionLink>
      				    		 		<PermissionLink permissionName="account_delete" href="Javascript:void(0);" onClick={me._delete.bind(this, column)}>删除&nbsp;&nbsp;&nbsp;</PermissionLink>
										<PermissionLink permissionName="account_freeze" href="Javascript:void(0);" onClick={me._freeze.bind(this, column)}>冻结&nbsp;&nbsp;&nbsp;</PermissionLink>
				                        <PermissionLink permissionName="account_unfreeze" href="Javascript:void(0);" onClick={me._unfreeze.bind(this, column)}>解冻&nbsp;&nbsp;&nbsp;</PermissionLink>
      				    		 		<PermissionLink permissionName="account_mod_email" href="Javascript:void(0);" onClick={me._mod_email.bind(this, column)}>修改邮箱帐号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/></PermissionLink>
				                       <PermissionLink permissionName="account_mod_mobile" href="Javascript:void(0);" onClick={me._mod_mobile.bind(this, column)}>修改手机帐号&nbsp;&nbsp;&nbsp;</PermissionLink>
				                       <PermissionLink permissionName="account_update_password" href="Javascript:void(0);" onClick={me._updatePassword.bind(this, column)}>密码修改&nbsp;&nbsp;&nbsp;</PermissionLink>
				                       <PermissionLink permissionName="account_detail" href="Javascript:void(0);" onClick={me._detail.bind(this, column)}>详情&nbsp;&nbsp;&nbsp;</PermissionLink>

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