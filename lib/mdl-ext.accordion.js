(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("accordion", [], factory);
	else if(typeof exports === 'object')
		exports["accordion"] = factory();
	else
		root["mdl-ext"] = root["mdl-ext"] || {}, root["mdl-ext"]["accordion"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(41);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _constants = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var ACCORDION = 'mdlext-accordion';
	  var ACCORDION_VERTICAL = 'mdlext-accordion--vertical';
	  var ACCORDION_HORIZONTAL = 'mdlext-accordion--horizontal';
	  var PANEL = 'mdlext-accordion__panel';
	  var PANEL_ROLE = 'presentation';
	  var TAB = 'mdlext-accordion__tab';
	  var TAB_CAPTION = 'mdlext-accordion__tab__caption';
	  var TAB_ROLE = 'tab';
	  var TABPANEL = 'mdlext-accordion__tabpanel';
	  var TABPANEL_ROLE = 'tabpanel';
	  var RIPPLE_EFFECT = 'mdlext-js-ripple-effect';
	  var RIPPLE = 'mdlext-accordion__tab--ripple';
	  var ANIMATION_EFFECT = 'mdlext-js-animation-effect';
	  var ANIMATION = 'mdlext-accordion__tabpanel--animation';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtAccordion = function MaterialExtAccordion(element) {
	
	    // Stores the Accordion HTML element.
	    this.element_ = element;
	
	    // Initialize instance.
	    this.init();
	  };
	  window['MaterialExtAccordion'] = MaterialExtAccordion;
	
	  // Helpers
	  var accordionPanelElements = function accordionPanelElements(element) {
	    if (!element) {
	      return {
	        panel: null,
	        tab: null,
	        tabpanel: null
	      };
	    } else if (element.classList.contains(PANEL)) {
	      return {
	        panel: element,
	        tab: element.querySelector('.' + TAB),
	        tabpanel: element.querySelector('.' + TABPANEL)
	      };
	    } else {
	      return {
	        panel: element.parentNode,
	        tab: element.parentNode.querySelector('.' + TAB),
	        tabpanel: element.parentNode.querySelector('.' + TABPANEL)
	      };
	    }
	  };
	
	  // Private methods.
	
	  /**
	   * Handles custom command event, 'open', 'close', 'toggle' or upgrade
	   * @param event. A custom event
	   * @private
	   */
	  MaterialExtAccordion.prototype.commandHandler_ = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	
	    if (event && event.detail) {
	      this.command(event.detail);
	    }
	  };
	
	  /**
	   * Dispatch toggle event
	   * @param {string} state
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.dispatchToggleEvent_ = function (state, tab, tabpanel) {
	    var ce = new CustomEvent('toggle', {
	      bubbles: true,
	      cancelable: true,
	      detail: { state: state, tab: tab, tabpanel: tabpanel }
	    });
	    this.element_.dispatchEvent(ce);
	  };
	
	  /**
	   * Open tab
	   * @param {Element} panel
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.openTab_ = function (panel, tab, tabpanel) {
	    panel.classList.add(_constants.IS_EXPANDED);
	    tab.setAttribute(_constants.ARIA_EXPANDED, 'true');
	    tabpanel.removeAttribute('hidden');
	    tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'false');
	    this.dispatchToggleEvent_('open', tab, tabpanel);
	  };
	
	  /**
	   * Close tab
	   * @param {Element} panel
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.closeTab_ = function (panel, tab, tabpanel) {
	    panel.classList.remove(_constants.IS_EXPANDED);
	    tab.setAttribute(_constants.ARIA_EXPANDED, 'false');
	    tabpanel.setAttribute('hidden', '');
	    tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'true');
	    this.dispatchToggleEvent_('close', tab, tabpanel);
	  };
	
	  /**
	   * Toggle tab
	   * @param {Element} panel
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.toggleTab_ = function (panel, tab, tabpanel) {
	    if (!(this.element_.hasAttribute('disabled') || tab.hasAttribute('disabled'))) {
	      if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() === 'true') {
	        this.closeTab_(panel, tab, tabpanel);
	      } else {
	        if (this.element_.getAttribute(_constants.ARIA_MULTISELECTABLE).toLowerCase() !== 'true') {
	          this.closeTabs_();
	        }
	        this.openTab_(panel, tab, tabpanel);
	      }
	    }
	  };
	
	  /**
	   * Open tabs
	   * @private
	   */
	  MaterialExtAccordion.prototype.openTabs_ = function () {
	    var _this = this;
	
	    if (this.element_.getAttribute(_constants.ARIA_MULTISELECTABLE).toLowerCase() === 'true') {
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + ACCORDION + ' > .' + PANEL))).filter(function (panel) {
	        return !panel.classList.contains(_constants.IS_EXPANDED);
	      }).forEach(function (closedItem) {
	        var tab = closedItem.querySelector('.' + TAB);
	        if (!tab.hasAttribute('disabled')) {
	          _this.openTab_(closedItem, tab, closedItem.querySelector('.' + TABPANEL));
	        }
	      });
	    }
	  };
	
	  /**
	   * Close tabs
	   * @private
	   */
	  MaterialExtAccordion.prototype.closeTabs_ = function () {
	    var _this2 = this;
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + ACCORDION + ' > .' + PANEL + '.' + _constants.IS_EXPANDED))).forEach(function (panel) {
	      var tab = panel.querySelector('.' + TAB);
	      if (!tab.hasAttribute('disabled')) {
	        _this2.closeTab_(panel, tab, panel.querySelector('.' + TABPANEL));
	      }
	    });
	  };
	
	  // Public methods.
	
	  /**
	   * Upgrade an individual accordion tab
	   * @public
	   * @param {Element} tabElement The HTML element for the accordion panel.
	   */
	  MaterialExtAccordion.prototype.upgradeTab = function (tabElement) {
	    var _this3 = this;
	
	    var _accordionPanelElemen = accordionPanelElements(tabElement),
	        panel = _accordionPanelElemen.panel,
	        tab = _accordionPanelElemen.tab,
	        tabpanel = _accordionPanelElemen.tabpanel;
	
	    var disableTab = function disableTab() {
	      panel.classList.remove(_constants.IS_EXPANDED);
	      tab.setAttribute('tabindex', '-1');
	      tab.setAttribute(_constants.ARIA_EXPANDED, 'false');
	      tabpanel.setAttribute('hidden', '');
	      tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'true');
	    };
	
	    var enableTab = function enableTab() {
	      if (!tab.hasAttribute(_constants.ARIA_EXPANDED)) {
	        tab.setAttribute(_constants.ARIA_EXPANDED, 'false');
	      }
	
	      tab.setAttribute('tabindex', '0');
	
	      if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() === 'true') {
	        panel.classList.add(_constants.IS_EXPANDED);
	        tabpanel.removeAttribute('hidden');
	        tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'false');
	      } else {
	        panel.classList.remove(_constants.IS_EXPANDED);
	        tabpanel.setAttribute('hidden', '');
	        tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'true');
	      }
	    };
	
	    // In horizontal layout, caption must have a max-width defined to prevent pushing elements to the right of the caption out of view.
	    // In JsDom, offsetWidth and offsetHeight properties do not work, so this function is not testable.
	    /* istanbul ignore next */
	    var calcMaxTabCaptionWidth = function calcMaxTabCaptionWidth() {
	
	      var tabCaption = tab.querySelector('.' + TAB_CAPTION);
	      if (tabCaption !== null) {
	        var w = [].concat((0, _toConsumableArray3.default)(tab.children)).filter(function (el) {
	          return el.classList && !el.classList.contains(TAB_CAPTION);
	        }).reduce(function (v, el) {
	          return v + el.offsetWidth;
	        }, 0);
	
	        var maxWidth = tab.clientHeight - w;
	        if (maxWidth > 0) {
	          tabCaption.style['max-width'] = maxWidth + 'px';
	        }
	      }
	    };
	
	    var selectTab = function selectTab() {
	      if (!tab.hasAttribute(_constants.ARIA_SELECTED)) {
	        [].concat((0, _toConsumableArray3.default)(_this3.element_.querySelectorAll('.' + TAB + '[aria-selected="true"]'))).forEach(function (selectedTab) {
	          return selectedTab.removeAttribute(_constants.ARIA_SELECTED);
	        });
	        tab.setAttribute(_constants.ARIA_SELECTED, 'true');
	      }
	    };
	
	    var tabClickHandler = function tabClickHandler() {
	      _this3.toggleTab_(panel, tab, tabpanel);
	      selectTab();
	    };
	
	    var tabFocusHandler = function tabFocusHandler() {
	      selectTab();
	    };
	
	    var tabpanelClickHandler = function tabpanelClickHandler() {
	      selectTab();
	    };
	
	    var tabpanelFocusHandler = function tabpanelFocusHandler() {
	      selectTab();
	    };
	
	    var tabKeydownHandler = function tabKeydownHandler(e) {
	
	      if (_this3.element_.hasAttribute('disabled')) {
	        return;
	      }
	
	      if (e.keyCode === _constants.VK_END || e.keyCode === _constants.VK_HOME || e.keyCode === _constants.VK_ARROW_UP || e.keyCode === _constants.VK_ARROW_LEFT || e.keyCode === _constants.VK_ARROW_DOWN || e.keyCode === _constants.VK_ARROW_RIGHT) {
	
	        var nextTab = null;
	        var keyCode = e.keyCode;
	
	        if (keyCode === _constants.VK_HOME) {
	          nextTab = _this3.element_.querySelector('.' + PANEL + ':first-child > .' + TAB);
	          if (nextTab && nextTab.hasAttribute('disabled')) {
	            nextTab = null;
	            keyCode = _constants.VK_ARROW_DOWN;
	          }
	        } else if (keyCode === _constants.VK_END) {
	          nextTab = _this3.element_.querySelector('.' + PANEL + ':last-child > .' + TAB);
	          if (nextTab && nextTab.hasAttribute('disabled')) {
	            nextTab = null;
	            keyCode = _constants.VK_ARROW_UP;
	          }
	        }
	
	        if (!nextTab) {
	          var nextPanel = panel;
	
	          do {
	            if (keyCode === _constants.VK_ARROW_UP || keyCode === _constants.VK_ARROW_LEFT) {
	              nextPanel = nextPanel.previousElementSibling;
	              if (!nextPanel) {
	                nextPanel = _this3.element_.querySelector('.' + PANEL + ':last-child');
	              }
	              if (nextPanel) {
	                nextTab = nextPanel.querySelector('.' + PANEL + ' > .' + TAB);
	              }
	            } else if (keyCode === _constants.VK_ARROW_DOWN || keyCode === _constants.VK_ARROW_RIGHT) {
	              nextPanel = nextPanel.nextElementSibling;
	              if (!nextPanel) {
	                nextPanel = _this3.element_.querySelector('.' + PANEL + ':first-child');
	              }
	              if (nextPanel) {
	                nextTab = nextPanel.querySelector('.' + PANEL + ' > .' + TAB);
	              }
	            }
	
	            if (nextTab && nextTab.hasAttribute('disabled')) {
	              nextTab = null;
	            } else {
	              break;
	            }
	          } while (nextPanel !== panel);
	        }
	
	        if (nextTab) {
	          e.preventDefault();
	          e.stopPropagation();
	          nextTab.focus();
	
	          // Workaround for JSDom testing:
	          // In JsDom 'element.focus()' does not trigger any focus event
	          if (!nextTab.hasAttribute(_constants.ARIA_SELECTED)) {
	
	            [].concat((0, _toConsumableArray3.default)(_this3.element_.querySelectorAll('.' + TAB + '[aria-selected="true"]'))).forEach(function (selectedTab) {
	              return selectedTab.removeAttribute(_constants.ARIA_SELECTED);
	            });
	
	            nextTab.setAttribute(_constants.ARIA_SELECTED, 'true');
	          }
	        }
	      } else if (e.keyCode === _constants.VK_ENTER || e.keyCode === _constants.VK_SPACE) {
	        e.preventDefault();
	        e.stopPropagation();
	        _this3.toggleTab_(panel, tab, tabpanel);
	      }
	    };
	
	    if (tab === null) {
	      throw new Error('There must be a tab element for each accordion panel.');
	    }
	
	    if (tabpanel === null) {
	      throw new Error('There must be a tabpanel element for each accordion panel.');
	    }
	
	    panel.setAttribute('role', PANEL_ROLE);
	    tab.setAttribute('role', TAB_ROLE);
	    tabpanel.setAttribute('role', TABPANEL_ROLE);
	
	    if (tab.hasAttribute('disabled')) {
	      disableTab();
	    } else {
	      enableTab();
	    }
	
	    if (this.element_.classList.contains(ACCORDION_HORIZONTAL)) {
	      calcMaxTabCaptionWidth();
	    }
	
	    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
	      tab.classList.add(RIPPLE);
	    }
	
	    if (this.element_.classList.contains(ANIMATION_EFFECT)) {
	      tabpanel.classList.add(ANIMATION);
	    }
	
	    // Remove listeners, just in case ...
	    tab.removeEventListener('click', tabClickHandler);
	    tab.removeEventListener('focus', tabFocusHandler);
	    tab.removeEventListener('keydown', tabKeydownHandler);
	    tabpanel.removeEventListener('click', tabpanelClickHandler);
	    tabpanel.removeEventListener('focus', tabpanelFocusHandler);
	
	    tab.addEventListener('click', tabClickHandler);
	    tab.addEventListener('focus', tabFocusHandler);
	    tab.addEventListener('keydown', tabKeydownHandler);
	    tabpanel.addEventListener('click', tabpanelClickHandler, true);
	    tabpanel.addEventListener('focus', tabpanelFocusHandler, true);
	  };
	  MaterialExtAccordion.prototype['upgradeTab'] = MaterialExtAccordion.prototype.upgradeTab;
	
	  /**
	   * Execute command
	   * @param detail
	   */
	  MaterialExtAccordion.prototype.command = function (detail) {
	    var _this4 = this;
	
	    var openTab = function openTab(tabElement) {
	
	      if (tabElement === undefined) {
	        _this4.openTabs_();
	      } else if (tabElement !== null) {
	        var _accordionPanelElemen2 = accordionPanelElements(tabElement),
	            panel = _accordionPanelElemen2.panel,
	            tab = _accordionPanelElemen2.tab,
	            tabpanel = _accordionPanelElemen2.tabpanel;
	
	        if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() !== 'true') {
	          _this4.toggleTab_(panel, tab, tabpanel);
	        }
	      }
	    };
	
	    var closeTab = function closeTab(tabElement) {
	      if (tabElement === undefined) {
	        _this4.closeTabs_();
	      } else if (tabElement !== null) {
	        var _accordionPanelElemen3 = accordionPanelElements(tabElement),
	            panel = _accordionPanelElemen3.panel,
	            tab = _accordionPanelElemen3.tab,
	            tabpanel = _accordionPanelElemen3.tabpanel;
	
	        if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() === 'true') {
	          _this4.toggleTab_(panel, tab, tabpanel);
	        }
	      }
	    };
	
	    var toggleTab = function toggleTab(tabElement) {
	      if (tabElement) {
	        var _accordionPanelElemen4 = accordionPanelElements(tabElement),
	            panel = _accordionPanelElemen4.panel,
	            tab = _accordionPanelElemen4.tab,
	            tabpanel = _accordionPanelElemen4.tabpanel;
	
	        _this4.toggleTab_(panel, tab, tabpanel);
	      }
	    };
	
	    if (detail && detail.action) {
	      var action = detail.action,
	          target = detail.target;
	
	
	      switch (action.toLowerCase()) {
	        case 'open':
	          openTab(target);
	          break;
	        case 'close':
	          closeTab(target);
	          break;
	        case 'toggle':
	          toggleTab(target);
	          break;
	        case 'upgrade':
	          if (target) {
	            this.upgradeTab(target);
	          }
	          break;
	        default:
	          throw new Error('Unknown action "' + action + '". Action must be one of "open", "close", "toggle" or "upgrade"');
	      }
	    }
	  };
	  MaterialExtAccordion.prototype['command'] = MaterialExtAccordion.prototype.command;
	
	  /**
	   * Initialize component
	   */
	  MaterialExtAccordion.prototype.init = function () {
	    var _this5 = this;
	
	    if (this.element_) {
	      // Do the init required for this component to work
	      if (!(this.element_.classList.contains(ACCORDION_HORIZONTAL) || this.element_.classList.contains(ACCORDION_VERTICAL))) {
	        throw new Error('Accordion must have one of the classes "' + ACCORDION_HORIZONTAL + '" or "' + ACCORDION_VERTICAL + '"');
	      }
	
	      this.element_.setAttribute('role', 'tablist');
	
	      if (!this.element_.hasAttribute(_constants.ARIA_MULTISELECTABLE)) {
	        this.element_.setAttribute(_constants.ARIA_MULTISELECTABLE, 'false');
	      }
	
	      this.element_.removeEventListener('command', this.commandHandler_);
	      this.element_.addEventListener('command', this.commandHandler_.bind(this), false);
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + ACCORDION + ' > .' + PANEL))).forEach(function (panel) {
	        return _this5.upgradeTab(panel);
	      });
	
	      // Set upgraded flag
	      this.element_.classList.add(_constants.IS_UPGRADED);
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   *
	   * Nothing to downgrade
	   *
	   MaterialExtAccordion.prototype.mdlDowngrade_ = function() {
	     'use strict';
	     console.log('***** MaterialExtAccordion.mdlDowngrade');
	   };
	   */
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtAccordion,
	    classAsString: 'MaterialExtAccordion',
	    cssClass: 'mdlext-js-accordion',
	    widget: true
	  });
	})(); /**
	       * @license
	       * Copyright 2016 Leif Olsen. All Rights Reserved.
	       *
	       * Licensed under the Apache License, Version 2.0 (the "License");
	       * you may not use this file except in compliance with the License.
	       * You may obtain a copy of the License at
	       *
	       *      http://www.apache.org/licenses/LICENSE-2.0
	       *
	       * Unless required by applicable law or agreed to in writing, software
	       * distributed under the License is distributed on an "AS IS" BASIS,
	       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	       * See the License for the specific language governing permissions and
	       * limitations under the License.
	       *
	       * This code is built with Google Material Design Lite,
	       * which is Licensed under the Apache License, Version 2.0
	       */
	
	/**
	 * A WAI-ARIA friendly accordion component.
	 * An accordion is a collection of expandable panels associated with a common outer container. Panels consist
	 * of a header and an associated content region or tabpanel. The primary use of an Accordion is to present multiple sections
	 * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
	 * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
	 * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
	 */

