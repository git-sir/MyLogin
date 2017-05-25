
var Button = UcsmyUI.Button;
var Tooltip=UcsmyUI.Tooltip;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            ucasAccountGroup: {},
            urgentFlag:'',
            data:{},
            clientGroup: {}
        }
    },

    init: function (url, title, data, callback) {
        var me = this;

        $.post("account/getUser",
            {'ucasAccount':data.ucasAccount},
            function (result) {
                if (result && result.retcode && result.retcode === "0") {
                    me.setState({
                        title: title,
                        url: url,
                        ucasAccountGroup: result.data,
                        callback: callback
                    });

                } else {
                    UcsmyIndex.alert("提示", result.retmsg);
                }
            }).error(function(){
            UcsmyIndex.alert("失败", "网络异常");
        });
    },
    _return: function () {
        UcsmyIndex.closeChildrenPage();
    },
    render: function () {
        return (
            <div>
            <div className="panel">
            <div className="panel-title fc-red">帐号信息</div>
         <div className="panel-content">

            <div className="ucs-form-group">
               <span className="label">网金帐号：</span>
               <span>{this.state.ucasAccountGroup.ucasAccount}</span>
           </div>
        <div className="ucs-form-group">
            <span className="label">用户名称：</span>
        <span>{this.state.ucasAccountGroup.realName}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">邮箱帐号：</span>
        <span>{this.state.ucasAccountGroup.emailAccount}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">手机帐号：</span>
        <span>{this.state.ucasAccountGroup.mobileAccount}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">联系手机：</span>
        <span>{this.state.ucasAccountGroup.mobilePhone}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">联系邮箱：</span>
        <span>{this.state.ucasAccountGroup.email}</span>
        </div>

             {/*        <div className="ucs-form-group">
            <span className="label">组织名称：</span>
        <span>{this.state.ucasAccountGroup.orgName}</span>
        </div>*/}
        <div className="ucs-form-group">
            <span className="label">状态：</span>
        <span>{this.state.ucasAccountGroup.status==='0' ? '正常':'冻结'}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">组织名称：</span>
            {/*<span>{this.state.ucasAccountGroup.orgName}</span>*/}
            <div className="custom-tooltip">
                <Tooltip title={this.state.ucasAccountGroup.orgName}>
                    {this.state.ucasAccountGroup.orgName}
                </Tooltip>
            </div>
        </div>
        <div className="ucs-form-group">
            <span className="label">性别：</span>
        <span>{this.state.ucasAccountGroup.sex==='1' ? '男' : '女'}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">用户组：</span>
        <span>{this.state.ucasAccountGroup.groupName}</span>
        </div>
        <div className="ucs-form-group">
            <span className="label">指纹标识：</span>
        <span>{this.state.ucasAccountGroup.fingerprint==='1' ? '有':'无'}</span>
        </div>
             <div className="ucs-form-group">
                 <span className="label">头像地址：</span>
                 <div className="custom-tooltip">
                     <Tooltip title={this.state.ucasAccountGroup.headImgUrl}>
                         {this.state.ucasAccountGroup.headImgUrl}
                     </Tooltip>
                 </div>
             </div>
        </div>
        </div>
        <div className="btn-panel">

        <Button buttonType="bidnow" onClick={this._return}>返回</Button>
        </div>
        </div>
        )
    }
});