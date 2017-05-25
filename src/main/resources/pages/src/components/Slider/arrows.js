
var classnames = require('classnames');
var Helpers = require('./mixins/helpers');

var PrevArrow = React.createClass({

    clickHandler: function (options, e) {
        if (e) { e.preventDefault(); }
        this.props.clickHandler(options, e);
    },
    render: function () {
        var prevClasses = {'ucs-slick-arrow': true, 'ucs-slick-prev': true};
        var prevHandler = this.clickHandler.bind(this, {message: 'previous'});

        if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
            prevClasses['ucs-slick-disabled'] = true;
            prevHandler = null;
        }

        var prevArrowProps = {
            key: '0',
            'data-role': 'none',
            className: classnames(prevClasses),
            style: {display: 'block'},
            onClick: prevHandler
        };
        var prevArrow;

        if (this.props.prevArrow) {
            prevArrow = React.cloneElement(this.props.prevArrow, prevArrowProps);
        } else {
            prevArrow = <button key='0' type='button' {...prevArrowProps}> Previous</button>;
        }

        return prevArrow;
    }
});


var NextArrow = React.createClass({
    clickHandler: function (options, e) {
        if (e) { e.preventDefault(); }
        this.props.clickHandler(options, e);
    },
    render: function () {
        var nextClasses = {'ucs-slick-arrow': true, 'ucs-slick-next': true};
        var nextHandler = this.clickHandler.bind(this, {message: 'next'});

        if (!Helpers.canGoNext(this.props)) {
            nextClasses['ucs-slick-disabled'] = true;
            nextHandler = null;
        }

        var nextArrowProps = {
            key: '1',
            'data-role': 'none',
            className: classnames(nextClasses),
            style: {display: 'block'},
            onClick: nextHandler
        };

        var nextArrow;

        if (this.props.nextArrow) {
            nextArrow = React.cloneElement(this.props.nextArrow, nextArrowProps);
        } else {
            nextArrow = <button key='1' type='button' {...nextArrowProps}> Next</button>;
        }

        return nextArrow;
    }
});

module.exports = [PrevArrow,NextArrow];
