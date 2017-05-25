/**
 * Created by chenqilin on 2017/4/24.
 */
var Button = UcsmyUI.Button;
var Checkbox = UcsmyUI.Checkbox;
var Grid = require('../../widget/other/grid');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            gridUrl: '',
            saveUrl: '',
            title: '',
            sign: '',
            data: {}
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
            title = "解绑应用组";
            queryData = {accgUuid : data.accgUuid};
            saveUrl = "accountGroup/manageClientGroup";
        }
        this.setState({
            gridUrl: gridUrl,
            saveUrl: saveUrl,
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
        return (
            <div>
                <div className="btn-panel">
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
                <div className="table-panel">
                    <Grid
                        url={this.state.gridUrl} ref="grid"
                        columns={[{
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