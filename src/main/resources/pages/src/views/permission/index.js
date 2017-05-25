var Header = require('../../common/Header');
var LeftMemu = require('../../common/LeftMenu');
var Content = require('../../common/Content');
var PermissionForm = require('./other/permissionForm');
var Input = UcsmyUI.Input;
var Layer = UcsmyUI.Layer;
var Button = UcsmyUI.Button;
var TreeTable = UcsmyUI.TreeTable;
var Table = UcsmyUI.Table;
var FormItem = UcsmyUI.Form.FormItem;

myPanel = React.createClass({
    getInitialState: function () {
        return {
            treeData: {},
            permissionData: [],
            dataId: '',
            treeColumn: [
                {name: '', field: 'name', headerClass: 'ucs-treeTable-th', setContent: this.get}
            ]
        }
    },
    componentDidMount: function () {
        var me = this;
        $.post("module/list", function (data) {
            me.setState({treeData: data.data[0]});
        }, "json").error(function (xhr, errorText, errorType) {
            UcsmyIndex.alert("失败", "网络异常");
        });
    },
    get: function (item) {
        return <a className="treeItem" name={item.id} onClick={this._handleclick.bind(this, item)}>{item.name}</a>
    },
    _handleclick: function (item) {
        var me = this;
        var id = item.id;
        var subchild = getElementsByClassName('treeItem', 'a');
        for (var i = 0; i < subchild.length; i++) {
            subchild[i].className = (subchild[i].name == id ? "treeItem current" : "treeItem");
        }

        me.setState({dataId: item.id});
        me._loadPermission(item.id);
    },
    _loadPermission: function (moduleId) {
        var me = this;
        $.post("permission/list", {'id': moduleId}, function (data) {
            me.setState({permissionData: data.data});
        }, "json").error(function (xhr, errorText, errorType) {
            UcsmyIndex.alert("失败", "网络异常");
        });
    },
    _addPermission: function (e) {
        var me = this;
        if (UcsmyIndex.fn.isEmpty(this.state.dataId))
            return;

        var data = {moduleId: me.state.dataId};
        UcsmyIndex.openChildrenPage(PermissionForm, function (refPanel) {
            refPanel.open('添加权限', 'permission/add', data, function () {
                me._loadPermission(me.state.dataId);
            });
        });
    },
    _update: function (item) {
        var me = this;
        UcsmyIndex.openChildrenPage(PermissionForm, function (refPanel) {
            refPanel.open('修改权限', 'permission/update', item, function () {
                me._loadPermission(item.moduleId);
            });
        });
    },
    _delete: function (item) {
        var me = this;
        UcsmyIndex.confirm("确定", "是否确定删除该权限？", function () {
            $.post("permission/delete", {"permissionId": item.permissionId}, function (data) {
                if (data.retcode == "0") {
                    UcsmyIndex.alert("消息", data.retmsg);
                    me._loadPermission(item.moduleId);
                } else {
                    UcsmyIndex.alert("异常消息", data.retmsg);
                }
            }, "json").error(function (xhr, errorText, errorType) {
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },
    render: function () {
        var me = this;
        return (
            <div>
                <h2 className="content-title">权限管理</h2>
                <div className="panel">
                    <div className="panel-content">
                        <div className="organizationTree">
                            <TreeTable data={this.state.treeData} column={this.state.treeColumn} id="tabletest"
                                       showLine={true} showIcon={false}/>
                        </div>
                        <div className="organizationTable">
                            <div className="btn-panel">
                                <Button buttonType={UcsmyIndex.fn.isEmpty(this.state.dataId) ? "disabled" : "bidnow"}
                                        onClick={this._addPermission}>添加权限</Button>
                            </div>
                            <Table id="mytable" bordered={true} striped={true} hover={true} hasThead={true}
                                   data={this.state.permissionData}
                                   isTextOverflowHidden={true}
                                   columns={[{
                                       name: 'name', header: '名称', width: 140
                                   }, {
                                       name: 'description', header: '描述', width: 150
                                   }, {
                                       name: 'sn', header: '判断标识', width: 200
                                   }, {
                                       name: 'urlAction', header: '资源URL', width: 300
                                   }, {
                                       name: 'cz', header: '操作', width:100,
                                       content: function (item) {
                                           return (
                                               <span>
                                                <a href="Javascript:void(0);"
                                                   onClick={me._update.bind(this, item)}>修改</a>
                                                   &nbsp;&nbsp;&nbsp;&nbsp;
                                                   <a href="Javascript:void(0);" onClick={me._delete.bind(this, item)}>删除</a>
                                            </span>
                                           )
                                       }
                                   }]}/>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        )
    }
})
