/**
 * Created by chenqilin on 2017/5/4.
 */
var Button = UcsmyUI.Button;
var Tooltip=UcsmyUI.Tooltip;
module.exports = React.createClass({

    getInitialState: function () {
        return {
            group: {}
        }
    },

    init: function(data) {
        this.setState({
            group: data
        });
    },

    _return: function() {
        UcsmyIndex.closeChildrenPage();
    },

    render: function(){
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">资源组信息</div>
                    <div className="panel-content">
                        <div className="ucs-form-group">
                            <span className="label">应用简称：</span>
                            <div className="custom-tooltip">
                                <Tooltip title={this.state.group.clientName}>
                                    {this.state.group.clientName}
                                </Tooltip>
                            </div>
                        </div>
                        <div className="ucs-form-group">
                            <span className="label">所属应用id：</span>
                            <span>{this.state.group.clientId}</span>
                        </div>

                        <div className="ucs-form-group">
                            <span className="label">资源组名称：</span>

                            <div className="custom-tooltip">
                                <Tooltip title={this.state.group.groupName}>
                                    {this.state.group.groupName}
                                </Tooltip>
                            </div>

                        </div>
                        <div className="ucs-form-group">
                            <span className="label">资源组UUID：</span>
                            <span>{this.state.group.resGroupUuid}</span>
                        </div>

                        <div className="ucs-form-group">
                            <span className="label">资源组描述：</span>

                            <div className="custom-tooltip">
                                <Tooltip title={this.state.group.descRibe}>
                                    {this.state.group.descRibe}
                                </Tooltip>
                            </div>

                        </div>
                 </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._return}>返回</Button>
                </div>
            </div>
        )
    }
});