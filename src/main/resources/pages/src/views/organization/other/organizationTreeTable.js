var Button = UcsmyUI.Button;
var TreeTable = UcsmyUI.TreeTable;
var Checkbox = UcsmyUI.Checkbox;
var Form = require('./form');
var Bind = require('./bind');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            treeData: {}
        }
    },

    _edit: function (item) {
        var rootThis = this;
        $.post(
            'organization/getOrganization',
            {id: item.id},
            function (result) {
                if(result && result.retcode == "0") {
                    UcsmyIndex.openChildrenPage(Form, function (ref) {
                        ref.init(
                            'organization/editOrganization',
                            '修改组织',
                            function () {
                                rootThis.load();
                            },
                            {
                                organization: result.data
                            }
                        );
                    });
                } else {
                    if(result) {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
            }
        , "json").error(function () {
            UcsmyIndex.alert("失败", "网络异常");
        });
    },


    _add: function (item) {
        var rootThis = this;
        var id = item.id
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(
                'organization/addOrganization',
                '添加组织',
                function () {
                    rootThis.load();
                },
                {
                    parentId: id
                }
            );
        });
    },

    _delete: function (item) {
        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否确定删除该组织？", function() {
            $.post(
                'organization/deleteOrganization',
                {id: item.id},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
                        rootThis.load();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
                , "json").error(function () {
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    componentDidMount: function () {
        this.load();
    },

    load: function () {
        var rootThis = this;
        $.post(
            'organization/queryOrganization',
            {},
            function (result) {
                if(result && result.retcode == "0") {
                    rootThis.setState({
                        treeData: result.data.length == 1 ? result.data[0] : result.data
                    });
                } else {
                    if (result.retmsg) {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
            }
        , "json").error(function () {
            UcsmyIndex.alert("提示", "网络异常");
        });
    },

    _bind: function (item) {
        var id = item.id;
        var name = item.name;
        UcsmyIndex.openChildrenPage(Bind, function (ref) {
            ref.init(
                '用户绑定',
                'organization/bindOrganization',
                'organization/queryUserWithoutOrganization?id=' + id,
                {
                    id: id,
                    organizationName: name
                }
            );
        });
    },

    _unbind: function (item) {
        var id = item.id;
        var name = item.name;
        UcsmyIndex.openChildrenPage(Bind, function (ref) {
            ref.init(
                '用户解绑',
                'organization/unbindOrganization',
                'organization/queryUserWithOrganization?id=' + id,
                {
                    id: id,
                    organizationName: name
                }
            );
        });

    },

    render: function () {
        var rootThis = this;
        return (
            <div>
                <TreeTable data={this.state.treeData} id="treetableid"
                    column={[
                    {name: '名称', field: 'name', headerClass: 'header-blank', width: 200} ,
                    {name: '描述', field: 'description', headerClass: 'header-blank'},
                    {name: '优先级', field: 'priority', headerClass: 'header-blank',width: 100},
                    {name: '操作', headerClass: 'header-blank',width: 300, setContent:function (item) {
                        return (
                                <span>
                                    <a href="Javascript:void(0);" onClick={rootThis._edit.bind(this,item)}>修改</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="Javascript:void(0);" onClick={rootThis._add.bind(this,item)}>新增</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="Javascript:void(0);" onClick={rootThis._delete.bind(this,item)}>删除</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="Javascript:void(0);" onClick={rootThis._bind.bind(this,item)}>用户绑定</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="Javascript:void(0);" onClick={rootThis._unbind.bind(this,item)}>用户解绑</a>
                                </span>
                            )
                    }}
                ]} />
            </div>
        )
    }

});