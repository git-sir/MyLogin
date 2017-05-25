/**
 * Created by chenqilin on 2017/4/25.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Grid = require('../../widget/other/grid');
var FormItem = UcsmyUI.Form.FormItem;
var PermissionLink = require('../../widget/other/permissionLink');
var ResourceLayer = require('./resource_list');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            accUuid: '',
            url: '',
            realName: '',
            callback: function(){}
        }
    },

    init: function (callback, data) {
        var url = 'userRel/clientList';
        var queryData = {
            accUuid : data.accUuid,
            clientName: this.refs.clientName.getValue(),
            openId: this.refs.openId.getValue()
        };
        this.setState({
            accUuid: data.accUuid,
            callback: callback,
            realName: data.realName,
            url: url
        }, () => {
            this.refs.grid.load(queryData);
        });
    },

    _search: function () {
        this.refs.grid.load({
            accUuid: this.state.accUuid,
            clientName: this.refs.clientName.getValue(),
            openId: this.refs.openId.getValue()
        });
    },

    _clientResources: function (item) {
        this.refs.resourceLayer._open('userRel/resList', item);
    },

    _deleteClientRel: function (item) {
        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否确定取消应用授权？", function() {
            $.post(
                'userRel/deleteUserRel',
                {openId: item.openId},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
                        rootThis.refs.clientName.setValue('');
                        rootThis.refs.openId.setValue('');
                        rootThis.refs.grid.load({accUuid : rootThis.state.accUuid, clientName: rootThis.refs.clientName.getValue()});
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
                , "json").error(function () {
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    _return: function(event) {
        UcsmyIndex.closeChildrenPage();
    },

    render: function () {
        var rootThis = this;
        return (
            <div>
                <h2 className="content-title">账号授权应用列表</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="ucs-form-group">
                        <span className="label">用户名称：</span>
                        <span>{rootThis.state.realName}</span>
                    </div>
                    <div className="panel-content">
                        <FormItem label="应用名称"><Input ref="clientName"/></FormItem>
                        <FormItem label="openId"><Input ref="openId"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>

                <div className="table-panel">
                    <Grid url={rootThis.state.url} ref="grid"
                          isTextOverflowHidden={true}
                          columns={[
                              {name: 'openId', header: 'openId', width: 270},
                              {name: 'clientName', header: '应用名称', width: 150},
                              {name: 'descRibe', header: '应用描述', width: 150},
                              {
                                  name: 'operator', header: '操作', content: function (item) {
                                  return (
                                      <div>
                                          <PermissionLink permissionName="user_rel_client" href="Javascript:void(0);" onClick={rootThis._clientResources.bind(this, item)}>&nbsp;&nbsp;查看授权接口&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="user_rel_remove_client" href="Javascript:void(0);" onClick={rootThis._deleteClientRel.bind(this, item)}>&nbsp;&nbsp;取消应用授权&nbsp;&nbsp;</PermissionLink>
                                      </div>
                                  )
                              }
                              }
                          ]}>
                    </Grid>
                    <div className="clearfix"></div>
                </div>
                <ResourceLayer ref="resourceLayer"/>
            </div>
        )
    }
});