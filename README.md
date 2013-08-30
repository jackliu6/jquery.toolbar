jquery toolbar plugin

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
	
	求虐！！