/**
 * Created by chenqilin on 2017/4/21.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var SelectDropDown = UcsmyUI.SelectDropDown;
var Grid = require('../widget/other/grid');
var Form = require('./other/form');
var FormItem = UcsmyUI.Form.FormItem;
var GroupClient = require('./other/group_client');
var PermissionLink = require('../widget/other/permissionLink');
var PermissionButton = require('../widget/other/permissionButton');
var AccountGroup = require('./other/account_group');

var option = [
    {option: '是', value: '1'},
    {option: '否', value: '0'}
];

myPanel = React.createClass({

    getInitialState: function () {
        return {
            defaultGroupId: null
        }
    },

    componentWillMount: function () {
        var me = this;
        $.post("clientGroup/default", {}, function (data) {
            if (data.retcode == "0") {
                me.setState({
                    defaultGroupId: data.data.cligUuid
                })
            } else {
                UcsmyIndex.alert("提示", result.retmsg);
            }
        }, "json").error(function () {
            UcsmyIndex.alert("失败", "网络异常");
        });
    },

    _add: function () {
        var rootThis = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(
                'clientGroup/add',
                '添加应用组',
                function () {
                    rootThis._reset();
                },
                {
                    clientGroup: {}
                }
            );
        });
    },

    _edit: function (item) {
        var rootThis = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(
                'clientGroup/update',
                '修改应用组',
                function () {
                    rootThis._reset();
                },
                {
                    clientGroup: item
                }
            );
        });
    },

    _delete: function (item) {
        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否确定删除该应用组？", function() {
            $.post(
                'clientGroup/delete',
                {cligUuid: item.cligUuid},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
                        rootThis._reset();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
                , "json").error(function () {
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    _search: function () {
        this.refs.grid.load({
            groupName: this.refs.groupName.getValue(),
            accountGroupName: this.refs.accountGroupName.getValue(),
            isSso: this.refs.isSso.getValue()
        });
    },

    _bindClient: function (column) {
        UcsmyIndex.openChildrenPage(GroupClient, function(refPanel) {
            refPanel.init("bind", column);
        });
    },

    _unbindClient: function (column) {
        UcsmyIndex.openChildrenPage(GroupClient, function(refPanel) {
            refPanel.init("unbind", column);
        });
    },

    _manageClient: function (column) {
        UcsmyIndex.openChildrenPage(GroupClient, function(refPanel) {
            refPanel.init("manage", column);
        });
    },

    _viewAccountGroup: function (column) {
        UcsmyIndex.openChildrenPage(AccountGroup, function(refPanel) {
            refPanel.init(column);
        });
    },

    _reset: function () {
        this.refs.groupName.setValue('');
        this.refs.accountGroupName.setValue('');
        this.refs.isSso.setValue('');
        this.refs.grid.load();
    },

    render: function () {
        var rootThis = this;

        return (
            <div>
                <h2 className="content-title">应用组管理</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="应用组名称"><Input ref="groupName"/></FormItem>
                        <FormItem label="是否单点登录">
                            <SelectDropDown ref="isSso"
                                            defaultText="请选择" defaultValue=""
                                            option={option} searchPlaceholder="请选择"
                            />
                        </FormItem>
                        <FormItem label="授权账号组名称"><Input ref="accountGroupName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                    <PermissionButton permissionName="client_group_add" buttonType="bidnow" onClick={this._add}>添加</PermissionButton>
                </div>

                <div className="table-panel">
                    <Grid url="clientGroup/list" ref="grid"
                          isTextOverflowHidden={true}
                          columns={[
                              {name: 'groupName', header: '应用组名称', width: 200},
                              {name: 'descRibe', header: '描述', width: 300},
                              {
                                  name: 'isSso', header: '是否单点登录', width: 100, content: function (item) {
                                  var statusText = '否';
                                  if (item.isSso == "1") {
                                      statusText = '是';
                                  }
                                  return (
                                      <span>
                                          {statusText}
                                      </span>
                                  )
                              }
                              },
                              {
                                  name: 'cligUuid', header: '操作', content: function (item) {
                                  var linkList = [];
                                  linkList.push(<PermissionLink permissionName="client_group_delete" href="Javascript:void(0);" onClick={rootThis._delete.bind(this, item)}>&nbsp;&nbsp;删除&nbsp;&nbsp;</PermissionLink>);
                                  linkList.push(<PermissionLink permissionName="client_group_bind" href="Javascript:void(0);" onClick={rootThis._bindClient.bind(this, item)}>&nbsp;&nbsp;绑定应用&nbsp;&nbsp;</PermissionLink>);
                                  linkList.push(<PermissionLink permissionName="client_group_unbind" href="Javascript:void(0);" onClick={rootThis._unbindClient.bind(this, item)}>&nbsp;&nbsp;解绑应用&nbsp;&nbsp;</PermissionLink>);
                                  if (rootThis.state.defaultGroupId != null && rootThis.state.defaultGroupId == item.cligUuid) {
                                      linkList = [];
                                  }
                                  return (
                                      <div>
                                          <PermissionLink permissionName="client_group_edit" href="Javascript:void(0);" onClick={rootThis._edit.bind(this, item)}>&nbsp;&nbsp;修改&nbsp;&nbsp;</PermissionLink>
                                          {linkList}
                                          <PermissionLink permissionName="client_group_manage" href="Javascript:void(0);" onClick={rootThis._manageClient.bind(this, item)}>&nbsp;&nbsp;查看应用&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="client_group_manage" href="Javascript:void(0);" onClick={rootThis._viewAccountGroup.bind(this, item)}>&nbsp;&nbsp;查看授权账号组&nbsp;&nbsp;</PermissionLink>
                                      </div>
                                  )
                              }
                              }
                          ]}/>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});