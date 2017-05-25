/**
 * Created by chenqilin on 2017/4/28.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../../widget/other/grid');


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
            client: {},
            gridUrl: null,
            url: "resourceGroup/add"
        }
    },

    init: function (item, url) {
        var queryData = {
            clientId: item.clientId
        }
        this.setState({
            client: item,
            gridUrl: url
        }, () => {
            this.refs.grid.load(queryData);
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
                        rootThis.refs.groupName.setValue('');
                        rootThis.refs.descRibe.setValue('');
                        rootThis.refs.grid.load({clientId: rootThis.state.client.clientId});
                        UcsmyIndex.alert("提示", result.retmsg);
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

    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },

    render: function () {
        var rootThis = this;
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">添加资源组</div>
                    <div className="ucs-form-group">
                        <span className="label">应用ID：</span>
                        <span>{rootThis.state.client.clientId}</span>
                    </div>
                    <div className="ucs-form-group">
                        <span className="label">应用简称：</span>
                        <span>{rootThis.state.client.clientName}</span>
                    </div>
                    <div className="ucs-form-group">
                        <span className="label">应用组：</span>
                        <span>{rootThis.state.client.ucasClientGroup?rootThis.state.client.ucasClientGroup.groupName:''}</span>
                    </div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={formData}>
                            <input type="hidden" name="clientId" value={rootThis.state.client.clientId} />
                            <FormItem label="资源组名称" className="col-xs-5"><Input ref="groupName" name="groupName"/></FormItem>
                            <FormItem label="资源组描述" className="col-xs-5"><Input ref="descRibe" name="descRibe"/></FormItem>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button id="save" buttonType="bidnow" onClick={this._saveOrUpdate}>保存</Button>
                    <Button buttonType="cancel" onClick={this._return}>返回</Button>
                </div>
                <h3 className="content-title">应用已有资源组</h3>
                <div className="table-panel">
                    <Grid url={rootThis.state.gridUrl} ref="grid"
                          isTextOverflowHidden={true}
                          columns={[
                              {name: 'groupName', header: '资源组名称', width: 300},
                              {name: 'descRibe', header: '资源组描述', width: 400}
                          ]}>
                    </Grid>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});