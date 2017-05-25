/**
 * Created by Administrator on 2016/11/28.
 */
var assign = require('object-assign');
var json2mq = require('json2mq');
var ResponsiveMixin = require('react-responsive-mixin');
var defaultProps = require('./default-props');
var InnerSlider = require('./inner-slider');
var Slider = React.createClass({
    mixins: [ResponsiveMixin],
    innerSlider: null,
    innerSliderRefHandler: function (ref) {
        this.innerSlider = ref;
    },
    getInitialState: function () {
        return {
            breakpoint: null
        };
    },
    componentWillMount: function(){
        if (this.props.responsive) {
            var _this = this;
            var breakpoints = _this.props.responsive.map(function(breakpt){ return  breakpt.breakpoint});
            breakpoints.sort(function(x, y){ return x - y});

            breakpoints.forEach(function(breakpoint,index){
                var bQuery;
                if (index === 0) {
                    bQuery = json2mq({minWidth: 0, maxWidth: breakpoint});
                } else {
                    bQuery = json2mq({minWidth: breakpoints[index-1], maxWidth: breakpoint});
                }
                _this.media(bQuery, function(){
                    _this.setState({breakpoint: breakpoint});
                });
            });

            //Register media query for full screen. Need to support resize from small to large
            var query = json2mq({minWidth: breakpoints.slice(-1)[0]});

            _this.media(query, function(){
                _this.setState({breakpoint: null});
            });
        }
    },
    slickPrev: function () {
        this.innerSlider.slickPrev();
    },

    slickNext: function () {
        this.innerSlider.slickNext();
    },

    slickGoTo: function (slide) {
        this.innerSlider.slickGoTo(slide)
    },
    render: function(){
        var settings;
        var newProps;
        if (this.state.breakpoint) {
            var _this = this;
            newProps = this.props.responsive.filter(function(resp){return resp.breakpoint === _this.state.breakpoint});
            settings = newProps[0].settings === 'unslick' ? 'unslick' : assign({}, this.props, newProps[0].settings);
        } else {
            settings = assign({}, defaultProps, this.props);
        }

        var children = this.props.children;
        if(!Array.isArray(children)) {
            children = [children]
        }

        // Children may contain false or null, so we should filter them
        children = children.filter(function(child){
            return !!child
        })

        if (settings === 'unslick') {
            // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
            return (
                <div>{children}</div>
            );
        } else {
            return (
                <InnerSlider ref={this.innerSliderRefHandler} {...settings}>
                    {children}
                </InnerSlider>
            );
        }
    }

});

module.exports = Slider;
