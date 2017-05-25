var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;


var configFormData = {

    "groupName": [
        {type: "required", msg: "账号组名称不能为空"},
        {type : "maxlength", maxlength : 50, msg : "账号组名称长度不能超过50"}
    ],
    "descRibe": [
        {type: "required", msg: "账号组描述不能为空"},
        {type : "maxlength", maxlength : 200, msg : "账号组描述长度不能超过200"}
    ]

};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            ucasAccountGroup: {}
        }
    },
    _validate: function (callback) {
        var status = false;
        var validateField = [
            "groupName", "descRibe"
        ];
        var fn = function (result) {
            if(result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },
    _saveOrUpdate: function () {

        var me = this;
        this._validate(function(){
            $.post(me.state.url,
                $('#saveForm').serialize(),
                function (result) {
                if (result && result.retcode && result.retcode == "0") {
                    UcsmyIndex.alert("提示", result.retmsg);
                    UcsmyIndex.closeChildrenPage();
                    me.state.callback();
                } else {
                    UcsmyIndex.alert("提示","失败");
                }
            });
        });
    },
    init: function (url, title, data, callback) {
        this.setState({
            title: title,
            url: url,
            ucasAccountGroup: data,
            callback: callback,
        });
    },
    _return: function () {
        UcsmyIndex.closeChildrenPage();
    },
    render: function () {
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">{this.state.title}</div>
                    <div className="panel-content">
                        <Form ref="saveForm" formData={configFormData} id="saveForm">
                            <input type="hidden" name="accgUuid" value={this.state.ucasAccountGroup.accgUuid}/>
                            <FormItem label="用户组名称"><Input name="groupName"  value={this.state.ucasAccountGroup.groupName}/></FormItem>
                            <FormItem label="用户组描述"><Input name="descRibe"  value={this.state.ucasAccountGroup.descRibe}/></FormItem>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._saveOrUpdate}>保存</Button>
                    <Button buttonType="cancel" onClick={this._return}>取消</Button>
                </div>
            </div>
        )
    }
});