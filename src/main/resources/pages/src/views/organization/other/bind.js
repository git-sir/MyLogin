var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Checkbox = UcsmyUI.Checkbox;
var Grid = require('../../widget/other/grid');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            title: '',
            operationUrl: '',
            userOrganizationUrl: '',
            id: '',
            organizationName: ''
        }

    },




    init: function (title, operationUrl, userOrganizationUrl, data) {
        this.setState({
            title: title,
            operationUrl: operationUrl,
            userOrganizationUrl: userOrganizationUrl,
            id: data.id,
            organizationName: data.organizationName
        });

    },

    _return: function () {
        UcsmyIndex.closeChildrenPage();
    },

    _bind: function () {

        var idArray = [];
        var obj = document.getElementsByName("userId");
        for(var key = 0; key < obj.length; key++) {
            if(obj[key].checked)
                idArray.push(obj[key].value);
        }
        var ids = idArray.join(',');

        var rootThis = this;
        _addButtonDisabled('save');
        $.post(
            this.state.operationUrl,
            {
                userId: ids,
                organizationId: this.state.id
            },
            function (result) {
                _removeButtonDisabled('save');
                UcsmyIndex.alert("提示", result.retmsg);
                if(result && result.retcode == '0') {
                    rootThis.refs.grid.load();
                }
            }
            , "json").error(function(){
            _removeButtonDisabled('save');
            UcsmyIndex.alert("失败", "网络异常");
        });


    },

    _checkAll: function () {
        UEventHub.emit('checkAllEvent', this.refs.checkAllBox.getChecked());
    },

    callback: function () {
        this.refs.checkAllBox.setChecked(false);

    },

    render: function () {
        if(this.state.userOrganizationUrl == '') {
            return (
                <div></div>
            )
        }

        return (
            <div>
                <h2 className="content-title">{this.state.title } - {this.state.organizationName}</h2>
                <div className="btn-panel">
                    <Button id="save" buttonType="bidnow" onClick={this._bind}>{this.state.title}</Button>
                    <Button buttonType="cancel" onClick={this._return}>取消</Button>
                </div>
                <div className="table-panel">
                    <form id="organizationForm">
                        <Grid
                            url={this.state.userOrganizationUrl} ref = "grid"
                            columns={[
                                {
                                    header: <Checkbox ref="checkAllBox" onChange={this._checkAll} />,
                                    content:function(column){
                                    return (
                                        <Checkbox value={column.userId} name="userId" />
                                    );
                                    }.bind(this)
                                },
                                {
                                    name: 'name', header: '姓名'
                                }
                            ]}
                            callback={this.callback}
                        />
                    </form>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});