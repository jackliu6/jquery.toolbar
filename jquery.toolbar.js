/**
 * toolbar.js
 */
;
(function($) {

	var ToolBar = function(elem, options) {

		this.elem = elem;

		this.options = options;

		this.init();
	},

		fn = ToolBar.prototype = {

			init: function() {

				var self = this,
					options = self.options,
					ischild = $(self.elem).children('.toolbar').length > 0,
					$elem = $(self.elem),
					$toolbar = this.toolbar = $(options.template),
					$container = options.container && $(options.container) || $(document.body),
					$content = ischild ? $elem.children('.toolbar') : options.content && $(options.content);

				if ($content !== false) {
					!$content.hasClass('toolbar') && $content.addClass('toolbar');

					$toolbar
						.find('.toolbar-content')
						.append($content);

					$toolbar
						.css({
							display: 'none',
							opacity: 0,
							zIndex: this.options.zindex
						});

					if (ischild) {
						$elem.append($toolbar);
					} else {
						$container.append($toolbar);
					}

					self._setTrigger(self.elem, $toolbar);

				} else if (this.options.group && $(this.options.group).length > 1 && this.options.trigger === 'hover') { // group hover bind the events

					self._setTrigger(self.elem, $toolbar);

				}
			},

			show: function() {

				var self = this,
					$toolbar = self.toolbar;

				if (self._beforeShow() === false || $toolbar.is(':visible')) return;

				$toolbar.show();

				$toolbar.find('.toolbar').is(':hidden') &&
					$toolbar.find('.toolbar').show();

				self._setOriginPosition(self.elem, $toolbar);

				self._animation(self.elem, $toolbar, self.options.position);

				self._onShow();
			},

			hide: function() {
				var self = this,
					$toolbar = self.toolbar,
					pos = self._getOriginPosition(),
					delay = typeof this.options.delay === 'object' ? (this.options.delay.hide || 200) : (this.options.delay || 200),
					css = {
						opacity: 0
					};

				if (self._beforeHide() === false || $toolbar.is(':hidden')) return;

				if (self.options.animation) {
					$.extend(pos, {
						using: function(p) {
							$(this).
							animate($.extend(p, css), delay, function() {
								$(this).hide();
							});
						}
					});
				} else {
					$toolbar
						.css(css)
						.hide();
				}

				$toolbar.position(pos);

				self._onHide();
			},

			toggle : function(){
				var self = this,
					$toolbar = self.toolbar;

				$toolbar.is(':visible') && self.hide();
				$toolbar.is(':hidden') && self.show();
			},

			_call: function(evn) {
				if (typeof evn !== 'function') return;
				return evn.call(this.elem);
			},

			_beforeShow: function() {
				this._call(this.options.beforeShow);
			},

			_onShow: function() {
				this._call(this.options.onShow);
			},

			_beforeHide: function() {
				this._call(this.options.beforeHide);
			},

			_onHide: function() {
				this._call(this.options.onHide);
			},

			_setTrigger: function(elem, toolbar) {
				var self = this,
					$elem = $(elem),
					$toolbar = toolbar,
					trigger = self.options.trigger;

				if (trigger === 'click') {
					$elem.on('click.toolbar.api', function(e) {
						$toolbar.is(':hidden') && self.show();
					});

				} else if (trigger === 'hover') {
					$elem
						.on('mouseenter.toolbar.api', function() {
							self.options.group && $(self.options.group).length > 1 && $(self.options.group).each(function() {
								this !== self.elem && $(this).toolbar('hide');
							});
							$toolbar.is(':hidden') && self.show();
						});
				}

				//manual
				//使用自定义click事件的时候需加入return false;阻止以下代码的冒泡,有兴趣的同学也可以把下面的事件放到options里面
				$(document).on('click', function(e) {
					var _target = $(e.target),
						_elem = $elem;

					if (_target.get(0) == $elem.get(0) ||
						$elem.has(_target.get(0)).length > 0 ||
						$toolbar.has(_target.get(0)).length > 0 ||
						$toolbar.is(':hidden')) {
						return;
					}
					self.hide();
				});
			},

			_setOriginPosition: function() {
				//jquery ui position
				this.toolbar.position(this._getOriginPosition());
			},

			_getOriginPosition: function() {
				var align = this.options.align || 'top',
					offset = (function() {
						switch (align) {
							case 'top':
								return {
									y: -20
								}
								break;
							case 'bottom':
								return {
									y: 20
								}
								break;
							case 'left':
								return {
									x: -20
								}
								break;
							case 'right':
								return {
									x: 20
								}
								break;
						}
					})();
				return this._getDefaultPositionOffset(this.options.originOffset || offset);
			},

			_getPosition: function() {
				return this.options.getPosition && typeof this.options.getPosition === 'function' ?
					this.options.getPosition.call(this.elem) :
					this._getDefaultPosition();

			},

			_getDefaultPosition: function() {
				var align = this.options.align || 'top',
					offset = (function() {
						switch (align) {
							case 'top':
								return {
									y: -5
								}
								break;
							case 'bottom':
								return {
									y: 5
								}
								break;
							case 'left':
								return {
									x: -5
								}
								break;
							case 'right':
								return {
									x: 5
								}
								break;
						}
					})();
				return this._getDefaultPositionOffset(this.options.offset || offset);
			},

			_getDefaultPositionOffset: function(offset) {
				var self = this,
					align = this.options.align || 'top',
					myalign,
					offset = offset,
					pr = this.options.relative || self.elem,
					of = (typeof pr === 'string' ? pr : (pr === true ? this.options.container || self.elem : self.elem))
					pos = null;

				//use base api of jquery ui position
				if (offset.my && offset.at) {
					pos = offset;
				} else {
					if (!offset.x) offset.x = 0;
					if (!offset.y) offset.y = 0;
					switch (align) {
						case 'top':
							myalign = 'left' + (offset.x !== 0 ? (offset.x > 0 ? '+' + offset.x : offset.x) : '') + ' bottom' + (offset.y !== 0 ? (offset.y > 0 ? '+' + offset.y : offset.y) : '');
							align = 'left ' + align;
							break;
						case 'bottom':
							myalign = 'left' + (offset.x !== 0 ? (offset.x > 0 ? '+' + offset.x : offset.x) : '') + ' top' + (offset.y !== 0 ? (offset.y > 0 ? '+' + offset.y : offset.y) : '');
							align = 'left ' + align;
							break;
						case 'left':
							myalign = 'right' + (offset.x !== 0 ? (offset.x > 0 ? '+' + offset.x : offset.x) : '') + ' top' + (offset.y !== 0 ? (offset.y > 0 ? '+' + offset.y : offset.y) : '');
							align += ' top';
							break;
						case 'right':
							myalign = 'left' + (offset.x !== 0 ? (offset.x > 0 ? '+' + offset.x : offset.x) : '') + ' top' + (offset.y !== 0 ? (offset.y > 0 ? '+' + offset.y : offset.y) : '');
							align += ' top';
							break;
					}
					pos = {
						my: myalign,
						at: align
					};
				}

				return $.extend({}, {
					of: of,
					collision: 'fit'
				}, pos);
			},

			_animation: function() {
				var self = this,
					$toolbar = self.toolbar,
					pos = self._getPosition(),
					delay = typeof this.options.delay === 'object' ? (this.options.delay.show || 200) : (this.options.delay || 200),
					css = {
						opacity: 1
					};

				if (self.options.animation) {
					$.extend(pos, {
						using: function(p) {
							$(this).animate($.extend(p, css), delay);
						}
					});
				} else {
					$toolbar.css(css);
				}

				$toolbar.position(pos);
			}
		};

	$.fn.toolbar = function(option) {
		var args = arguments;
		return this.each(function() {
			var $this = $(this),
				data = $this.data('toolbar'),
				options = $.extend({}, $.fn.toolbar.defaults, (typeof option === 'object' && option));

			!data && $this.data('toolbar', (data = new ToolBar(this, options)));

			typeof option === 'string' && data[option].apply(data, Array.prototype.slice.call(args, 1));
		});
	};

	/**
	 * options
	 *
	 * @type {Object}
	 *
	 * @param {boolean|function} animation true|false 默认true
	 * @param {string} align top|right|bottom|left
	 * @param {object} offset {x : 0, y : 0} 上下或左右偏移量
	 * @param {object} originOffset {x : 0, y : 0} 隐藏位置上下或左右偏移量
	 * @param {number|object} delay 动画延迟时间
	 * @param {string|function} content 显示内容选择器，如：.my-tooltip
	 * @param {string} group 组选择器，针对hover trigger，非自己的时候隐藏
	 * @param {string} cointainer toolbar容器选择器
	 * @param {boolean|string} relative 相对元素，等同jquery ui position的of，默认相对this
	 * @param {string} trigger click|hover|manual manual为自定义事件，如：$(".my-btn").click(function(){$(".my-toolbar").toolbar('show')})
	 * @param {string} template 模版
	 * @param {number} zindex
	 * @param {function} beforeShow 无参数
	 * @param {function} onShow 无参数
	 * @param {function} beforehide 无参数
	 * @param {function} onHide 无参数
	 * @param {function} getPosition 自定义position
	 *
	 * events : 
	 * 		  $('.toolbar').toolbar('show');
	 * 		  $('.toolbar').toolbar('hide');
	 * 		  $('.toolbar').toolbar('toggle');
	 */
	$.fn.toolbar.defaults = {

		animation: true,

		align: 'top',

		offset: false,

		originOffset: false,

		delay: 200,

		content: false,

		group: false,

		container: false,

		relative: false,

		trigger: 'click',

		template: '<div class="toolbar-container"><div class="toolbar-content"></div><div class="toolbar-arr"></div></div>',

		zindex: 100,

		beforeShow: false,

		onShow: false,

		beforeHide: false,

		onHide: false,

		getPosition: false
	};

})(window.jQuery);