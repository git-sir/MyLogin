/**
 * Created by chenqilin on 2017/4/24.
 */
var Button = UcsmyUI.Button;
var Checkbox = UcsmyUI.Checkbox;
var Grid = require('../../widget/other/grid');
var FormItem = UcsmyUI.Form.FormItem;
var Input = UcsmyUI.Input;
module.exports = React.createClass({
    getInitialState: function () {
        return {
            gridUrl: '',
            saveUrl: '',
            title: '',
            sign: '',
            data: {},
            accgUuid:''
        }
    },
    init: function (sign, data, successFn) {// sign: bind or unbind
        var title, saveUrl,accgUuid;
        var gridUrl = "accountGroup/queryAccountInfo";;
        var queryData = {};
        if (sign == "bind") {
            title = "绑定用户";
            saveUrl = "accountGroup/manageAccount";
        } else {
            title = "解绑用户";
            queryData = {accgUuid : data.accgUuid};
            saveUrl = "accountGroup/manageAccount";
            accgUuid = data.accgUuid;
        }
        this.setState({
            gridUrl: gridUrl,
            saveUrl: saveUrl,
            title: title,
            data: data,
            sign: sign,
            accgUuid:accgUuid
        }, () => {
            this.refs.grid.load(queryData);
        });
    },
    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },
    _query: function() {
        this.refs.grid.load({
            ucasAccount: this.refs.ucasAccount.getValue(),
            emailAccount: this.refs.emailAccount.getValue(),
            mobileAccount: this.refs.mobileAccount.getValue(),
            accgUuid:this.state.accgUuid
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
            UcsmyIndex.alert("异常消息", "请选择要绑定的用户");
            return;
        }
        var d;
        if (this.state.sign == "bind") {
            d = {"accgUuid": this.state.data.accgUuid, "accountIds": ids.join(",")};
        } else {
            d = {"accountIds": ids.join(",")};
        }
        UcsmyIndex.confirm("确定", "是否确定操作选中的用户？", function () {
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

                <div className="panel">
                     <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                            <FormItem label="网金帐号"><Input ref="ucasAccount"/></FormItem>
                            <FormItem label="邮箱帐号"><Input ref="emailAccount"/></FormItem>
                            <FormItem label="手机帐号"><Input ref="mobileAccount"/></FormItem>
                     </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._query}>查询</Button>
                    <Button buttonType="bidnow" onClick={this._onClick}>{this.state.title}</Button>
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
                <div className="table-panel">
                    <Grid
                        url={this.state.gridUrl} ref="grid"
                        columns={[{
                            name: 'accUuid',
                            header: "",
                             width: 50,
                            content: function (item) {
                                return (
                                    <Checkbox value={item.accUuid} name="selectedId"/>
                                );
                            }.bind(this)
                        }, {
                            name: 'ucasAccount', header: '用户网金账号', width: 150
                        }, {
                            name: 'realName', header: '用户名称', width: 150
                        },
                        {
                            name: 'emailAccount', header: '邮箱帐号', width: 150
                        }, {
                            name: 'mobileAccount', header: '手机帐号', width: 150
                        },{
                            name: 'mobilePhone', header: '用户手机号'
                        }]}
                    />
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
});