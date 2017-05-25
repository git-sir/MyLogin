/**
 * Created by DuHuiling on 2017/1/23.
 */

var setClass = require('classnames');

var Menu = React.createClass({
    getDefaultProps: function () {
        return {
            mode: 'horizontal'
        }
    },
    componentDidMount: function () {
        var _children = this.props.children,
            len = _children.length;
    },
    render: function () {
        var self = this;
        var menuClass = setClass('ucs-menu', 'menu-' + this.props.mode, this.props.className);
        return (
            <div className={menuClass} id={this.props.id}>
                <ul>
                    {
                        React.Children.map(self.props.children, function (child) {
                            return React.cloneElement(child, {mode: self.props.mode});
                        })
                    }
                </ul>
            </div>
        )
    }
});

Menu.MenuItem = React.createClass({
    render: function () {
        var itemClass = setClass(this.props.className, {'menu-disabled': this.props.disabled});
        return (
            <li className={itemClass} className={itemClass}>{ this.props.children }</li>
        )
    }
});

Menu.SubMenu = React.createClass({
    getDefaultProps: function () {
        return {
            visible: false
        }
    },
    getInitialState: function () {
        return {
            subVisible: this.props.visible,
            subClass: this.props.className
        }
    },
    componentDidMount: function () {
        var self = this;

        var node = ReactDOM.findDOMNode(this);
        if (this.props.mode == 'horizontal' || this.props.mode == 'vertical') {
            node.onmouseenter = function (e) {
                self.setState({
                    subVisible: true
                })
            };
            node.onmouseleave = function (e) {
                self.setState({
                    subVisible: false
                })
            };
        } else if (this.props.mode == 'inline') {
            node.onclick = function (e) {
                self.setState({
                    subVisible: !self.state.subVisible
                })
            }
        }

    },
    render: function () {
        var submenuClass = setClass(
            'sub-menu',
            'sub-menu-' + this.props.mode
        );
        var dropdown = setClass('ucs-dropdown', {'down': this.state.subVisible}, this.state.subClass);
        return (
            <li className={dropdown}>
                <div className="menu-title">{ this.props.title }</div>
                <ul className={ submenuClass }>
                    { this.props.children }
                </ul>
            </li>
        )
    }
});

module.exports = Menu;