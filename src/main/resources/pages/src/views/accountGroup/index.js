var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var Form = require('./other/form');
var GroupAccount = require('./other/group_account');
var GroupAccountView = require('./other/group_account_view');
var AccountClient = require('./other/account_client');
var PermissionLink = require('../widget/other/permissionLink');
var PermissionButton = require('../widget/other/permissionButton');
myPanel = React.createClass({
    _reload: function () {
        this.refs.groupName.setValue('');
        this.refs.clientGroupName.setValue('');
        this.refs.grid.reload();
    },
    _add: function () {
        var me = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init('accountGroup/addAccountGroup', '添加账号组', {}, function() {
            	me._reload();
            });
        });
    },
    _edit: function (item) {
        var me = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init('accountGroup/editAccountGroup', '修改账号组', item, function() {
            	me._reload();
            });
        });
    },
    _delete: function (item) {
        var me = this;
        UcsmyIndex.confirm("确定", "你真的要删除该账号组吗？", function() {
        	$.post('accountGroup/deleteAccountGroup', {accgUuid: item.accgUuid}, function (result) {
                if (result && result.retcode && result.retcode == '0') {
                    UcsmyIndex.alert("成功", result.retmsg);
                    me._reload();
                } else {
                    UcsmyIndex.alert("失败", result.retmsg);
                }
            });
		});
    },
    _search: function () {
        this.refs.grid.load({
            groupName : this.refs.groupName.getValue(),
            clientGroupName: this.refs.clientGroupName.getValue()
        });
    },
    _bindAcount: function (item) {
        UcsmyIndex.openChildrenPage(GroupAccount, function(refPanel) {
            refPanel.init("bind", item);
        });
    },

    _unbindAcount: function (item) {
        UcsmyIndex.openChildrenPage(GroupAccount, function(refPanel) {
            refPanel.init("unbind", item);
        });
    },
    _unbindAcountView: function (item) {
        UcsmyIndex.openChildrenPage(GroupAccountView, function(refPanel) {
            refPanel.init("unbind", item);
        });
    },
    _bindClientGroup: function (item) {
        UcsmyIndex.openChildrenPage(AccountClient, function(refPanel) {
            refPanel.init("bind", item);
        });
    },

    _unbindClientGroup: function (item) {
        UcsmyIndex.openChildrenPage(AccountClient, function(refPanel) {
            refPanel.init("unbind", item);
        });
    },
    _unbindClientGroupView: function (item) {
        UcsmyIndex.openChildrenPage(AccountClient, function(refPanel) {
            refPanel.init("view", item);
        });
    },

    render: function() {
        var me = this;

        return (
            <div>
                <h2 className="content-title">账号组管理</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="账号组名称"><Input ref="groupName"/></FormItem>
                        <FormItem label="授权应用组名称"><Input ref="clientGroupName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                    <Button buttonType="bidnow" onClick={this._add}>添加</Button>
                </div>

                <div className="table-panel">
                    <Grid url="accountGroup/query" ref = "grid"
                          isTextOverflowHidden={true}
                          columns={[
                            {name: 'groupName', header: '帐号组名称', width: 200},
                            {name: 'descRibe', header: '帐号组描述', width: 300},
                            {name: 'accgUuid', header: '操作',  content: function (item) {

                                if (item.accgUuid==1 || item.accgUuid==2) {
                                    return (
                                        <span>
                                        <PermissionLink permissionName="update_account_group" href="Javascript:void(0);" onClick={me._edit.bind(this, item)}>&nbsp;修改&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="bind_account" href="Javascript:void(0);" onClick={me._bindAcount.bind(this, item)}>&nbsp;绑定用户&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="unbind_account" href="Javascript:void(0);" onClick={me._unbindAcount.bind(this, item)}>&nbsp;解绑用户&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="bind_client_group" href="Javascript:void(0);" onClick={me._bindClientGroup.bind(this, item)}>&nbsp;绑定应用组&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="unbind_client_group" href="Javascript:void(0);" onClick={me._unbindClientGroup.bind(this, item)}>&nbsp;解绑应用组&nbsp;</PermissionLink>

                                     <PermissionLink permissionName="view_client_group" href="Javascript:void(0);" onClick={me._unbindClientGroupView.bind(this, item)}>&nbsp;应用组查看&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="view_account" href="Javascript:void(0);" onClick={me._unbindAcountView.bind(this, item)}>&nbsp;用户查看&nbsp;</PermissionLink>
                                    </span>
                                )
                                }else if(item.accgUuid == 0){
                                    return (
                                        <span>
                                        <PermissionLink permissionName="update_account_group" href="Javascript:void(0);" onClick={me._edit.bind(this, item)}>&nbsp;修改&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="bind_client_group" href="Javascript:void(0);" onClick={me._bindClientGroup.bind(this, item)}>&nbsp;绑定应用组&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="unbind_client_group" href="Javascript:void(0);" onClick={me._unbindClientGroup.bind(this, item)}>&nbsp;解绑应用组&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="view_client_group" href="Javascript:void(0);" onClick={me._unbindClientGroupView.bind(this, item)}>&nbsp;应用组查看&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="view_account" href="Javascript:void(0);" onClick={me._unbindAcountView.bind(this, item)}>&nbsp;用户查看&nbsp;</PermissionLink>

                                    </span>
                                )
                                }
                                else {
                                    return (
                                        <span>
                                        <PermissionLink permissionName="update_account_group" href="Javascript:void(0);" onClick={me._edit.bind(this, item)}>&nbsp;修改&nbsp;</PermissionLink>
                                    <PermissionLink permissionName="delete_account_group" href="Javascript:void(0);" onClick={me._delete.bind(this, item)}>&nbsp;删除&nbsp;</PermissionLink>

                                     <PermissionLink permissionName="bind_account" href="Javascript:void(0);" onClick={me._bindAcount.bind(this, item)}>&nbsp;绑定用户&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="unbind_account" href="Javascript:void(0);" onClick={me._unbindAcount.bind(this, item)}>&nbsp;解绑用户&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="bind_client_group" href="Javascript:void(0);" onClick={me._bindClientGroup.bind(this, item)}>&nbsp;绑定应用组&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="unbind_client_group" href="Javascript:void(0);" onClick={me._unbindClientGroup.bind(this, item)}>&nbsp;解绑应用组&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="view_client_group" href="Javascript:void(0);" onClick={me._unbindClientGroupView.bind(this, item)}>&nbsp;应用组查看&nbsp;</PermissionLink>
                                     <PermissionLink permissionName="view_account" href="Javascript:void(0);" onClick={me._unbindAcountView.bind(this, item)}>&nbsp;用户查看&nbsp;</PermissionLink>
                                    </span>
                                )
                                }
                            }}
                        ]}>
                    </Grid>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
});