var TreeTable = UcsmyUI.TreeTable;
var FormPanel = require('./other/moduleForm');
var FormItem = UcsmyUI.Form.FormItem;
myPanel = React.createClass({
    getInitialState: function () {//react组件的初始化状态
        return {
            column: [
                {name: '名称', field: 'name', headerClass: 'header-blank'},
                {name: '描述', field: 'description', headerClass: 'header-blank'},
                {name: '优先级', field: 'priority', headerClass: 'header-blank'},
                {name: '响应地址', field: 'url', headerClass: 'header-blank'},
                {name: '图标', field: 'image',  headerClass:'header-blank'},
                {name: '操作', field: 'cz', headerClass: 'header-blank', setContent: this.operatorValue}
            ],
            treeData: ""
        };
    },
    componentDidMount: function () {
        this._load();
    },
    operatorValue: function (item) {
        var astr = [];
        astr.push(<span><a href="Javascript:void(0);"
                           onClick={this._update.bind(this, item)}>修改</a>&nbsp;&nbsp;&nbsp;</span>);
        astr.push(<span><a href="Javascript:void(0);"
                           onClick={this._add.bind(this, item)}>新增子节点</a>&nbsp;&nbsp;&nbsp;</span>);
        astr.push(<span><a href="Javascript:void(0);" onClick={this._delete.bind(this, item)}>删除</a></span>);
        return astr;
    },
    _update: function (item) {
        var t = this;
        UcsmyIndex.openChildrenPage(FormPanel, function (refPanel) {
            refPanel.open('修改菜单', 'module/update', item, function () {
                t._load();
            });
        });
    },
    _add: function (item) {
        var data = {"parentId": item.id};
        var me = this;
        UcsmyIndex.openChildrenPage(FormPanel, function (refPanel) {
            refPanel.open('添加菜单', 'module/add', data, function () {
                me._load();
            });
        });
    },
    _delete: function (item) {
        var me = this;
        UcsmyIndex.confirm("确定", "是否确定删除该菜单？", function () {
            $.post("module/delete", {"id": item.id}, function (data) {
                if (data.retcode == "0") {
                    UcsmyIndex.alert("消息", data.retmsg);
                    me._load();
                } else {
                    UcsmyIndex.alert("异常消息", data.retmsg);
                }
            }, "json").error(function (xhr, errorText, errorType) {
                UcsmyIndex.alert("失败", "网络加载错误，请稍后再试");
            });
        });
    },
    /**
     * 只能有一个根节点的json树对象
     * 如果有多个根节点或没有数据会报错
     */
    _load: function () {
        var that = this;
        $.post("module/list", function (data) {
            if (data.retcode != '0') {
                UcsmyIndex.alert("失败", data.retmsg);
            } else {
                that.setState({
                    treeData: data.data[0]
                });
            }
        }, "json").error(function (xhr, errorText, errorType) {
            UcsmyIndex.alert("失败", "网络异常");
        });
    },
    render: function () {
        var that = this;
        return (
            <div >
                <h2 className="content-title">菜单管理</h2>
                <div className="table-panel">
                    <TreeTable data={that.state.treeData} id="tableData" column={that.state.column}/>
                </div>
            </div>
        );
    }
});