var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;


var configFormData = {

    "paramKey": [
        {type: "required", msg: "参数名称不能为空"},
        {type : "maxlength", maxlength : 50, msg : "参数名称长度不能超过50"}
    ],
    "paramValue": [
        {type: "required", msg: "参数值不能为空"},
        {type : "maxlength", maxlength : 2000, msg : "参数值长度不能超过2000"}
    ],
    "paramDesc": [
        {type: "required", msg: "参数描述不能为空"},
        {type : "maxlength", maxlength : 200, msg : "参数描述长度不能超过200"}
    ]

};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            config: {}
        }
    },
    _validate: function (callback) {
        var status = false;
        var validateField = [
            "paramKey", "paramValue", "paramDesc"
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
            _addButtonDisabled('save');
            $.post(me.state.url,
                $('#saveForm').serialize(),
                function (result) {
                _removeButtonDisabled('save');
                if (result.retcode == "0") {
                    UcsmyIndex.alert("提示", result.retmsg);
                    UcsmyIndex.closeChildrenPage();
                    me.state.callback();
                } else {
                    UcsmyIndex.alert("提示", result.retmsg);
                }
            }, "json").error(function(){
                _removeButtonDisabled('save');
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },
    init: function (url, title, data, callback) {
        this.setState({
            title: title,
            url: url,
            config: data,
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
                            <input type="hidden" name="id" value={this.state.config.id}/>
                            <FormItem label="参数名称"><Input name="paramKey"  value={this.state.config.paramKey}/></FormItem>
                            <FormItem label="参数值"><Input name="paramValue"  value={this.state.config.paramValue}/></FormItem>
                            <FormItem label="参数描述"><Input name="paramDesc"  value={this.state.config.paramDesc}/></FormItem>
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