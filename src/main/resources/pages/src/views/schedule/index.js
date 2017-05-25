var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Grid = require('../widget/other/grid');
var Form = require('./other/form');
var FormItem = UcsmyUI.Form.FormItem;



myPanel = React.createClass({


    getInitialState: function () {
        return {
            
        }
    },

    _add: function () {
        var rootThis = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(
                'schedule/add',
                '添加定时任务',
                function () {
                    rootThis.refs.grid.load();
                },
                {
                    data: {}
                }
            );
        });
    },

    _edit: function (item) {
        var rootThis = this;
        UcsmyIndex.openChildrenPage(Form, function (ref) {
            ref.init(
                'schedule/update',
                '修改定时任务',
                function () {
                    rootThis.refs.grid.load();
                },
                {
                    schedule: item
                }
            );
        });
    },

    _delete: function (item) {

        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否确定删除该定时任务？", function() {
            $.post(
                'schedule/delete',
                {id: item.id},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
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

    _search: function () {
        this.refs.grid.load({
            taskName: this.refs.taskName.getValue()
        });
    },

    _start: function (item) {

        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否启用定时任务？", function() {
            $.post(
                'schedule/start',
                {id: item.id},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
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

    _stop: function (item) {

        var rootThis = this;

        UcsmyIndex.confirm("确定", "是否停用定时任务？", function() {
            $.post(
                'schedule/stop',
                {id: item.id},
                function (result) {
                    if(result && result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
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
    
    render: function () {
        var rootThis = this;

        return (
            <div>
                <h2 className="content-title">定时管理</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="任务名称"><Input ref="taskName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                    <Button buttonType="bidnow" onClick={this._add}>添加</Button>
                </div>

                <div className="table-panel">
                    <Grid url="schedule/list" ref = "grid"
                          isTextOverflowHidden={true}
                          columns={[
                              {name: 'taskCode', header: '任务码', width: 80},
                              {name: 'taskName', header: '任务名称', width: 80},
                              {name: 'taskConf', header: '定时配置', width: 100},
                              {name: 'taskClass', header: '执行地址', width: 200},
                              {name: 'taskServerIp', header: '指定IP', width: 100},
                              {name: 'status', header: '状态', width: 100, content: function (item) {
                                  var statusText = '已停用';
                                  if(item.status == 1) {
                                      statusText = '已启用';
                                  }
                                  return (
                                      <span>
                                          {statusText}
                                      </span>
                                  )
                              }},
                              {name: 'remark', header: '备注', width: 100},
                              {name: 'id', header: '操作', width: 200, content: function (item) {
                                  return (
                                      <span>
                                        <a href="Javascript:void(0);" onClick={rootThis._edit.bind(this, item)}>修改</a>
                                          &nbsp;&nbsp;&nbsp;&nbsp;
                                          <a href="Javascript:void(0);" onClick={rootThis._delete.bind(this, item)}>删除</a>
                                          &nbsp;&nbsp;&nbsp;&nbsp;
                                          <a href="Javascript:void(0);" onClick={rootThis._start.bind(this, item)}>启用</a>
                                          &nbsp;&nbsp;&nbsp;&nbsp;
                                          <a href="Javascript:void(0);" onClick={rootThis._stop.bind(this, item)}>停用</a>
                                    </span>
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
