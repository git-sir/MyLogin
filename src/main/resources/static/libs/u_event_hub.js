(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UEventHub"] = factory();
	else
		root["UEventHub"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * 2016-11-21 William
	 * Public/Subscribe 
	 * 用于解决组件间的通信耦合
	 */
	var UEventHub = (function() {
		//页面加载完成事件
		var EVENT_RENDER_COMPLETE = 'EVENT_RENDER_COMPLETE'; 

		var _handlers = {};
		/**
		 * 根据不同的事件，创建事件ID 
		 */
		var _createEventId = (function() {
			var ids = {};
			return {
				/**
				 * 根据不同的事件，创建事件ID
				 * @param {Object} e  事件
				 * @return {Number}  id 事件ID
				 */
				getId: function(e) {
					if(ids[e]) {
						return ++ids[e];
					} else {
						ids[e] = 1;
						return ids[e];
					}
				}
			}
		})();

		/**
		 * 添加订阅事件,返回事件对象
		 * @param {string} e 事件
		 * @param {function} fn 回调函数
		 * @return {Object} event_object 事件类型
		 */
		var _on = function(e, fn) {
			if(!(e in _handlers)) {
				_handlers[e] = [];
			}
			var _event_object = {
				fn: fn,
				e: e,
				id: _createEventId.getId(e)
			};
			_handlers[e].push(_event_object);
			return _event_object;
		};
		/**
		 * 发布消息
		 * @param {string} e 事件类型
		 */
		var _emit = function(e) {
				if(!_handlers[e]) return;
				var args = Array.prototype.slice.call(arguments, 1);
				for(var i = 0; i < _handlers[e].length; i++) {
					setTimeout(_handlers[e][i].fn.apply(this, args));
				}
			}
			/**
			 * 取消订阅
			 * @param {Object} event_object
			 */
		var _off = function(event_object) {
			if(_handlers[event_object.e]) {
				for(var i = 0; i < _handlers[event_object.e].length; i++) {
					if(event_object.id === _handlers[event_object.e][i].id) {
						_handlers[event_object.e].splice(i, 1);
					}
				}
			}
		}
		
		var _ready = function(fn){
				_on(EVENT_RENDER_COMPLETE,fn);
		}
		
		return {
			/**
			 * 添加订阅事件,返回事件对象
			 * @param {string} e 事件
			 * @param {function} fn 回调函数
			 * @return {Object} event_object 事件类型
			 */
			on: _on,
			/**
			 * 发布消息
			 * @param {string} e 事件类型
			 */
			emit: _emit,
			/**
			 * 取消订阅
			 * @param {Object} event_object
			 */
			off: _off,
			/**
			 * 页面完成加载
			 */
			ready:_ready,
		}
	})();

	module.exports = UEventHub;

/***/ }
/******/ ])
});
;