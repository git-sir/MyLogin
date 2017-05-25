require('../sass/ucs.scss');
var Header = require('./header');
var LeftNav = require('./leftNav');
var Frame = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <Header></Header>
                <div className="main-frame">
                    <LeftNav></LeftNav>
                    <div className="main-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Frame;