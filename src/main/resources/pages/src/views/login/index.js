var MessageBox = require('../widget/other/messageBox');
var Input=UcsmyUI.Input;
var Button=UcsmyUI.Button;

var baeVerificationUrl = "login.login.pgflow/captcha?random=";
var _login = {
	disabled: false,
	text: '登录'
};

var Root=React.createClass({
	getInitialState: function(){
		return {
			login: _login,
			verificationUrl: baeVerificationUrl + Math.random()
		}
	},
	componentDidMount: function(){
		var me = this;
		$(".login").keydown(function() {
			if(window.event.keyCode == 13) {
				me._click();
				$("#messageBox").focus();
			}
		});
	},
	_click:function(){
		var me = this;
		var userName = this.refs.userName.getValue();
		var password = this.refs.password.getValue();
		if(!userName || userName == ""){
			me.refs.messageBox.alert("失败", "用户名不能为空");
			return;
		}

		
		$.ajax({
			url:'getRsa',
			type:'GET',
			success:function(data)
			{
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.data.modulus), b64tohex(data.data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(password));
				var loginType = data.data.loginType;

				if(loginType!=null&&loginType=="local"){
					var ndata = {username: userName, password: enPassword,"token_type":"LOCAL"};
					me.setState({
						login: {
							disabled: true,
							text: '登录中...'
						}
					});


					$.post("login", ndata, function(data) {
						me.setState({
							login: _login
						});
						if(data.success == true) {
							window.location.href = ctx + "index";
						} else {
							me.refs.messageBox.alert("失败", data.msg);
						}
					}, "json").error(function(xhr) {
						me.setState({
							login: _login
						});
						if(xhr.status == 444) {
							me.refs.messageBox.confirm("登录异常", "登录页面信息失效，是否刷新页面？", function() {
								window.location.reload();
							});
						} else {
							me.refs.messageBox.alert("异常", "网络异常");
						}
					});
				}else {
					var oauth2Url = data.data.oauth2Url;
					if(oauth2Url==null){
						oauth2Url = "http://localhost/oauth/authorize?client_id=rdpdemo&response_type=code&redirect_uri="
					}
					var redirect_uri = ctx + "index";
					window.location.href = oauth2Url+redirect_uri;
				}


				
			},
			error:function()
			{
				
				me.refs.messageBox.alert("异常", "网络异常");

			}
		});




	},
	testClick:function(){
		var me = this;
		var userName = this.refs.userName.getValue();
		var password = this.refs.password.getValue();
		if(!userName || userName == ""){
			me.refs.messageBox.alert("失败", "用户名不能为空");
			return;
		}
		var data = {username: userName, password: password,"token_type":"LOCAL"};
		$.post("login", data, function(data) {
			me.setState({
				login: _login
			});
			if(data.success == true) {
				window.location.href = ctx + "index";
			} else {
				me.refs.messageBox.alert("失败", data.msg);
			}
		}, "json").error(function(xhr, errorText, errorType) {
			me.setState({
				login: _login
			});
			if(xhr.status == 444) {
				me.refs.messageBox.confirm("登录异常", "登录页面信息失效，是否刷新页面？", function() {
					window.location.reload();
				});
			} else {
				me.refs.messageBox.alert("异常", "网络异常");
			}
		})

	},
	_otherClick:function(){

		var   oauth2Url = "http://localhost/oauth/authorize?client_id=rdpdemo&response_type=code&redirect_uri="
		var redirect_uri = ctx + "login.login.pgflow/index";
		window.location.href = oauth2Url+redirect_uri;
	
},

    render:function(){
    	return (
	    <div className="login">
	        <div className="logo">
	            <img src="images/logo-white.png"/>
	            <span className="sub-logo">统一认证平台</span>
	        </div>
	        <div className="box">
	            <div className="box-layer"></div>
	            <div className="box-outer">
	            	<form>
	                <div className="box-inner">
	                    <div className="face">
	                        <div className="wangjin-icon-wrap">
	                            <img src="images/wangjin-icon.png"/>
	                        </div>
	                    </div>
	                    <dl>
	                        <dt>
	                            <span>用户登录</span>
	                            <i className="l-line">&nbsp;</i>
	                            <i className="r-line">&nbsp;</i>
	                        </dt>
	                        <dd>
	                            <i className="icon"><b className="iconfont icon-user-icon">&nbsp;</b></i>
	                            <Input placeholder="请输入您的用户名" ref="userName"/>
	                        </dd>
	                        <dd>
	                            <i className="icon"><b className="iconfont icon-lock-icon">&nbsp;</b></i>
	                            <Input type="password" placeholder="请输入您的用户密码" ref="password"/>
	                        </dd>
	                        <dd><Button onClick={this._click} disabled={this.state.login.disabled}>{this.state.login.text}</Button></dd>

	                    </dl>
	                    {/*<div className="forget"><a href="#">忘记密码？</a></div>*/}
	                </div>
	                </form>
	            </div>
	        </div>
	        <img src="images/login-bg.png" className="login-bg"/>
	        <MessageBox ref="messageBox" id="messageBox"/>
	    </div>);
    }
});
ReactDOM.render(<Root />,document.getElementById('main'));