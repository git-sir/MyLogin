var Badge = require('../components/Badge');
var Header = React.createClass({
    getInitialState: function () {
        return {username: ""}
    },
    render: function () {
        return (
            <div className="header">
                <div className="fixed">
                    <h1>网金决策方案管理系统</h1>
                    <div className="login-info">
                        <Badge count="10"/>
                        <span>xxx，你好！</span>
                        <span className="switch"></span>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Header;