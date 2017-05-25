/**
 * Created by chenqilin on 2017/4/21.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Radio = UcsmyUI.Radio;
var RadioGroup = Radio.RadioGroup;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;

var formData = {
    "groupName": [
        {type: "required", msg: "应用组名称不能为空"},
        {type : "maxlength", maxlength : 50, msg : "应用组名称长度不能超过50"}
    ],
    "descRibe": [
        {type: "required", msg: "应用组描述不能为空"},
        {type : "maxlength", maxlength : 200, msg : "应用组描述长度不能超过200"}
    ]
};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            clientGroup: {}
        }
    },

    init: function (url, title, callback, data) {
        this.setState({
            url: url,
            title: title,
            callback: callback,
            clientGroup: data.clientGroup ? data.clientGroup : {}
        });

    },

    _validate: function (callback) {
        var validateField = [
            "groupName", "descRibe"
        ];

        var fn = function (result) {
            if(result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);
    },



    _saveOrUpdate: function () {
        var rootThis = this;
        this._validate(function(){
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
                }
                , "json").error(function () {
                    _removeButtonDisabled('save');
                    UcsmyIndex.alert("失败", "网络异常");
                }
            );
        });
    },

    _return: function(event) {
        UcsmyIndex.closeChildrenPage();
    },

    render: function () {
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">{this.state.title}</div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={formData}>
                            <input type="hidden" name="cligUuid" value={this.state.clientGroup.cligUuid} />
                            <FormItem label="应用组名称" className="col-xs-5"><Input value={this.state.clientGroup.groupName} name="groupName" /></FormItem>
                            <FormItem label="应用组描述" className="col-xs-5"><Input value={this.state.clientGroup.descRibe} name="descRibe" /></FormItem>
                            <FormItem label="是否单点登录" className="col-xs-5">
                                <RadioGroup name="isSso" value={this.state.clientGroup.isSso == null ? "0" : this.state.clientGroup.isSso}>
                                    <Radio value="1"><span style={{"padding-left": "20px"}}>是</span></Radio>
                                    <Radio value="0"><span style={{"padding-left": "20px"}}>否</span></Radio>
                                </RadioGroup>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button id="save" buttonType="bidnow" onClick={this._saveOrUpdate}>保存</Button>
                    <Button buttonType="cancel" onClick={this._return}>取消</Button>
                </div>

            </div>
        )
    }
});