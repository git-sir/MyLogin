/*
 props:
 value: 文本值
 placeholder: 提示文字
 classnames: 类名
 */
var Autocomplete = React.createClass({
    getElementsByClassName:function(element, className){
        //getElementsByClassName 兼容ie7
        if(!document.getElementsByClassName) {
            document.getElementsByClassName = function (className, element) {
                var children = (element || document).getElementsByTagName('*');
                var elements = new Array();
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    var classNames = child.className.split(' ');
                    for (var j = 0; j < classNames.length; j++) {
                        if (classNames[j] == className) {
                            elements.push(child);
                            break;
                        }
                    }
                }
                return elements;
            };
        }else{
            return element.getElementsByClassName(className);
        }
    },
    getDefaultProps:function(){
        return {
            value: '',
            placeholder: '',
            classNames: {}
        }
    },
    getInitialState:function(){
        return {
            value: this.props.value,
            autocompleteItems: [],
            itemsActiveIndex:-1
        }
    },
    //设置value
    setValue: function(value){
        this.setState({
            value: value
        });
    },
    //获取value
    getValue: function(){
        return this.state.value;
    },
    handleInputChange:function(event) {
        var rootThis = this;
        var value = event.target.value;
        if (!value) {
            this.clearAutocomplete();
            //return
        }
        this.setState({
            value: value
        })
        this.props.onChange && this.props.onChange(value,function(items){
            rootThis.setState({
                autocompleteItems: items
            });
        })
    },
    handleInputSelect:function(value) {
        this.setState({
            value: value
        });
        this.props.onChange && this.props.onSelect(value);
        this.clearAutocomplete();
    },
    handleInputFocus:function(event) {
        this.handleInputChange(event);
    },
    handleInputBlur:function(event) {
        setTimeout(function(){
            this.clearAutocomplete();
        }.bind(this),200);
    },
    handleInputKeyDown:function(event) {
        var ARROW_UP = 38;
        var ARROW_DOWN = 40;
        var ENTER_KEY = 13;
        var ESC_KEY = 27;
        switch (event.keyCode) {
            case ENTER_KEY:
                event.preventDefault();
                this.handleEnterKey();
                break;
            case ARROW_DOWN:
                event.preventDefault();
                this.handleDownKey();
                break;
            case ARROW_UP:
                event.preventDefault();
                this.handleUpKey();
                break;
            case ESC_KEY:
                this.clearAutocomplete();
                break;
        }
    },
    handleUpKey:function(){
        if(this.refs.refAutocompleteItems === undefined) return;
        var activeItem = this.getActiveItem();
        var prevIndex;
        if (activeItem === undefined) {
            prevIndex = this.state.autocompleteItems.length - 1;
        } else {
            if(activeItem.activeItemIndex == 0){
                prevIndex = this.state.autocompleteItems.length - 1;
            }else{
                prevIndex = (activeItem.activeItemIndex - 1) % this.state.autocompleteItems.length;
            }
        }
        this.selectActiveItemAtIndex(prevIndex);
    },
    handleDownKey:function(){
        if(this.refs.refAutocompleteItems === undefined) return;
        var activeItem = this.getActiveItem();
        if (activeItem === undefined) {
            this.selectActiveItemAtIndex(0);
        } else {
            var nextIndex = (activeItem.activeItemIndex + 1) % this.state.autocompleteItems.length
            this.selectActiveItemAtIndex(nextIndex);
        }
    },
    handleEnterKey:function() {
        var activeItem = this.getActiveItem();
        this.clearAutocomplete();
        if (activeItem !== undefined) {
            this.handleInputSelect(activeItem.activeItemValue);
        }
    },
    getActiveItem:function() {
        if(this.refs.refAutocompleteItems !== undefined){
            var a = this.getElementsByClassName(this.refs.refAutocompleteItems, 'active')[0];
        }
        if(a === undefined){
            return undefined;
        }else{
            return {
                activeItemIndex: a.getAttribute('data-index'),
                activeItemValue: a.innerHTML
            }
        }
    },
    selectActiveItemAtIndex:function(index){
        if(this.refs.refAutocompleteItems !== undefined) {
            var itemsArr = this.refs.refAutocompleteItems.getElementsByTagName('a');
        }
        for(var i = 0; i < itemsArr.length; i++){
            if(index == i){
                itemsArr[i].setAttribute('class', 'active');
                this.setState({
                    itemsActiveIndex: index
                });
            }

        }
    },
    clearAutocomplete:function() {
        this.setState({ autocompleteItems: [] });
    },
    renderInput:function() {
        var classNames = this.props.classNames;
        var placeholder = this.props.placeholder;
        var value = this.state.value;
        return (
            <div className="ucs-autocomplete-input-wrap">
                <input
                    type="text"
                    placeholder={placeholder}
                    className={'ucs-autocomplete-input' + ( classNames.input ? (' '+ classNames.input) : '')}
                    value={value}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                />
            </div>
        )
    },
    renderAutocomplete:function() {
        var rootThis = this;
        var addActiveClass = function(t, e, idx){
            rootThis.setState({
                itemsActiveIndex: idx
            });
        }
        var removeActiveClass = function(e, idx){
            rootThis.setState({
                itemsActiveIndex: idx
            });
        }
        var autocompleteItems = this.state.autocompleteItems;
        if (autocompleteItems.length === 0) { return null }
        return (
            <div
                ref="refAutocompleteItems"
                className={'ucs-autocomplete-items-wrap' + ( this.props.classNames.autocompleteContainer ? (' '+ this.props.classNames.autocompleteContainer) : '')}>
                <ul>
                    {autocompleteItems.map(function(p, idx) {
                        return (
                            <li>
                                <a href="javascript:;"
                                   className={rootThis.state.itemsActiveIndex == idx ? 'active' : ''}
                                   onClick={rootThis.handleInputSelect.bind(this, p)}
                                   onMouseEnter={addActiveClass.bind(this, this, event, idx)}
                                   onMouseLeave={removeActiveClass.bind(this, event, idx)}
                                   data-index={idx}
                                >{p}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    },
    render:function() {
        var classNames = this.props.classNames;
        return (
            <div
                className={'ucs-autocomplete' +  ( classNames.root ? (' '+ classNames.root) : '')}>
                {this.renderInput()}
                {this.renderAutocomplete()}
            </div>
        )
    }
})

module.exports = Autocomplete;


