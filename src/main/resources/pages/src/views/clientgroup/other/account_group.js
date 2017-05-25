/**
 * Created by chenqilin on 2017/5/15.
 */
var Button = UcsmyUI.Button;
var Input = UcsmyUI.Input;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../../widget/other/grid');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            gridUrl: '',
            cligUuid: ''
        }
    },

    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },

    _search: function () {
        this.refs.grid.load({
            cligUuid: this.state.cligUuid,
            groupName : this.refs.groupName.getValue()
        });
    },

    init: function (data) {
        var query = {
            cligUuid: data.cligUuid
        };
        this.setState({
            gridUrl: 'accountGroup/queryByClientGroup',
            cligUuid: data.cligUuid
        }, () => {
            this.refs.grid.load(query);
        })
    },

    render: function () {
        return (
            <div>
                <h2 className="content-title">{this.state.title}</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="账号组名称"><Input ref="groupName"/></FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
                <div className="table-panel">
                    <Grid
                        url={this.state.gridUrl} ref="grid"
                        isTextOverflowHidden={true}
                        columns={[{
                            name: 'groupName', header: '账号组名称', width: 300
                        },{
                            name: 'descRibe', header: '账号组描述'
                        }]}
                    />
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
});