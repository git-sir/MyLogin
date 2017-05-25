var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;


var scheduleFormData = {

    "taskCode": [
        {type: "required", msg: "任务码不能为空"},
        {type : "maxlength", maxlength : 100, msg : "参数名称长度不能超过100"}
    ],
    "taskName": [
        {type: "required", msg: "任务名称不能为空"},
        {type : "maxlength", maxlength : 100, msg : "参数值长度不能超过100"}
    ],
    "taskConf": [
        {type: "required", msg: "定时配置不能为空"},
        {type : "maxlength", maxlength : 100, msg : "参数描述长度不能超过100"}
    ],
    "taskClass": [
        {type: "required", msg: "执行地址不能为空"},
        {type : "maxlength", maxlength : 100, msg : "参数描述长度不能超过100"}
    ],
    "taskServerIp": [
        {type: "required", msg: "指定IP不能为空"},
        {type : "maxlength", maxlength : 100, msg : "参数描述长度不能超过100"}
    ],
    "remark": [
        {type: "required", msg: "备注不能为空"},
        {type : "maxlength", maxlength : 250, msg : "参数描述长度不能超过250"}
    ]
};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            schedule: {}
        }
    },
    _validate: function (callback) {
        var status = false;
        var validateField = [
            "taskCode", "taskName", "taskConf", "taskClass", "taskServerIp", "remark"
        ];

        var fn = function (result) {
            if(result) {
                callback();
            }
        }

        this.refs.saveForm.validate(fn, validateField);

        return status;
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
                }, "json").error(function(){
                _removeButtonDisabled('save');
                UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },

    init: function (url, title, callback, data) {
        this.setState({
            url: url,
            title: title,
            callback: callback,
            schedule: data.schedule ? data.schedule : {}
        });

    },

    _return: function() {
        UcsmyIndex.closeChildrenPage();
    },

    render: function () {
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">{this.state.title}</div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={scheduleFormData}>
                            <input type="hidden" name="id" value={this.state.schedule.id} />
                            <FormItem label="任务码" className="col-xs-5"><Input value={this.state.schedule.taskCode} name="taskCode" /></FormItem>
                            <FormItem label="任务名称" className="col-xs-5"><Input value={this.state.schedule.taskName} name="taskName" /></FormItem>
                            <FormItem label="定时配置" className="col-xs-5"><Input value={this.state.schedule.taskConf} name="taskConf" /></FormItem>
                            <FormItem label="执行地址" className="col-xs-5"><Input value={this.state.schedule.taskClass} name="taskClass" /></FormItem>
                            <FormItem label="指定IP" className="col-xs-5"><Input value={this.state.schedule.taskServerIp} name="taskServerIp" /></FormItem>
                            <FormItem label="备注" className="col-xs-5"><Input value={this.state.schedule.remark} name="remark" /></FormItem>
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