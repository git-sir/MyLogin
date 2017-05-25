/*
 * visibilityHeight: 自定义滚动高度，默认400
 * right: 距离右边的大小，默认20px
 * callback：  回调函数，默认为空
 */
var Spin = React.createClass({
    render:function(){
        var addClass;
        if(this.props.size == "small" ){
            addClass = "ucs-spin-sm";
        }else if(this.props.size == "large"){
            addClass = "ucs-spin-lg";
        }else{
            addClass = " ";
        }
        var spinClass = "ucs-spin" + " " + addClass + " " + "ucs-spin-spinning";
        var spinDotClass = "ucs-spin-dot";
        return(
            <div className={spinClass}>
              <span className={spinDotClass}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
        )
    }
})

var Alert = React.createClass({
    render:function(){
        return(
            <div className="ucs-spin-container ucs-spin-blur">
                <div className="ucs-alert ucs-alert-info ucs-alert-with-description">
                    <span className="ucs-alert-message">Alert message title</span>
                    <span className="ucs-alert-description">Further details about the context of this alert.</span>
                </div>
            </div>
        )
    }
})

var Btn = React.createClass({
    render:function(){
        return(
            <a>点我</a>
        )
    }
})

var Spinloading = React.createClass({

    getInitialState:function() {
        return { loading: false };
    },

    handleClick: function(event){
        this.setState({ loading: !this.state.loading});
    },

    render:function(){
        if(this.state.loading){
            return(
                <div>
                    <div className="ucs-content">
                        <div className="ucs-spin-content"><Spin></Spin></div>
                        <div className="ucs-spin-container ucs-spin-blur">
                            <div className="ucs-alert ucs-alert-info ucs-alert-with-description">
                                <span className="ucs-alert-message">Alert message title</span>
                                <span className="ucs-alert-description">Further details about the context of this alert.</span>
                            </div>
                        </div>
                    </div>
                    <a onClick={this.handleClick}>再点我</a>
                </div>
            )
        }else{
            return(
                <div>
                    <div className="ucs-content">
                        <div className="ucs-spin-container">
                            <div className="ucs-alert ucs-alert-info ucs-alert-with-description">
                                <span className="ucs-alert-message">Alert message title</span>
                                <span className="ucs-alert-description">Further details about the context of this alert.</span>
                            </div>
                        </div>
                    </div>
                    <a onClick={this.handleClick}>点我</a>
                </div>
            )
        }

    }
})

var Loading = {
    a:Spin,
    b:Alert,
    c:Btn,
    d:Spinloading
}

module.exports = Loading;




