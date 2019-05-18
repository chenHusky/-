var tools = {
	getStyle: function (obj, attr) {
		if(obj.currentStyle) {
			// IE兼容
			return obj.currentStyle[attr];
			
		}else{
			return getComputedStyle(obj, false)[attr];
		}
	},
	
	
	move: function (obj, attr, end, time, fn) {
		clearInterval(obj.timer);
		let start = parseInt(this.getStyle(obj, attr));
		let distance = end - start;
		// 根据时间计算总步数, 为了避免超出终点值，向下取整
		let steps = Math.floor(time / 20);
		// 速度  px/步
		let speed = distance / steps;
		
		let n = 0; // 记录当前步数
		obj.timer = setInterval(function () {
			n++;
			obj.style[attr] = start + n*speed + "px";
			if(n === steps) {
				clearInterval(obj.timer);
				// 有可能距离终点还差0.几步
				obj.style[attr] = end + "px";
				// 执行回调
				fn && fn();
			}
		}, 20);
	}
}


