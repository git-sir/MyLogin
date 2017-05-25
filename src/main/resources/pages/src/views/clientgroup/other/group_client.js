/**
 * Created by chenqilin on 2017/4/24.
 */
var Button = UcsmyUI.Button;
var Checkbox = UcsmyUI.Checkbox;
var Grid = require('../../widget/other/grid');
var FormItem = UcsmyUI.Form.FormItem;
var Input = UcsmyUI.Input;
var ViewClientInfo = require('../../client_info/other/viewClientInfo');
var SelectDropDown = UcsmyUI.SelectDropDown;

var option = [
    {option : 'authorization_code', value: 'authorization_code'},
    {option : 'password', value: 'password'},
    {option : 'client_credentials', value: 'client_credentials'},
    {option : 'refresh_token', value: 'refresh_token'},
    {option : 'proxy_authorization_code', value: 'proxy_authorization_code'}
];

module.exports = React.createClass({
    getInitialState: function () {
        return {
            gridUrl: '',
            saveUrl: '',
            title: '',
            sign: '',
            data: {},
            cligUuid: '',
            groupName: ''
        }
    },

    init: function (sign, data) {
        var title, saveUrl;
        var gridUrl = "clientGroup/queryClientInfo";
        var queryData = {};
        if (sign == "bind") {
            title = "绑定应用";
            saveUrl = "clientGroup/manageClient";
        } else {
            if (sign == "unbind") {
                title = "解绑应用";
            } else {
                title = "查看应用";
            }
            queryData = {cligUuid: data.cligUuid};
            saveUrl = "clientGroup/manageClient";
        }
        this.setState({
            gridUrl: gridUrl,
            saveUrl: saveUrl,
            title: title,
            data: data,
            sign: sign,
            cligUuid: data.cligUuid,
            groupName: data.groupName
        }, () => {
            this.refs.grid.load(queryData);
        });
    },

    _query: function() {
        this.refs.grid.load({
            cligUuid: this.state.cligUuid,
            clientName: this.refs.clientName.getValue(),
            grantType: this.refs.grantType.getValue()
        });
    },

    _return: function () {
        UcsmyIndex.closeChildrenPage();
    },

    _onClick: function () {
        var me = this;
        var ids = [];
        var obj = document.getElementsByName("selectedId");
        for (var k in obj) {
            if (obj[k].checked)
                ids.push(obj[k].value);
        }
        if (ids.length == 0) {
            UcsmyIndex.alert("异常消息", "请选择要绑定的应用");
            return;
        }
        var d;
        if (this.state.sign == "bind") {
            d = {"cligUuid": this.state.data.cligUuid, "clientIds": ids.join(",")};
        } else {
            d = {"clientIds": ids.join(",")};
        }
        UcsmyIndex.confirm("确定", "是否确定操作选中的应用？", function () {
            _addButtonDisabled('save');
            $.post(me.state.saveUrl, d, function (data) {
                _removeButtonDisabled('save');
                if (data.retcode == "0") {
                    UcsmyIndex.alert("成功", data.retmsg);
                    me._return();
                } else {
                    UcsmyIndex.alert("失败", data.retmsg);
                }
            }, "json").error(function () {
                _removeButtonDisabled('save');
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    _view: function(column) {
        UcsmyIndex.openChildrenPage(ViewClientInfo, function(refPanel) {
            refPanel.init(column);
        });
    },

    render: function () {
        var me = this;
        var btn = [];
        if (this.state.sign == 'bind' || this.state.sign == 'unbind') {
            btn.push(<Button id="save" buttonType="bidnow" onClick={this._onClick}>{this.state.title}</Button>);
        }
        return (
            <div>
                <div>
                    <h2 className="content-title">{this.state.title}</h2>
                    <div className="panel">
                        <div className="panel-title">查询条件</div>
                        <div className="ucs-form-group">
                            <span className="label">应用组名称：</span>
                            <span>{me.state.groupName}</span>
                        </div>
                        <div className="panel-content">
                            <FormItem label="应用简称"><Input ref="clientName"/></FormItem>
                            <FormItem label="授权类型">
                                <SelectDropDown ref="grantType"
                                                defaultText="请选择" defaultValue=""
                                                option={option} searchPlaceholder="请选择"
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._query}>查询</Button>
                    {btn}
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
                <div className="table-panel">
                    <Grid
                        url={this.state.gridUrl} ref="grid"
                        isTextOverflowHidden={true}
                        columns={[{
                            name: '',
                            header: '',
                            content: function (column) {
                                if (this.state.sign == 'bind' || this.state.sign == 'unbind') {
                                    return (
                                        <Checkbox value={column.clientId} name="selectedId"/>
                                    )
                                }
                            }.bind(this)
                        },{
                            name: 'clientName', header: '应用简称', width: 150
                        },{
                            name: 'descRibe', header: '应用描述', width: 200
                        }, {
                            name: 'grantType', header: '授权类型', width: 200
                        }, {
                            name: 'modifyDate', header: '修改时间', width: 150, content: function (item) {
                                var date = new Date(item.modifyDate).format("yyyy/MM/dd hh:mm:ss");
                                return (
                                    <div className="alignLeftWrap">
                                        {date}
                                    </div>
                                )

                            }
                        }, {
                            name: 'cz', header: '操作', content: function (item) {
                                return(
                                    <a href="Javascript:void(0);" onClick={me._view.bind(this, item)}>&nbsp;&nbsp;应用详情&nbsp;&nbsp;</a>
                                )
                            }
                        }]}
                    />
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
});