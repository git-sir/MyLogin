/**
 * Created by chenqilin on 2017/4/28.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Grid = require('../widget/other/grid');
var FormItem = UcsmyUI.Form.FormItem;
var Form = require('./other/form');
var PermissionLink = require('../widget/other/permissionLink');
var GroupResource = require('./other/group_resource');
var GroupDetail = require('./other/detail');

myPanel = React.createClass({

    _search: function () {
        this.refs.grid.load({
            groupName: this.refs.groupName.getValue(),
            clientId: this.refs.clientId.getValue(),
            clientName: this.refs.clientName.getValue()
        });
    },

    _edit: function (item) {
        var rootThis = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(
                {resGroup: item},
                function () {
                    rootThis.refs.clientId.setValue('');
                    rootThis.refs.groupName.setValue('');
                    rootThis.refs.clientName.setValue('');
                    rootThis.refs.grid.load();
                }
            );
        });
    },

    _delete: function (item) {
        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否确定删除该资源组？", function() {
            $.post(
                'resourceGroup/delete',
                {resGroupUuid: item.resGroupUuid},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
                        rootThis.refs.clientId.setValue('');
                        rootThis.refs.groupName.setValue('');
                        rootThis.refs.clientName.setValue('');
                        rootThis.refs.grid.load();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
                , "json").error(function () {
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    _queryResource: function (column) {
        UcsmyIndex.openChildrenPage(GroupResource, function(refPanel) {
            refPanel.init(column);
        });
    },

    _queryGroupDetail: function(column) {
        UcsmyIndex.openChildrenPage(GroupDetail, function(refPanel) {
            refPanel.init(column);
        });
    },

    render: function () {
        var rootThis = this;
        return(
            <div>
                <h2 className="content-title">资源组管理</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="应用id"><Input ref="clientId"/></FormItem>
                        <FormItem label="应用简称"><Input ref="clientName"/></FormItem>
                        <FormItem label="资源组名称"><Input ref="groupName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={rootThis._search}>查询</Button>
                </div>

                <div className="table-panel">
                    <Grid url="resourceGroup/queryResourceGroupByClient" ref="grid"
                          isTextOverflowHidden={true}
                          columns={[
                              {name: 'clientId', header: '所属应用id', width: 270},
                              {name: 'clientName', header: '应用简称', width: 150},
                              {name: 'groupName', header: '资源组名称', width: 150},
                              {name: 'descRibe', header: '资源组描述', width: 200},
                              {name: 'resGroupUuid', header: '操作', content: function (item) {
                                  return (
                                      <div>
                                          <PermissionLink permissionName="resource_group_query" href="Javascript:void(0);" onClick={rootThis._queryGroupDetail.bind(this, item)}>&nbsp;&nbsp;查看详情&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="resource_group_edit" href="Javascript:void(0);" onClick={rootThis._edit.bind(this, item)}>&nbsp;&nbsp;修改&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="resource_group_delete" href="Javascript:void(0);" onClick={rootThis._delete.bind(this, item)}>&nbsp;&nbsp;删除&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="resource_group_query" href="Javascript:void(0);" onClick={rootThis._queryResource.bind(this, item)}>&nbsp;&nbsp;查看资源&nbsp;&nbsp;</PermissionLink>
                                      </div>
                                  )
                              }}
                          ]}>
                    </Grid>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});