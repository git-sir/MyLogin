/**
 * Created by chenqilin on 2017/5/11.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = UcsmyUI.Form.FormItem;
var ClientInfo = require('../../client_info/other/viewClientInfo');

var formData = {

    "maxTimes": [
        {type: "required", msg: "最大使用次数不能为空"},
        {type: "digits", msg: "最大使用次数只能为数字"},
        {type : "maxlength", maxlength : 10, msg : "参数值长度不能超过10"}
    ],
    "expiryDate": [
        {type: "digits", msg: "Token时效只能为数字"},
        {type: "required", msg: "Token时效不能为空"},
        {type : "maxlength", maxlength : 10, msg : "参数值长度不能超过10"}
    ],
    "refreshExpiryDate": [
        {type: "digits", msg: "刷新Token时效只能为数字"},
        {type: "required", msg: "刷新Token时效不能为空"},
        {type : "maxlength", maxlength : 10, msg : "参数值长度不能超过10"}
    ]

};
module.exports = React.createClass({

    getInitialState: function () {
        return {
            data: {},
            url: "tokenStrategy/update",
            successFn: function() {}
        }
    },

    init: function (data, successFn) {
        this.refs.clientInfo.init(data.ucasClientInfo, false, false);
        this.setState({
            data: data,
            successFn: successFn
        })
    },

    _validate: function (callback) {
        var status = false;
        var validateField = [
            "maxTimes", "expiryDate", "refreshExpiryDate"
        ];
        var fn = function (result) {
            console.log(result);
            if(result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },

    _return: function(event) {
        UcsmyIndex.closeChildrenPage();
    },

    _save: function(event) {
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
                        rootThis.state.successFn();
                        rootThis._return();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }, "json").error(function(xhr, errorText, errorType){
                _removeButtonDisabled('save');
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    render: function () {
        var rootThis = this;
        return(
            <div>
                <ClientInfo ref="clientInfo"/>
                <div className="panel">
                    <div className="panel-title fc-red">修改Token策略</div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={formData}>
                            <input type="hidden" name="uuid" value={rootThis.state.data.uuid} />
                            <input type="hidden" name="clientId" value={rootThis.state.data.clientId} />
                            <FormItem label="最大使用次数">
                                <Input name="maxTimes" value={rootThis.state.data.maxTimes} />
                            </FormItem>
                            <FormItem label="Token时效">
                                <Input name="expiryDate" value={rootThis.state.data.expiryDate} placeholder="单位（秒）"/>
                            </FormItem>
                            <FormItem label="刷新Token时效">
                                <Input name="refreshExpiryDate" value={rootThis.state.data.refreshExpiryDate} placeholder="单位（秒）"/>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button id="save" buttonType="bidnow" onClick={rootThis._save}>保存</Button>
                    <Button buttonType="cancel" onClick={rootThis._return}>取消</Button>
                </div>
            </div>
        )
    }
});