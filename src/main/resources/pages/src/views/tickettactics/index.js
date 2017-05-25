/**
 * Created by chenqilin on 2017/5/11.
 */
var Input = UcsmyUI.Input;
var FormItem = UcsmyUI.Form.FormItem;
var Button = UcsmyUI.Button;
var Grid = require('../widget/other/grid');
var PermissionLink = require('../widget/other/permissionLink');
var ClientInfo = require('../client_info/other/viewClientInfo');
var Form = require('./other/form');

myPanel = React.createClass({

    _search: function () {
        this.refs.grid.load({
            clientId: this.refs.clientId.getValue(),
            clientName: this.refs.clientName.getValue()
        });
    },

    _clientDetail: function (item) {
        UcsmyIndex.openChildrenPage(ClientInfo, function(refPanel) {
            refPanel.init(item.ucasClientInfo);
        });
    },

    _edit: function (item) {
        var me = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(item, function(){
                me.refs.clientId.setValue('');
                me.refs.clientName.setValue('');
                me.refs.grid.load();
            });
        });
    },

    render: function () {
        var rootThis = this;
        return(
            <div>
                <h2 className="content-title">ticket策略管理</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="应用id"><Input ref="clientId"/></FormItem>
                        <FormItem label="应用简称"><Input ref="clientName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={rootThis._search}>查询</Button>
                </div>

                <div className="table-panel">
                    <Grid url="clientResgrRel/queryResgrRels" ref="grid"
                            retDataProperty="data.resultList"
                            retTotalProperty="data.totalCount"
                            retCurrentProperty="data.pageNo"
                            isTextOverflowHidden={true}
                          columns={[
                              {name: 'clientId', header: '所属应用id', width: 270},
                              {name: 'clientName', header: '应用简称', width: 150},
                              {name: 'maxTimes', header: '最大使用次数', width: 100},
                              {name: 'expiryTime', header: 'TICKET有效期', width: 100},
                                {name: 'groupName', header: '资源组', width: 100},
                                {name: 'descRibe', header: '资源描述', width: 100},
                              {name: 'cz', header: '操作', content: function (item) {
                                  return (
                                      <div>
                                          <PermissionLink permissionName="token_strategy_query" href="Javascript:void(0);" onClick={rootThis._clientDetail.bind(this, item)}>&nbsp;&nbsp;查看应用详情&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="token_strategy_edit" href="Javascript:void(0);" onClick={rootThis._edit.bind(this, item)}>&nbsp;&nbsp;修改&nbsp;&nbsp;</PermissionLink>
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