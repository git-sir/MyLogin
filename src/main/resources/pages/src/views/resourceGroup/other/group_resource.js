/**
 * Created by chenqilin on 2017/5/3.
 */
var Button = UcsmyUI.Button;
var Grid = require('../../widget/other/grid');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            gridUrl: null,
            resGroupUuid: '',
            groupName: ''
        }
    },

    init: function (data) {
        var query = {
            resGroupUuid: data.resGroupUuid
        };
        this.setState({
            gridUrl: 'clientResource/queryResource',
            resGroupUuid: data.resGroupUuid,
            groupName: data.groupName,
        }, () => {
            this.refs.grid.load(query);
        });
    },

    _query: function() {
        var rootThis = this;
        this.refs.grid.load({
            resGroupUuid: rootThis.state.resGroupUuid
        });
    },

    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },

    render: function () {
        var me = this;
        return (
            <div>
                <div>
                    <h2 className="content-title">查看资源</h2>
                    <div className="panel">
                        <div className="panel-title">查询条件</div>
                        <div className="ucs-form-group">
                            <span className="label">资源组ID：</span>
                            <span>{me.state.resGroupUuid}</span>
                        </div>
                        <div className="ucs-form-group">
                            <span className="label">资源组名称：</span>
                            <span>{me.state.groupName}</span>
                        </div>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._return}>返回</Button>
                </div>
                <div className="table-panel">
                    <Grid
                        url={this.state.gridUrl} ref="grid"
                        isTextOverflowHidden={true}
                        columns={[
                            {name: 'resUri', header: '资源URI', width: 250},
                            {name: 'descRibe', header: '资源描述', width: 300},
                            {name: 'status', header: '状态', width: 50, content: function (item) {
                                var statusText = '正常';
                                if (item.status == '1') {
                                    statusText = '失效';
                                }
                                return (
                                    <span>
                                          {statusText}
                                      </span>
                                )
                            }},
                            {name: 'modifyDate', header: '修改时间', content: function (item) {
                                var date = new Date(item.modifyDate).format("yyyy/MM/dd hh:mm:ss");
                                return (
                                    <div className="alignLeftWrap">
                                        {date}
                                    </div>
                                )
                            }}
                        ]}
                    />
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
});