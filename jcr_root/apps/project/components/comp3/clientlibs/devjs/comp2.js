/*!
 * samsung.com - Phase2 - AboutSamsung FixHeight
 * src : js/src/smg/aem/components/aboutsamsung/aboutsamsung-fixheight.js
 *
 * @version 1.0.0
 * @since 2016.02.15
 */
;(function (win, $) {
	'use strict';

	if('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if('undefined' === typeof win.smg.aem.components) {
		win.smg.aem.components = {};
	}

	if('undefined' === typeof win.smg.aem.components.aboutsamsung) {
		win.smg.aem.components.aboutsamsung = {};
	}

	// Static Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util,
	// Custom Events
	CST_EVENT = win.smg.aem.customEvent;

	var namespace = win.smg.aem.components.aboutsamsung;

	/**
	 * @description AboutSamsung FixHeight
	 * @name window.smg.aem.components.aboutsamsung.fixHeight
	 * @namespace
	 * @requires jQuery
	 */
	namespace.fixHeight = (function() {
		var defParams = {
			mainPage : '.main_page',
			targets : '.js-fix-height'
		};
		return {
			init : function(container, args) {
				if (!(this.container = container).size()) return;

				this.opts = UTIL.def(defParams, (args || {}));

				this.setElements();
				this.setBindEvents();
			},
			setElements : function() {
				this.isMainPage = !!this.container.find(this.opts.mainPage).length;
				this.targets = this.container.find(this.opts.targets);
				this.IE_LT_8 = $('body').hasClass(V_STATIC.SUPPORT.IE_LT_8);
				this.isMobileScreen = false;
				this.responsiveName = '';
			},
			setBindEvents : function() {
				this.container.on(CST_EVENT.RESPONSIVE.CHANGE, $.proxy(this.onResponsiveChange, this));
				this.container.trigger(CST_EVENT.RESPONSIVE.GET_STATUS);

				$(win).on('resize', $.proxy(this.onResizeListener, this));
				$(win).on('load', $.proxy(this.checkFixHeight, this));
			},
			onResponsiveChange : function(e, data) {
				this.isMobileScreen = data.isMobile;
				this.responsiveName = data.RESPONSIVE_NAME;
			},
			onResizeListener : function() {
				this.checkFixHeight();
			},
			checkFixHeight : function() {
				var winWidth = UTIL.winSize().w;

				if (this.IE_LT_8) {
					this.setFixHeight();
				} else {
					if (winWidth <= 1280) {
						this.setAutoHeight();
					} else {
						this.setFixHeight();	
					}
				}
			},
			setFixHeight : function() {
				var fix = [],
				fixNum = [],
				compare = 0;

				this.targets.css({ 'height' : '' });

				$.each(this.targets, function() {
					$.each($(this).find('> *'), function() {
						fixNum.push($(this).outerHeight());
					});

					$.map(fixNum, function(val) {
						if (compare < val) {
							compare = val;
						}
					});

					fix.push(compare);
				});

				$.each(this.targets, function(index) {
					$(this).css({ 'height' : fix[index] });
				});
			},
			setAutoHeight : function() {
				this.targets.css({ 'height' : 'auto' });
			}
		};	
	})();

	$(function() {
		namespace.fixHeight.init($('body'));
	});
})(window, window.jQuery);