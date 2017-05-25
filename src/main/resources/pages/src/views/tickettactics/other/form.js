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
        {type:"maxlength", maxlength:9, msg : "使用次数长度不能超过9"},
        {type: "fn", validator: function(value){
            if(""!==value) {

                var m =/^[1-9]*[1-9][0-9]*$/;

                return m.test(value);
            }else return true;
        }, msg: '使用次数只能为正整数'
        }
    ],
    "expiryTime": [
        {type:"maxlength", maxlength:9, msg : "有效时间长度不能超过9"},
        {type: "fn", validator: function(value){
            if(""!==value) {
                var m =/^[1-9]*[1-9][0-9]*$/;

                return m.test(value);
            }else return true;
        }, msg: '有效时间只能为正整数'
        }
    ]

};
module.exports = React.createClass({

    getInitialState: function () {
        return {
            data: {},
            url: "clientResgrRel/updateTicket",
            successFn: function() {}
        }
    },

    init: function (data, successFn) {
        this.refs.clientInfo.init(data.ucasClientInfo);
        this.setState({
            data: data,
            successFn: successFn
        })
        this.refs.clientInfo.setState({
            showReturn:null,
            showTokenStrategy : false
        })
    },

    _validate: function (callback) {
        var status = false;
        var validateField = [
            "maxTimes", "expiryTime"
        ];
        var fn = function (result) {
            if(result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },

    _return: function() {
        UcsmyIndex.closeChildrenPage();
    },

    _save: function() {
        var rootThis = this;
        this._validate(function () {
            $.post(
                rootThis.state.url,
                $('#form').serialize(),
                function (result) {
                    if (result.retcode === "0") {
                        UcsmyIndex.alert("提示", result.retmsg);
                        rootThis.state.successFn();
                        rootThis._return();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                }
            );
        });
    },

    render: function () {
        var rootThis = this;
        return(
            <div>
                <ClientInfo ref="clientInfo"/>
                <div className="panel">
                    <div className="panel-title fc-red">修改ticket策略</div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={formData}>
                            <input type="hidden" name="uuid" value={rootThis.state.data.uuid} />
                            <FormItem label="最大使用次数">
                                <Input name="maxTimes" value={rootThis.state.data.maxTimes} />
                            </FormItem>
                            <FormItem label="ticket时效">
                                <Input name="expiryTime" value={rootThis.state.data.expiryTime} placeholder="单位（秒）"/>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={rootThis._save}>保存</Button>
                    <Button buttonType="cancel" onClick={rootThis._return}>取消</Button>
                </div>
            </div>
        )
    }
});