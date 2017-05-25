/**
 * Created by chenqilin on 2017/4/24.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Checkbox = UcsmyUI.Checkbox;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../../widget/other/grid');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            gridUrl: '',
            saveUrl: '',
            title: '',
            sign: '',
            data: {},
            accgUuid: ''
        }
    },
    init: function (sign, data, successFn) {// sign: bind or unbind
        var title, saveUrl;
        var gridUrl = "accountGroup/queryClientGroupInfo";
        var queryData = {};
        if (sign == "bind") {
            title = "绑定应用组";
            queryData = {"status" : "bind",accgUuid : data.accgUuid};
            saveUrl = "accountGroup/manageClientGroup";
        } else {
            if (sign == "unbind") {
                title = "解绑应用组";
            } else {
                title = "查看应用组"
            }
            queryData = {accgUuid : data.accgUuid};
            saveUrl = "accountGroup/manageClientGroup";
        }
        this.setState({
            gridUrl: gridUrl,
            saveUrl: saveUrl,
            accgUuid: data.accgUuid,
            title: title,
            data: data,
            sign: sign
        }, () => {
            this.refs.grid.load(queryData);
        });
    },
    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },
    _search: function () {
        var status = '';
        if (this.state.sign == 'bind') {
            status = 'bind';
        }
        this.refs.grid.load({
            status: status,
            accgUuid: this.state.accgUuid,
            groupName : this.refs.groupName.getValue()
        });
    },
    _onClick: function (event) {
        var me = this;
        var ids = [];
        var obj = document.getElementsByName("selectedId");
        for (k in obj) {
            if (obj[k].checked)
                ids.push(obj[k].value);
        }
        if (ids.length == 0) {
            UcsmyIndex.alert("异常消息", "请选择要绑定的应用组");
            return;
        }
        var d;
        if (this.state.sign == "bind") {
            d = {"accgUuid": this.state.data.accgUuid, "cligUuids": ids.join(","),"type":"bind"};
        } else {
            d = {"accgUuid": this.state.data.accgUuid,"cligUuids": ids.join(","),"type":"unbind"};
        }
        UcsmyIndex.confirm("确定", "是否确定操作选中的应用组？", function () {
            $.post(me.state.saveUrl, d, function (data) {
                if (data.retcode == "0") {
                    UcsmyIndex.alert("成功", data.retmsg);
                    me._return();
                } else {
                    UcsmyIndex.alert("失败", data.retmsg);
                }
            }, "json").error(function (xhr, errorText, errorType) {
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },
    render: function () {
        var btn = [];
        if (this.state.sign == 'bind' || this.state.sign == 'unbind') {
            btn.push(<Button buttonType="bidnow" onClick={this._onClick}>{this.state.title}</Button>);
        }
        return (
            <div>
                <h2 className="content-title">{this.state.title}</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="应用组名称"><Input ref="groupName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                    {btn}
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
                <div className="table-panel">
                    <Grid
                        url={this.state.gridUrl} ref="grid"
                        columns={[{
                            name: 'cligUuid',
                            header: "",
                             width: 50,
                            content: function (item) {
                                if (this.state.sign == 'bind' || this.state.sign == 'unbind') {
                                    return (
                                        <Checkbox value={item.cligUuid} name="selectedId"/>
                                    )
                                }
                            }.bind(this)
                        }, {
                            name: 'groupName', header: '应用组名称', width: 200
                        },{
                            name: 'descRibe', header: '应用组描述'
                        }]}
                    />
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
});