/***/ },
/* 1 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(23)('wks')
	  , uid        = __webpack_require__(25)
	  , Symbol     = __webpack_require__(1).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(6)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(1)
	  , core      = __webpack_require__(2)
	  , ctx       = __webpack_require__(20)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(14);
	module.exports = __webpack_require__(4) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(5)
	  , IE8_DOM_DEFINE = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(34)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(23)('keys')
	  , uid    = __webpack_require__(25);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(28)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(26);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7)
	  , document = __webpack_require__(1).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(13)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(32)
	  , enumBugKeys = __webpack_require__(22);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(19);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VK_TAB = 9;
	var VK_ENTER = 13;
	var VK_ESC = 27;
	var VK_SPACE = 32;
	var VK_PAGE_UP = 33;
	var VK_PAGE_DOWN = 34;
	var VK_END = 35;
	var VK_HOME = 36;
	var VK_ARROW_LEFT = 37;
	var VK_ARROW_UP = 38;
	var VK_ARROW_RIGHT = 39;
	var VK_ARROW_DOWN = 40;
	
	var ARIA_EXPANDED = 'aria-expanded';
	var ARIA_HIDDEN = 'aria-hidden';
	var ARIA_MULTISELECTABLE = 'aria-multiselectable';
	var ARIA_SELECTED = 'aria-selected';
	
	var IS_DIRTY = 'is-dirty';
	var IS_DISABLED = 'is-disabled';
	var IS_EXPANDED = 'is-expanded';
	var IS_FOCUSED = 'is-focused';
	var IS_INVALID = 'is-invalid';
	var IS_UPGRADED = 'is-upgraded';
	var DATA_UPGRADED = 'data-upgraded';
	
	var MDL_RIPPLE = 'mdl-ripple';
	var MDL_RIPPLE_COMPONENT = 'MaterialRipple';
	var MDL_RIPPLE_CONTAINER = 'mdlext-carousel__slide__ripple-container';
	var MDL_RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	var MDL_RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
	exports.VK_TAB = VK_TAB;
	exports.VK_ENTER = VK_ENTER;
	exports.VK_ESC = VK_ESC;
	exports.VK_SPACE = VK_SPACE;
	exports.VK_PAGE_UP = VK_PAGE_UP;
	exports.VK_PAGE_DOWN = VK_PAGE_DOWN;
	exports.VK_END = VK_END;
	exports.VK_HOME = VK_HOME;
	exports.VK_ARROW_LEFT = VK_ARROW_LEFT;
	exports.VK_ARROW_UP = VK_ARROW_UP;
	exports.VK_ARROW_RIGHT = VK_ARROW_RIGHT;
	exports.VK_ARROW_DOWN = VK_ARROW_DOWN;
	exports.ARIA_EXPANDED = ARIA_EXPANDED;
	exports.ARIA_HIDDEN = ARIA_HIDDEN;
	exports.ARIA_MULTISELECTABLE = ARIA_MULTISELECTABLE;
	exports.ARIA_SELECTED = ARIA_SELECTED;
	exports.IS_DIRTY = IS_DIRTY;
	exports.IS_DISABLED = IS_DISABLED;
	exports.IS_EXPANDED = IS_EXPANDED;
	exports.IS_FOCUSED = IS_FOCUSED;
	exports.IS_INVALID = IS_INVALID;
	exports.IS_UPGRADED = IS_UPGRADED;
	exports.DATA_UPGRADED = DATA_UPGRADED;
	exports.MDL_RIPPLE = MDL_RIPPLE;
	exports.MDL_RIPPLE_COMPONENT = MDL_RIPPLE_COMPONENT;
	exports.MDL_RIPPLE_CONTAINER = MDL_RIPPLE_CONTAINER;
	exports.MDL_RIPPLE_EFFECT = MDL_RIPPLE_EFFECT;
	exports.MDL_RIPPLE_EFFECT_IGNORE_EVENTS = MDL_RIPPLE_EFFECT_IGNORE_EVENTS;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(16)
	  , toLength  = __webpack_require__(24)
	  , toIndex   = __webpack_require__(33);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(4) && !__webpack_require__(6)(function(){
	  return Object.defineProperty(__webpack_require__(21)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(11)
	  , toIObject    = __webpack_require__(16)
	  , arrayIndexOf = __webpack_require__(30)(false)
	  , IE_PROTO     = __webpack_require__(15)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(13)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(7);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(11)
	  , TAG = __webpack_require__(3)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(54)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(38)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(19)
	  , TAG = __webpack_require__(3)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(49)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(53)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(11)
	  , Iterators      = __webpack_require__(18)
	  , $iterCreate    = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(35)
	  , getPrototypeOf = __webpack_require__(52)
	  , ITERATOR       = __webpack_require__(3)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(37)
	  , ITERATOR  = __webpack_require__(3)('iterator')
	  , Iterators = __webpack_require__(18);
	module.exports = __webpack_require__(2).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(40);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(55);
	module.exports = __webpack_require__(2).Array.from;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(10)
	  , createDesc      = __webpack_require__(14);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1).document && document.documentElement;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(18)
	  , ITERATOR   = __webpack_require__(3)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(5);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(50)
	  , descriptor     = __webpack_require__(14)
	  , setToStringTag = __webpack_require__(35)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(3)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(3)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(5)
	  , dPs         = __webpack_require__(51)
	  , enumBugKeys = __webpack_require__(22)
	  , IE_PROTO    = __webpack_require__(15)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(21)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(44).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(5)
	  , getKeys  = __webpack_require__(27);
	
	module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(11)
	  , toObject    = __webpack_require__(17)
	  , IE_PROTO    = __webpack_require__(15)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(13)
	  , defined   = __webpack_require__(12);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(20)
	  , $export        = __webpack_require__(8)
	  , toObject       = __webpack_require__(17)
	  , call           = __webpack_require__(46)
	  , isArrayIter    = __webpack_require__(45)
	  , toLength       = __webpack_require__(24)
	  , createProperty = __webpack_require__(43)
	  , getIterFn      = __webpack_require__(39);
	
	$export($export.S + $export.F * !__webpack_require__(48)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }
/******/ ])
});
;
//# sourceMappingURL=mdl-ext.accordion.js.map