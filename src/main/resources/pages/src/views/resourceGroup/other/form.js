/**
 * Created by chenqilin on 2017/5/2.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = UcsmyUI.Form.FormItem;


var formData = {
    "groupName": [
        {type: "required", msg: "资源组名称不能为空"},
        {type: "maxlength", maxlength: 50, msg: "资源组名称长度不能超过50"}
    ],
    "descRibe": [
        {type: "required", msg: "资源组描述不能为空"},
        {type: "maxlength", maxlength: 200, msg: "资源组描述长度不能超过200"}
    ]
};

module.exports = React.createClass({

    getInitialState: function () {
        return {
            data: {},
            url: "resourceGroup/update"
        }
    },

    init: function (item, callback) {
        this.setState({
            data: item.resGroup ? item.resGroup : {},
            callback: callback
        });
    },

    _validate: function (callback) {
        var validateField = [
            "groupName", "descRibe"
        ];

        var fn = function (result) {
            if (result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);
    },

    _saveOrUpdate: function () {
        var rootThis = this;
        this._validate(function () {
            _addButtonDisabled('save');
            $.post(
                rootThis.state.url,
                $('#form').serialize(),
                function (result) {
                    _removeButtonDisabled('save');
                    if (result.retcode == "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
                        UcsmyIndex.closeChildrenPage();
                        rootThis.state.callback();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }, "json").error(function(xhr, errorText, errorType){
                _removeButtonDisabled('save');
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },

    render: function () {
        var rootThis = this;
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">修改资源组</div>
                    <div className="ucs-form-group">
                        <span className="label">应用ID：</span>
                        <span>{rootThis.state.data.clientId}</span>
                    </div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={formData}>
                            <input type="hidden" name="resGroupUuid" value={rootThis.state.data.resGroupUuid} />
                            <input type="hidden" name="clientId" value={rootThis.state.data.clientId} />
                            <FormItem label="资源组名称" className="col-xs-5"><Input name="groupName" value={rootThis.state.data.groupName}/></FormItem>
                            <FormItem label="资源组描述" className="col-xs-5"><Input name="descRibe" value={rootThis.state.data.descRibe}/></FormItem>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button id="save" buttonType="bidnow" onClick={this._saveOrUpdate}>保存</Button>
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
            </div>
        )
    }
});