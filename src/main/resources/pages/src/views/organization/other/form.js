var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;

var organizationFormData = {

    "name": [
        {type: "required", msg: "组织名称不能为空"},
        {type : "maxlength", maxlength : 64, msg : "组织名称长度不能超过64"}
    ],
    "description": [
        {type: "required", msg: "组织描述不能为空"},
        {type : "maxlength", maxlength : 256, msg : "组织描述长度不能超过256"}
    ],
    "priority": [
        {type: "required", msg: "组织优先级不能为空"},
        {type: "fn", validator: function(value){
            var m = /^\d+$/;
            return m.test(value);
        }, msg: '优先级必须为大于等于0的整数'
        },
        {type : "maxlength", maxlength : 9, msg : "优先级长度不能大于9"}
    ]
};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            organization: {},
            parentId: ''
        }
    },
    _validate: function (callback) {
        var validateField = [
            "name", "description", "priority"
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

        var rootThis = this;
        this._validate(function(){
            _addButtonDisabled('save');
            $.post(
                rootThis.state.url,
                $('#form').serialize(),
                function (result) {
                    _removeButtonDisabled('save');
                    if (result && result.retcode && result.retcode == "0") {
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
            organization: data.organization ? data.organization : {},
            parentId: data.parentId
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
                        <Form id="form" ref="saveForm" formData={organizationFormData}>
                            <input type="hidden" name="id" value={this.state.organization.id} />
                            <input type="hidden" name="parentId" value={this.state.parentId} />
                            <FormItem label="名称" className="col-xs-5"><Input  value={this.state.organization.name} name="name" /></FormItem>
                            <FormItem label="描述" className="col-xs-5"><Input  value={this.state.organization.description}  name="description" /></FormItem>
                            <FormItem label="优先级" className="col-xs-5"><Input  value={this.state.organization.priority}  name="priority"/></FormItem>
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